from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from api.dependencies import get_token_payload
from core.security import create_access_token

app = FastAPI()

@app.get("/test-token")
async def test_token(payload: dict = Depends(get_token_payload)):
    return payload

client = TestClient(app)

def test_get_token_payload_valid():
    token = create_access_token(data={"sub": "test@example.com"})
    response = client.get("/test-token", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["sub"] == "test@example.com"

def test_get_token_payload_invalid():
    response = client.get("/test-token", headers={"Authorization": "Bearer invalidtoken"})
    assert response.status_code == 401

def test_get_token_payload_missing():
    response = client.get("/test-token")
    assert response.status_code == 401
