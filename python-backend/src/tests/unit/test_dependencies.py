import pytest
from unittest.mock import AsyncMock, patch
from fastapi import HTTPException
from api.dependencies import get_current_user, get_token_payload
from application.services.user_service import UserService
from domain.user.entities import User
from domain.user.value_objects import Email, Username, Status, AvatarURL

@pytest.fixture
def mock_user_service():
    service = AsyncMock(spec=UserService)
    # Mock the user_repo attribute
    service.user_repo = AsyncMock()
    return service

@pytest.mark.asyncio
async def test_get_current_user_valid_token(mock_user_service):
    # Arrange
    email = "test@example.com"
    payload = {"sub": email}
    
    expected_user = User(
        user_id=1,
        email=Email(email),
        password="hashed",
        username=Username("user"),
        status=Status("active"),
        avatar=AvatarURL("")
    )
    
    mock_user_service.user_repo.get_by_email.return_value = expected_user
    
    # Act
    # We call get_current_user directly, passing the resolved dependencies
    user = await get_current_user(payload=payload, service=mock_user_service)
    
    # Assert
    assert user == expected_user
    mock_user_service.user_repo.get_by_email.assert_called_once_with(email)

@pytest.mark.asyncio
async def test_get_token_payload_invalid_token():
    # Arrange
    token = "invalid.token"
    
    # Act & Assert
    # We expect get_token_payload to raise HTTPException when decode_access_token returns None
    # We rely on the fact that decode_access_token (which uses jose.jwt.decode) 
    # will return None or raise error for this garbage token in the actual implementation,
    # OR we can mock decode_access_token to be sure.
    # Let's mock decode_access_token to ensure unit isolation.
    with patch("api.dependencies.decode_access_token", return_value=None):
        with pytest.raises(HTTPException) as exc:
            await get_token_payload(token)
        
        assert exc.value.status_code == 401
        assert exc.value.detail == "Could not validate credentials"

@pytest.mark.asyncio
async def test_get_current_user_user_not_found(mock_user_service):
    # Arrange
    email = "test@example.com"
    payload = {"sub": email}
    
    mock_user_service.user_repo.get_by_email.return_value = None
    
    # Act & Assert
    with pytest.raises(HTTPException) as exc:
        await get_current_user(payload=payload, service=mock_user_service)
        
    assert exc.value.status_code == 401
    assert exc.value.detail == "Could not validate credentials"
