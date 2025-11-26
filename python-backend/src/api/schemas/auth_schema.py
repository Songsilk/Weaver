from pydantic import BaseModel

class Token(BaseModel):
    """ 
    Schema values returned for user response in /user/ API
    """
    token: str
    token_type: str