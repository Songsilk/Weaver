from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, String, ForeignKey
from infrastructure.db.base import Base

class UserModel(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(100), unique=True)
    username: Mapped[str] = mapped_column(String(50))
    avatar_url: Mapped[str] = mapped_column(String(255))
    biography: Mapped[str] = mapped_column(String(500))

    card = relationship("CardModel", uselist=False, back_populates="user")
    contacts = relationship("ContactCardModel", back_populates="user")
