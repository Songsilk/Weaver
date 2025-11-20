from dataclasses import dataclass, field
from typing import List
from .value_objects import Email, Username, AvatarURL, Biography
from domain.cards.entities import Card
from domain.contacts.entities import ContactCard

@dataclass
class User:
    user_id: int
    email: Email
    username: Username
    avatar: AvatarURL
    biography: Biography
    card: Card
    contacts: List[ContactCard] = field(default_factory=list)

    def get_public_card(self):
        return self.card

    def add_contact(self, card: Card):
        cid = len(self.contacts) + 1
        new_contact = ContactCard(contact_id=cid, card=card)
        self.contacts.append(new_contact)
        return new_contact

    def remove_contact(self, contact_id: int):
        self.contacts = [c for c in self.contacts if c.contact_id != contact_id]
