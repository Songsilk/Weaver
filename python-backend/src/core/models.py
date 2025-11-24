#Deprectated
from sqlalchemy import Column, Integer, String, DateTime
from core.db import Base
from datetime import datetime
from zoneinfo import ZoneInfo

class User(Base):
    __tablename__ = "User"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    status = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.now(tz=ZoneInfo("America/Bogota")))
    username = Column(String(50))
    avatar_url = Column(String(100))
