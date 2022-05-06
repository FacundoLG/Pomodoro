#Python

#Pydantic

#FastAPI
from email import message
from fastapi import APIRouter, Header,status
from fastapi.responses import JSONResponse

from middlewares.verify_token import VerifyToken

presets_route = APIRouter(prefix="/presets",route_class=VerifyToken) 



@presets_route.get(
    path="/",
    response_model=None,
    status_code=status.HTTP_200_OK,
    summary="Get all presets for a user",
    tags=["presets"]
    )
def presets(Authorization: str = Header(...)):
    return JSONResponse(
        content={
            "message":"si"
        }
    )