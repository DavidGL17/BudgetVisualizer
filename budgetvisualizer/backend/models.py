"""
This file contains the models for the backend.
"""


from dataclasses import dataclass
from persistent import Persistent


@dataclass
class Expense(Persistent):
    id: int
