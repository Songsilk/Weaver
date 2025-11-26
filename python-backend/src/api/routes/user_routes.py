from fastapi import APIRouter, Depends
from api.schemas.user_schema import UserCreate, UserResponse, UserWithToken
from application.services.user_service import UserService
from api.dependencies import get_user_service, get_current_user
from core.security import create_access_token

router = APIRouter(prefix="/user")

@router.post("/", response_model=UserWithToken)
async def create_user(payload: UserCreate, service: UserService = Depends(get_user_service)):
    user_id = await service.create_user(
        payload.email,
        payload.password,
        payload.username,
        payload.status,
        payload.avatar_url
    )
    
    # Create token
    access_token = create_access_token(data={"sub": payload.email})
    
    # Construct response
    user_response = UserResponse(
        user_id=user_id,
        email=payload.email,
        username=payload.username,
        status=payload.status,
        avatar_url=payload.avatar_url
    )
    
    return {
        "user": user_response,
        "token": access_token
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user = Depends(get_current_user)):
    return UserResponse(
        user_id=current_user.user_id,
        email=current_user.email.value,
        username=current_user.username.value,
        status=current_user.status,
        avatar_url=current_user.avatar.value
    )

@router.delete("/{user_id}")
async def delete_user(user_id: int, service: UserService = Depends(get_user_service)):
    return await service.delete_user(user_id)
