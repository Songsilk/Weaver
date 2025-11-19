from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str | None = None
    avatar_url: str | None = None


class UserRead(BaseModel):
    user_id: int
    email: EmailStr
    password: str
    username: str | None = None
    avatar_url: str | None = None