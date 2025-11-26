from domain.user.value_objects import Email, Username, AvatarURL, password, status
from domain.user.entities import User
from domain.user.repositories import UserRepository

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def create_user(self, email: str, passw: str, username: str, statuss: str, avatar: str = "") -> int:
        email_vo = Email(email)
        username_vo = Username(username)
        password_vo = password(passw)
        status_vo = status(statuss)
        avatar_vo = AvatarURL(avatar)

        user = User(
            user_id=0,   # repo assigns real ID
            email=email_vo,
            password=password_vo,
            status=status_vo,
            username=username_vo,
            avatar=avatar_vo
        )

        await self.user_repo.save(user)
        return user.user_id

    async def delete_user(self, user_id: int):
        await self.user_repo.delete(user_id)
        return {"status": "deleted", "id": user_id}
