from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, ForeignKey
from infrastructure.db.session import Base

class ComponentModel(Base):
    __tablename__ = "Component"

    component_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    page_id: Mapped[int] = mapped_column(ForeignKey("Page.page_id"), nullable=False)
    type: Mapped[str | None] = mapped_column(String(20))
    data_json: Mapped[str | None] = mapped_column(Text)
    display_order: Mapped[int | None] = mapped_column(Integer)

    page = relationship("PageModel", back_populates="components")
