from domain.user.value_objects import Email, Username, AvatarURL, password, status
from domain.user.entities import User

async def create_user_service(user_repo, email, passw, statuss, username, avatar=""):
    email_vo = Email(email)
    username_vo = Username(username)
    avatar_vo = AvatarURL(avatar)
    password_vo = password(passw)
    status_vo = status(statuss)


    user = User(
        user_id=0,   # repo assigns real ID
        email=email_vo,
        password=password_vo,
        status=status_vo,
        username=username_vo,
        avatar=avatar_vo,
        card=None,
        contacts=[]
    )

    await user_repo.save(user)
    return user


async def delete_user_service(user_repo, user_id: int):
    await user_repo.delete(user_id)
    return {"status": "deleted", "id": user_id}
