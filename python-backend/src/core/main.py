# main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routes.user_routes import router as user_router
from infrastructure.db.session import engine, Base


'''
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: dispose engine
    await engine.dispose()
'''


app = FastAPI(title="User Management API") #, lifespan=lifespan)

# Include routes
app.include_router(user_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "FastAPI + Async SQLAlchemy User API running!"}
