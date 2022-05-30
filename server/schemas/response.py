from typing import Dict, Optional,List
from pydantic import BaseModel



class Token(BaseModel):
    token:str

class Response(BaseModel):
    message: Optional[str]
    data: Optional[Dict]

class ResponseToken(Response):
    data: Token 

class ResponseError(BaseModel):
    error: str