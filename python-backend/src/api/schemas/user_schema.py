from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """
    Schema values received for user creation in /user/ API
    """
    email: EmailStr
    password: str
    username: str
    status: str
    avatar_url: str = ""


class UserUpdate(BaseModel):
    """
    Schema values received for user update in /user/me API
    """
    password: str | None = None
    username: str | None = None
    avatar_url: str | None = None


class UserResponse(BaseModel):
    """
    Schema values returned for user response in /user/me API
    """
    user_id: int
    email: EmailStr
    username: str
    status: str
    avatar_url: str | None = None
    
class UserWithToken(BaseModel):
    """
    Schema values returned for user response in /user/ API
    """
    user: UserResponse
    token: str


class UserDelete(BaseModel):
    """
    Schema values received for user deletion in /user/me API
    """
    email: EmailStr
    token: str

class UserDeleted(BaseModel):
    """
    Schema values returned for user deletion in /user/me API
    """
    status: str
    email: EmailStr