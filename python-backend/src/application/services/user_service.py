from domain.user.value_objects import Email, Username, AvatarURL, Status, Password 
from domain.user.entities import User
from domain.user.repositories import UserRepository
from core.security import hash_password, verify_password

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def create_user(self, email: str, passw: str, username: str, statuss: str, avatar: str = "") -> int:
        email_vo = Email(email)
        username_vo = Username(username)
        
        # Hash the password before storing
        hashed_password = hash_password(Password(passw))
        
        status_vo = Status(statuss)
        avatar_vo = AvatarURL(avatar)

        user = User(
            user_id=0,   # repo assigns real ID
            email=email_vo,
            password=hashed_password,  # Store as plain string (already hashed)
            status=status_vo,  # Store as plain string
            username=username_vo,
            avatar=avatar_vo
        )

        await self.user_repo.save(user)
        return user.user_id

    async def authenticate_user(self, email: str, password: str):
        """Authenticate a user by email and password."""
        user = await self.user_repo.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    async def delete_user(self, user_id: int):
        await self.user_repo.delete(user_id)
        return {"status": "deleted", "id": user_id}
