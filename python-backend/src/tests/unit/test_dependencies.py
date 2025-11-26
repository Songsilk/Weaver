import pytest
from unittest.mock import AsyncMock
from fastapi import HTTPException
from api.dependencies import get_current_user
from application.services.user_service import UserService
from domain.user.entities import User
from domain.user.value_objects import Email, Username, Status, AvatarURL
from jose import jwt
from core.security import SECRET_KEY, ALGORITHM

@pytest.fixture
def mock_user_service():
    service = AsyncMock(spec=UserService)
    # Mock the user_repo attribute
    service.user_repo = AsyncMock()
    return service

@pytest.mark.asyncio
async def test_get_current_user_valid_token(mock_user_service):
    email = "test@example.com"
    token = jwt.encode({"sub": email}, SECRET_KEY, algorithm=ALGORITHM)
    
    user = User(
        user_id=1,
        email=Email(email),
        password="hashed",
        username=Username("user"),
        status=Status("active"),
        avatar=AvatarURL("")
    )
    
    mock_user_service.user_repo.get_by_email.return_value = user
    
    current_user = await get_current_user(token, mock_user_service)
    
    assert current_user == user

@pytest.mark.asyncio
async def test_get_current_user_invalid_token(mock_user_service):
    token = "invalid.token"
    
    with pytest.raises(HTTPException) as exc:
        await get_current_user(token, mock_user_service)
    
    assert exc.value.status_code == 401

@pytest.mark.asyncio
async def test_get_current_user_user_not_found(mock_user_service):
    email = "test@example.com"
    token = jwt.encode({"sub": email}, SECRET_KEY, algorithm=ALGORITHM)
    
    mock_user_service.user_repo.get_by_email.return_value = None
    
    with pytest.raises(HTTPException) as exc:
        await get_current_user(token, mock_user_service)
        
    assert exc.value.status_code == 401
