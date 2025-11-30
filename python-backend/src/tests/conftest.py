import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from core.main import app
from infrastructure.db.session import Base, get_session
from infrastructure.db.models.user_model import UserModel # Import to register with Base

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest.fixture
async def test_db():
    engine = create_async_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        future=True,
        echo=False
    )

    async_session = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False
    )

    # create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # override FastAPI dependency
    async def override_get_session():
        async with async_session() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session

    yield async_session

    app.dependency_overrides.clear()
    await engine.dispose()

@pytest.fixture
async def client(test_db):
    transport = ASGITransport(app=app)

    async with AsyncClient(
        transport=transport,
        base_url="http://testserver"
    ) as ac:
        yield ac
