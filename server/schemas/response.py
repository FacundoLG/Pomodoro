from typing import Dict, Optional
from pydantic import BaseModel


class Token(BaseModel):
    token:str

class Response(BaseModel):
    message: Optional[str]

class ResponseToken(Response):
    data: Token 

class ResponseError(BaseModel):
    error: str