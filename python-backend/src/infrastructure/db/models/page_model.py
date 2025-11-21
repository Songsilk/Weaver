from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, ForeignKey
from infrastructure.db.session import Base

class PageModel(Base):
    __tablename__ = "Page"

    page_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.user_id"), nullable=False)
    title: Mapped[str | None] = mapped_column(String(50))
    config_json: Mapped[str | None] = mapped_column(Text)
    page_url: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    user = relationship("UserModel", back_populates="pages")
    components = relationship("ComponentModel", back_populates="page")
