from domain.users.value_objects import Email, Username, AvatarURL, Biography
from domain.users.entities import User

async def create_user_service(user_repo, email, username, avatar="", bio=""):
    email_vo = Email(email)
    username_vo = Username(username)
    avatar_vo = AvatarURL(avatar)
    bio_vo = Biography(bio)

    user = User(
        user_id=0,   # repo assigns real ID
        email=email_vo,
        username=username_vo,
        avatar=avatar_vo,
        biography=bio_vo,
        card=None,
        contacts=[]
    )

    await user_repo.save(user)
    return user


async def delete_user_service(user_repo, user_id: int):
    await user_repo.delete(user_id)
    return {"status": "deleted", "id": user_id}
