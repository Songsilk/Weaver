from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from api.dependencies import get_user_service
from application.services.user_service import UserService
from core.security import create_access_token
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    service: UserService = Depends(get_user_service)
):
    """
    Login endpoint that accepts username (email) and password.
    Returns an access token on successful authentication.
    """
    user = await service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token with user's email as subject
    access_token = create_access_token(data={"sub": user.email.value})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
