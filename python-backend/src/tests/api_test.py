# test_user.py
import pytest
from httpx import AsyncClient
from core.main import app  # Make sure this is the FastAPI instance

@pytest.mark.asyncio
async def test_create_user(client):
    payload = {
        "email": "test@example.com",
        "password": "secret",
        "username": "tester",
        "status": "active",   
        "avatar_url": None
    }

    # Act
    response = await client.post("/user/", json=payload)  # Note trailing slash

    # Assert
    assert response.status_code == 200
    data = response.json()
    print("CREATE RESPONSE:", data)
    assert data["message"] == "user created"


@pytest.mark.asyncio
async def test_delete_user(client):
    # First, create a user to delete
    payload = {
        "email": "to_delete@example.com",
        "username": "deltester",
        "password": "secret",
        "status": "active",   
        "avatar_url": None
    }
    r1 = await client.post("/user/", json=payload)  # trailing slash
    assert r1.status_code == 200
    data1 = r1.json()

    # Assuming create_user_service returns a user object with id
    user_id = data1.get("id") or data1.get("user_id")  # adjust based on your response
    assert user_id is not None

    # Delete the user
    r2 = await client.delete(f"/user/{user_id}")
    assert r2.status_code == 200

    # Ensure user no longer exists
    r3 = await client.get(f"/user/{user_id}")
    assert r3.status_code == 404
