from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, DateTime, ForeignKey, text
from infrastructure.db.session import Base

class ContactListModel(Base):
    __tablename__ = "ContactList"

    contact_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    owner_user_id: Mapped[int] = mapped_column(ForeignKey("User.user_id"), nullable=False)
    contact_user_id: Mapped[int] = mapped_column(ForeignKey("User.user_id"), nullable=False)
    added_at: Mapped[DateTime] = mapped_column(DateTime, server_default=text("CURRENT_TIMESTAMP"))

    owner = relationship("UserModel", foreign_keys=[owner_user_id], back_populates="owned_contacts")
    contact_user = relationship("UserModel", foreign_keys=[contact_user_id], back_populates="contacts")

    labels = relationship("LabelAppliedModel", back_populates="contact")
    notes = relationship("NoteModel", back_populates="contact")
