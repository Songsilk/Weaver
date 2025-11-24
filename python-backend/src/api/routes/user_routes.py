from fastapi import APIRouter, Depends
from api.schemas.user_schema import UserCreate, UserResponse
from application.services.user_service import create_user_service, delete_user_service
from infrastructure.repositories.user_repo_sqlalchemy import UserRepositorySQLAlchemy
from infrastructure.db.session import get_session

router = APIRouter(prefix="/user")

@router.post("/", response_model=UserResponse)
async def create_user(payload: UserCreate, session=Depends(get_session)):
    print("Creating user in session:", session)
    repo = UserRepositorySQLAlchemy(session)
    user_id = await create_user_service(repo,
                                     payload.email,
                                     payload.password,
                                     payload.username,
                                     payload.status,
                                     payload.avatar_url)
    return {"user_id": user_id}


@router.delete("/{user_id}")
async def delete_user(user_id: int, session=Depends(get_session)):
    repo = UserRepositorySQLAlchemy(session)
    return await delete_user_service(repo, user_id)
