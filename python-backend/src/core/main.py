# main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routes.user_routes import router as user_router
from api.routes.contact_routes import router as contact_router
from infrastructure.db.session import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="User Management API") #, lifespan=lifespan)
# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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



# Include routes
app.include_router(user_router)
app.include_router(contact_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "FastAPI + Async SQLAlchemy User API running!"}
