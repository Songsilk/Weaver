
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
    assert "token" in data
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

async def test_update_user_password(client):
    # Create a user
    payload = {
        "email": "updatepass@example.com",
        "password": "oldpassword",
        "username": "updateuser",
        "status": "active",
        "avatar_url": ""
    }
    create_response = await client.post("/user/", json=payload)
    token = create_response.json()["token"]
    
    # Update password
    update_payload = {
        "password": "newpassword123"
    }
    response = await client.put("/user/me", json=update_payload, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    
    # Verify we can login with new password
    login_data = {
        "username": "updatepass@example.com",
        "password": "newpassword123"
    }
    login_response = await client.post("/auth/login", data=login_data)
    assert login_response.status_code == 200
    
    # Verify old password doesn't work
    old_login_data = {
        "username": "updatepass@example.com",
        "password": "oldpassword"
    }
    old_login_response = await client.post("/auth/login", data=old_login_data)
    assert old_login_response.status_code == 401

async def test_update_user_username(client):
    # Create a user
    payload = {
        "email": "updateusername@example.com",
        "password": "password123",
        "username": "oldusername",
        "status": "active",
        "avatar_url": ""
    }
    create_response = await client.post("/user/", json=payload)
    token = create_response.json()["token"]
    
    # Update username
    update_payload = {
        "username": "newusername"
    }
    response = await client.put("/user/me", json=update_payload, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "newusername"
    
    # Verify the change persists
    me_response = await client.get("/user/me", headers={"Authorization": f"Bearer {token}"})
    assert me_response.status_code == 200
    assert me_response.json()["username"] == "newusername"

async def test_update_user_avatar(client):
    # Create a user
    payload = {
        "email": "updateavatar@example.com",
        "password": "password123",
        "username": "avataruser",
        "status": "active",
        "avatar_url": ""
    }
    create_response = await client.post("/user/", json=payload)
    token = create_response.json()["token"]
    
    # Update avatar
    update_payload = {
        "avatar_url": "https://example.com/new-avatar.png"
    }
    response = await client.put("/user/me", json=update_payload, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["avatar_url"] == "https://example.com/new-avatar.png"
    
    # Verify the change persists
    me_response = await client.get("/user/me", headers={"Authorization": f"Bearer {token}"})
    assert me_response.status_code == 200
    assert me_response.json()["avatar_url"] == "https://example.com/new-avatar.png"

async def test_update_user_multiple_fields(client):
    # Create a user
    payload = {
        "email": "updatemulti@example.com",
        "password": "oldpass",
        "username": "olduser",
        "status": "active",
        "avatar_url": ""
    }
    create_response = await client.post("/user/", json=payload)
    token = create_response.json()["token"]
    
    # Update multiple fields at once
    update_payload = {
        "password": "newpass123",
        "username": "newuser",
        "avatar_url": "https://example.com/avatar.png"
    }
    response = await client.put("/user/me", json=update_payload, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "newuser"
    assert response.json()["avatar_url"] == "https://example.com/avatar.png"
    
    # Verify password was updated
    login_data = {
        "username": "updatemulti@example.com",
        "password": "newpass123"
    }
    login_response = await client.post("/auth/login", data=login_data)
    assert login_response.status_code == 200