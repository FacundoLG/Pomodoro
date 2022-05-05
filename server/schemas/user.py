from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    email: str

class UserInToken(BaseModel):
    username: str
    first_name: str
    last_name: str
