import pytest
from httpx import AsyncClient

# Acceptance Tests for User Stories

@pytest.mark.asyncio
async def test_story_complete_user_lifecycle(client: AsyncClient):
    """
    Covers:
    - WEA1: User Registration
    - WEA2: User Login
    - WEA3: Card Creation and Editing (Profile Update)
    - WEA13/14: User self-deletion
    """
    # WEA1: User Registration
    # "As a new user I need to register on the platform"
    user_payload = {
        "email": "lifecycle@example.com",
        "password": "securepassword",
        "username": "lifecycleuser",
        "status": "active",
        "avatar_url": ""
    }
    response = await client.post("/user/", json=user_payload)
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    token = data["token"]
    
    # WEA2: User Login
    # "As a registered user I need to log in to the system"
    login_data = {
        "username": "lifecycle@example.com",
        "password": "securepassword"
    }
    login_response = await client.post("/auth/login", data=login_data)
    assert login_response.status_code == 200
    assert "token" in login_response.json()
    
    # Verify profile access
    headers = {"Authorization": f"Bearer {token}"}
    me_response = await client.get("/user/me", headers=headers)
    assert me_response.status_code == 200
    assert me_response.json()["email"] == user_payload["email"]
    
    # WEA3: Card Creation and Editing (Profile Update)
    # "As an authenticated user I need to create and edit my personal content card"
    # Mapping "Card" to User Profile for now as per current backend capabilities
    update_payload = {
        "password": "newpassword123",
        "avatar_url": "https://example.com/new_avatar.png",
        "username": "updated_name"
    }
    update_response = await client.put("/user/me", json=update_payload, headers=headers)
    assert update_response.status_code == 200
    assert update_response.json()["avatar_url"] == update_payload["avatar_url"]
    assert update_response.json()["username"] == "updated_name"
    
    # Verify login with new password
    new_login_data = {
        "username": "lifecycle@example.com",
        "password": "newpassword123"
    }
    new_login_response = await client.post("/auth/login", data=new_login_data)
    assert new_login_response.status_code == 200
    
    # WEA13/14: User self-deletion
    # "As a user I need to delete my account" (Assuming WEA14 implies self-deletion based on context, though text said admin)
    # The provided text for WEA13/14 was identical to WEA12 (Admin delete), but typically 14 is self-delete.
    # Testing the self-delete endpoint here.
    delete_payload = {
        "email": user_payload["email"],
        "token": token
    }
    delete_response = await client.request("DELETE", "/user/me", json=delete_payload, headers=headers)
    assert delete_response.status_code == 200
    
    # Verify account is gone
    fail_login_response = await client.post("/auth/login", data=new_login_data)
    assert fail_login_response.status_code == 401

@pytest.mark.asyncio
async def test_story_security_enforcements(client: AsyncClient):
    """
    Story: The system must enforce security rules, rejecting invalid logins and unauthorized access.
    """
    # 1. Create a user for testing
    user_payload = {
        "email": "security@example.com",
        "password": "securepassword",
        "username": "securityuser",
        "status": "active",
        "avatar_url": ""
    }
    await client.post("/user/", json=user_payload)
    
    # 2. Attempt login with wrong password
    wrong_login_data = {
        "username": "security@example.com",
        "password": "wrongpassword"
    }
    response = await client.post("/auth/login", data=wrong_login_data)
    assert response.status_code == 401
    
    # 3. Attempt access to protected routes without token
    response = await client.get("/user/me")
    assert response.status_code == 401
    
    # 4. Attempt access with invalid token
    response = await client.get("/user/me", headers={"Authorization": "Bearer invalidtoken"})
    assert response.status_code == 401
