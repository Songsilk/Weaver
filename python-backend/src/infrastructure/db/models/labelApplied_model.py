from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, ForeignKey
from infrastructure.db.session import Base

class LabelAppliedModel(Base):
    __tablename__ = "LabelApplied"

    contact_id: Mapped[int] = mapped_column(ForeignKey("ContactList.contact_id"), primary_key=True)
    label_id: Mapped[int] = mapped_column(ForeignKey("Labels.label_id"), primary_key=True)

    contact = relationship("ContactListModel", back_populates="labels")
    label = relationship("LabelModel", back_populates="applied")
