from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from infrastructure.db.session import Base

class LabelModel(Base):
    __tablename__ = "Labels"

    label_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.user_id"), nullable=False)
    tag_name: Mapped[str] = mapped_column(String(50), nullable=False)

    user = relationship("UserModel", back_populates="labels")
    applied = relationship("LabelAppliedModel", back_populates="label")
