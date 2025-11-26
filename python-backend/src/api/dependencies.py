from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.db.session import get_session
from infrastructure.repositories.user_repo_sqlalchemy import UserRepositorySQLAlchemy
from application.services.user_service import UserService

async def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    repo = UserRepositorySQLAlchemy(session)
    return UserService(repo)
