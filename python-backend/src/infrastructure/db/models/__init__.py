from infrastructure.db.session import Base

# Import all models so SQLAlchemy sees them before mapping
from .user_model import UserModel
from .label_model import LabelModel
from .labelApplied_model import LabelAppliedModel
from .contactlist_model import ContactListModel
from .page_model import PageModel
from .note_model import NoteModel
from .component_model import ComponentModel

__all__ = [
    "Base",
    "UserModel",
    "LabelModel",
    "LabelAppliedModel",
    "ContactListModel",
    "PageModel",
    "NoteModel",
    "ComponentModel"
]
