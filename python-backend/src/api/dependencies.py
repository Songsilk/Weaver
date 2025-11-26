from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.db.session import get_session
from infrastructure.repositories.user_repo_sqlalchemy import UserRepositorySQLAlchemy
from application.services.user_service import UserService
from core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    repo = UserRepositorySQLAlchemy(session)
    return UserService(repo)

async def get_current_user(token: str = Depends(oauth2_scheme), service: UserService = Depends(get_user_service)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await service.user_repo.get_by_email(email)
    if user is None:
        raise credentials_exception
    return user
