from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    status: str
    avatar_url: str = ""

class UserResponse(BaseModel):
    user_id: int
    email: str
    username: str
    password: str
    status: str
    avatar_url: str