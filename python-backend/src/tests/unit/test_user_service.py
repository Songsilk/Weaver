import pytest
from unittest.mock import AsyncMock
from application.services.user_service import UserService
from domain.user.repositories import UserRepository
from domain.user.entities import User
from domain.user.value_objects import Email, Username, Status, AvatarURL, Password
from core.security import hash_password

@pytest.fixture
def mock_user_repo():
    return AsyncMock(spec=UserRepository)

@pytest.fixture
def user_service(mock_user_repo):
    return UserService(mock_user_repo)

@pytest.mark.asyncio
async def test_create_user(user_service, mock_user_repo):
    email = "test@example.com"
    password = "password123"
    username = "testuser"
    status = "active"
    avatar = "http://avatar.url"

    async def side_effect_save(user):
        user.user_id = 1
    
    mock_user_repo.save.side_effect = side_effect_save

    user_id = await user_service.create_user(email, password, username, status, avatar)

    assert user_id == 1
    mock_user_repo.save.assert_called_once()
    saved_user = mock_user_repo.save.call_args[0][0]
    assert saved_user.email.value == email
    assert saved_user.username.value == username
    assert saved_user.password != password

@pytest.mark.asyncio
async def test_authenticate_user_success(user_service, mock_user_repo):
    email = "test@example.com"
    password = "password123"
    hashed = hash_password(Password(password))
    
    user = User(
        user_id=1,
        email=Email(email),
        password=hashed,
        username=Username("user"),
        status=Status("active"),
        avatar=AvatarURL("")
    )
    
    mock_user_repo.get_by_email.return_value = user
    
    authenticated_user = await user_service.authenticate_user(email, password)
    
    assert authenticated_user is not None
    assert authenticated_user.user_id == 1

@pytest.mark.asyncio
async def test_authenticate_user_wrong_password(user_service, mock_user_repo):
    email = "test@example.com"
    password = "password123"
    hashed = hash_password(Password(password))
    
    user = User(
        user_id=1,
        email=Email(email),
        password=hashed,
        username=Username("user"),
        status=Status("active"),
        avatar=AvatarURL("")
    )
    
    mock_user_repo.get_by_email.return_value = user
    
    authenticated_user = await user_service.authenticate_user(email, "wrongpassword")
    
    assert authenticated_user is None

@pytest.mark.asyncio
async def test_authenticate_user_not_found(user_service, mock_user_repo):
    mock_user_repo.get_by_email.return_value = None
    
    authenticated_user = await user_service.authenticate_user("nonexistent@example.com", "password")
    
    assert authenticated_user is None
