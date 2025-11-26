from fastapi import APIRouter, Depends
from api.schemas.user_schema import UserCreate, UserResponse
from application.services.user_service import UserService
from api.dependencies import get_user_service

router = APIRouter(prefix="/user")

@router.post("/", response_model=UserResponse)
async def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)):
    user_id = await service.create_user(
        payload.email,
        payload.password,
        payload.username,
        payload.status,
        payload.avatar_url
    )
    return {"user_id": user_id}


@router.delete("/{user_id}")
async def delete_user(user_id: int, service: UserService = Depends(get_user_service)):
    return await service.delete_user(user_id)
