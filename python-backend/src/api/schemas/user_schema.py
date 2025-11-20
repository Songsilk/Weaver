from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    avatar_url: str = ""
    biography: str = ""


class UserResponse(BaseModel):
    user_id: int
    email: str
    username: str
    avatar_url: str
    biography: str
