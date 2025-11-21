from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, text
from infrastructure.db.session import Base

class UserModel(Base):
    __tablename__ = "User"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    username: Mapped[str | None] = mapped_column(String(50))
    avatar_url: Mapped[str | None] = mapped_column(String(100))

    # Relationships
    labels = relationship("LabelModel", back_populates="user")
    owned_contacts = relationship("ContactListModel", foreign_keys="[ContactListModel.owner_user_id]", back_populates="owner")
    contacts = relationship("ContactListModel", foreign_keys="[ContactListModel.contact_user_id]", back_populates="contact_user")
    pages = relationship("PageModel", back_populates="user")
