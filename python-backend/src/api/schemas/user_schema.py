from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    status: str
    avatar_url: str = ""

class UserResponse(BaseModel):
    user_id: int
    email: EmailStr
    username: str
    status: str
    avatar_url: str | None = None

class UserWithToken(BaseModel):
    user: UserResponse
    token: str