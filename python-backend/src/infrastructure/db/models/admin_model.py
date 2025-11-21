from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, text
from infrastructure.db.session import Base

class AdminModel(Base):
    __tablename__ = "Admin"

    admin_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
