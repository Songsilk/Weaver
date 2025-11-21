import pytest

@pytest.mark.asyncio
async def test_create_user(client):
    # Arrange
    payload = {
        "email": "test@example.com",
        "password": "secret",
        "username": "tester",
        "status": "active",   
        "avatar_url": None
    }
    

    # Act
    response = await client.post("/user", json=payload)

    # Assert
    assert response.status_code == 200
    data = response.json()
    print("AAAAAAAAAAAAAAAAAA", data)
    assert data["message"] == "user created"


@pytest.mark.asyncio
async def test_delete_user(client):
    # First create a user so we have something to delete
    payload = {
        "email": "to_delete@example.com",
        "password": "secret",
        "username": "deltester",
        "status": "active",   
        "avatar_url": None
    }
    r1 = await client.post("/user", json=payload)
    assert r1.status_code == 200
    print(r1)
    user_id = 1

    # Now delete the user
    r2 = await client.post(f"/delete/{user_id}")
    assert r2.status_code == 200

    # Ensure deleted user no longer exists
    r3 = await client.get(f"/users/{user_id}")
    assert r3.status_code == 404
