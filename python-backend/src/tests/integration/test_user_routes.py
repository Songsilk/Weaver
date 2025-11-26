
def test_dummy():
    assert True

async def test_create_user(client):
    payload = {
        "email": "step@exadkikmhple.com",
        "password": "secret",
        "username": "tester",
        "status": "active",
        "avatar_url": ""
    }

    response = await client.post("/user/", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == payload["email"]
    return data["token"]

async def test_login(client):
    # First create a user
    payload = {
        "email": "login@example.com",
        "password": "mypassword123",
        "username": "loginuser",
        "status": "active",
        "avatar_url": ""
    }
    await client.post("/user/", json=payload)
    
    # Now try to login with correct credentials
    login_data = {
        "username": "login@example.com",  # OAuth2PasswordRequestForm uses 'username' field
        "password": "mypassword123"
    }
    response = await client.post("/auth/login", data=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    
    # Try with wrong password
    wrong_login_data = {
        "username": "login@example.com",
        "password": "wrongpassword"
    }
    response = await client.post("/auth/login", data=wrong_login_data)
    assert response.status_code == 401

async def test_read_users_me(client):
    # First create a user to get a token
    payload = {
        "email": "me@example.com",
        "password": "secret",
        "username": "metester",
        "status": "active",
        "avatar_url": ""
    }
    create_response = await client.post("/user/", json=payload)
    token = create_response.json()["token"]
    
    # Use token to access /me
    response = await client.get("/user/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == payload["email"]

async def test_delete_user(client):
    # create user
    payload = {
        "email": "to_dddeledte@sexample.com",
        "password": "secret",
        "username": "deltester",
        "status": "active",
        "avatar_url": ""
    }

    r1 = await client.post("/user/", json=payload)
    assert r1.status_code == 200
    
    # We need to extract user_id from the new response structure if we were using it,
    # but the test just asserts 200 on creation.
    # If we want to test deletion, we need the ID.
    user_id = r1.json()["user"]["user_id"]
    
    # To delete, we might need auth if we protected it, but currently delete is not protected in routes.
    # However, let's verify deletion works.
    r2 = await client.delete(f"/user/{user_id}")
    assert r2.status_code == 200