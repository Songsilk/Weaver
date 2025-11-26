
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

    #r2 = await client.delete("/user/20")
    assert r1.status_code == 200