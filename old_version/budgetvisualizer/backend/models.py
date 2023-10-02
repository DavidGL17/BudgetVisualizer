"""
This file contains the models for the backend.
"""


import enum
import uuid
from datetime import datetime
from dataclasses import dataclass, field
from persistent import Persistent

from ..utils.logger import logger


class Type(enum.Enum):
    INCOME = 1
    EXPENSE = 2


@dataclass
class Statement(Persistent):
    """
    A statement made by te user

    Attributes:
        id {int} -- The id of the statement.
        date {datetime} -- The date of the statement.
        category {str} -- The category of the statement.
        type {Type} -- The type of the statement (income or expense)
        amount {float} -- The amount of the statement.
        description {str} -- The description of the statement.
    """

    id: int = field(init=False)
    date: datetime
    category: str
    type: Type
    amount: float
    description: str

    def __post_init__(self):
        self.id = uuid.uuid4().int

    def __eq__(self, other):
        """
        Compares every attribute except for the id.
        """
        return (
            self.date == other.date
            and self.category == other.category
            and self.type == other.type
            and self.amount == other.amount
            and self.description == other.description
        )


def get_correct_type(type: str) -> Type:
    """
    Returns the correct type based on the type string.

    Arguments:
        type {str} -- The type string.

    Returns:
        type -- The correct Type.

    Raises:
        ValueError: If the type string is invalid.
    """
    if type == "Income":
        return Type.AUCTION
    elif type == "Exp.":
        return Type.VENDOR
    else:
        logger.error(f"Invalid type: {type}")
        raise ValueError(f"Invalid type: {type}")
