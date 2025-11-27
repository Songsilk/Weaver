from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContactCreate(BaseModel):
    contact_user_id: int


class ContactResponse(BaseModel):
    contact_id: int
    owner_user_id: int
    contact_user_id: int
    added_at: Optional[datetime]
