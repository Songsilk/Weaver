from abc import ABC, abstractmethod
from .entities import User

class UserRepository(ABC):

    @abstractmethod
    async def get(self, user_id: int) -> User: ...
    
    @abstractmethod
    async def get_by_email(self, email: str) -> User: ...
    
    @abstractmethod
    async def save(self, user: User): ...

    @abstractmethod
    async def update(self, user: User): ...

    @abstractmethod
    async def delete(self, user_id: int): ...
