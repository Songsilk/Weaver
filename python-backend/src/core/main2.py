from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import insert, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from core.db import get_db
from core.models import User
from core.schema import UserCreate

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "FastAPI + async SQLAlchemy + asyncmy + MySQL works fine!"}

@app.get("/users")
async def read_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users

@app.post("/create")
async def create_user(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = (
        insert(User)
        .values(
            email=payload.email,
            password=payload.password,
            status="active",
            username=payload.username,
            avatar_url=payload.avatar_url
        )
    )

    await db.execute(stmt)
    await db.commit()

    return {"message": "user created"}

@app.post("/delete/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.user_id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete
    await db.delete(user)
    await db.commit()

    return {"status": "deleted", "id": user_id}