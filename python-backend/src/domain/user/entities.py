from dataclasses import dataclass, field
from typing import List
from .value_objects import Email, Username, AvatarURL, Status, Password
#from domain.cards.entities import Card
#from domain.contacts.entities import ContactCard

@dataclass
class User:
    user_id: int
    email: Email
    password: Password 
    username: Username
    status: Status
    avatar: AvatarURL