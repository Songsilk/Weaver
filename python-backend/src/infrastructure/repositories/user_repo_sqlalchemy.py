from sqlalchemy import select
from domain.user.entities import User
from domain.user.value_objects import Email, Username, AvatarURL, Status, Password
from domain.user.repositories import UserRepository
from infrastructure.db.models.user_model import UserModel
from sqlalchemy.ext.asyncio import AsyncSession

class UserRepositorySQLAlchemy(UserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, user_id: int) -> User:
        db_user = await self.session.get(UserModel, user_id)
        return User(
            user_id=db_user.user_id,
            email=Email(db_user.email),
            password=Password(db_user.password),
            username=Username(db_user.username),
            status=Status(db_user.status),
            avatar=AvatarURL(db_user.avatar_url)
        )


    async def get_by_email(self, email: str) -> User:
        stmt = select(UserModel).where(UserModel.email == email)
        result = await self.session.execute(stmt)
        db_user = result.scalar_one_or_none()
        
        if not db_user:
            return None
        
        return User(
            user_id=db_user.user_id,
            email=Email(db_user.email),
            password=Password(db_user.password),
            username=Username(db_user.username),
            status=Status(db_user.status),
            avatar=AvatarURL(db_user.avatar_url)
        )

    async def save(self, user: User):
        db_user = UserModel(
            email=user.email.value,
            password=user.password.value,  # Extract value from Password value object
            username=user.username.value,
            status=user.status.value,  # Extract value from Status value object
            avatar_url=user.avatar.value,
        )
        self.session.add(db_user)
        await self.session.commit()
        await self.session.refresh(db_user)
        user.user_id = db_user.user_id

    async def update(self, user: User):
        db_user = await self.session.get(UserModel, user.user_id)
        if db_user:
            db_user.email = user.email.value
            db_user.password = user.password.value
            db_user.username = user.username.value
            db_user.status = user.status.value
            db_user.avatar_url = user.avatar.value
            
            await self.session.commit()
            await self.session.refresh(db_user)

    async def delete(self, user_id: int):
        db_user = await self.session.get(UserModel, user_id)
        await self.session.delete(db_user)
        await self.session.commit()

