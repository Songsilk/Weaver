from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.db.session import get_session
from infrastructure.repositories.user_repo_sqlalchemy import UserRepositorySQLAlchemy
from application.services.user_service import UserService
from core.security import SECRET_KEY, ALGORITHM, decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    repo = UserRepositorySQLAlchemy(session)
    return UserService(repo)

async def get_token_payload(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    print(payload)
    if payload is None:
        raise credentials_exception
    return payload

async def get_current_user(
    payload: dict = Depends(get_token_payload),
    service: UserService = Depends(get_user_service)
):
    print(payload)
    email: str = payload.get("sub")


    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = await service.user_repo.get_by_email(email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
