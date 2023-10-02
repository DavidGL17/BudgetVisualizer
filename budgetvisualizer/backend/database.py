"""
This module contains all database related functions, such as inserting, deleting and getting statements.
"""

from ZODB import DB
import os
from persistent.dict import PersistentDict
import transaction
from .models import Statement
from ..utils.config import db_folder
from datetime import datetime


class SingletonZODB:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        # check if data folder exists, otherwise create it
        if not os.path.exists(db_folder):
            os.mkdir(db_folder)
        self.db = DB(os.path.join(db_folder, "data.fs"))
        self.conn = self.db.open()
        self.dbroot = self.conn.root()

        if "app_data" not in self.dbroot:
            print("Initializing database...")
            # init the database
            self.dbroot["app_data"] = PersistentDict()
            self.dbroot["app_data"]["statements"] = PersistentDict()

            transaction.commit()


zodb = SingletonZODB.instance()

###
# Insert
###


def insert_statement(statement: Statement) -> bool:
    """
    Inserts a statement into the database.

    Arguments:
        statement {Statement} -- The statement to insert.

    Returns
        bool -- True if the statement was inserted, False otherwise.
    """
    # check if the statement already exists
    if statement.id in zodb.dbroot["app_data"]["statements"]:
        return False
    # add the statement to the database
    zodb.dbroot["app_data"]["statements"][str(statement.id)] = statement
    transaction.commit()
    return True


###
# Delete
###


def delete_statement(statement_id: int) -> bool:
    """
    Deletes a statement from the database.

    Arguments:
        statement_id {int} -- The id of the statement to delete.

    Returns:
        bool -- True if the statement was deleted, False otherwise.
    """
    # check if the statement exists
    if str(statement_id) not in zodb.dbroot["app_data"]["statements"]:
        return False
    # delete the statement
    del zodb.dbroot["app_data"]["statements"][str(statement_id)]
    transaction.commit()
    return True


###
# Get
###


def get_statements() -> list:
    """
    Returns a list of all statements.

    Returns:
        list -- A list of all statements.
    """
    return list(zodb.dbroot["app_data"]["statements"].values())


def get_statements_by_time(start: datetime, end: datetime) -> list:
    """
    Returns a list of all statements between start and end.

    Arguments:
        start {datetime} -- The start datetime.
        end {datetime} -- The end datetime.

    Returns:
        list -- A list of all statements between start and end.
    """
    return [statement for statement in zodb.dbroot["app_data"]["statements"].values() if start <= statement.date <= end]


def get_statements_by_category(category: str) -> list:
    """
    Returns a list of all statements with the given category.

    Arguments:
        category {str} -- The category to search for.

    Returns:
        list -- A list of all statements with the given category.
    """
    return [statement for statement in zodb.dbroot["app_data"]["statements"].values() if statement.category == category]
