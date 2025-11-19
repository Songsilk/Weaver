from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db import AsyncSessionLocal

app = FastAPI()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/")
async def root():
    return {"message": "FastAPI + async SQLAlchemy + asyncmy + MySQL works!"}
