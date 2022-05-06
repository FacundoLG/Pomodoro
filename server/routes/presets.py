#Python

#Pydantic
from lib.auth import Auth
#FastAPI
from email import message
from typing import List
from fastapi import APIRouter, Body, Header,status
from fastapi.responses import JSONResponse
#Database
from config.db import conn
from models.presets import presets
#Middlewares
from middlewares.verify_token import VerifyToken
from schemas.response import Response
#Schemas
from schemas.user import UserInToken
from schemas.presets import Preset, PresetInDatabase

presets_route = APIRouter(prefix="/presets",route_class=VerifyToken) 



@presets_route.get(
    path="/",
    response_model=List[PresetInDatabase],
    status_code=status.HTTP_200_OK,
    summary="Get all presets for a user",
    tags=["Presets"]
    )
def get_presets(Authorization: str = Header(...)):
    """ 
    # Get presets
    ## This function gets all presets for a user based on the given token 
    """
    token = Authorization.split(" ")[1]
    data:UserInToken = Auth().decode_user_token(token,True)
    fetched_presets:List[PresetInDatabase] = conn.execute(presets.select().where(presets.c.user_id == data["id"])).fetchall()
    
    return fetched_presets
@presets_route.post(
    path="/",
    response_model=Response,
    status_code=status.HTTP_201_CREATED,
    summary="Create a preset",
    tags=["Presets"]
)
def create_preset(preset: Preset = Body(...), Authorization: str = Header(...)):
    """
    # Create preset
    ## Save a param in the database
    """
    token = Authorization.split(" ")[1]
    data:UserInToken = Auth().decode_user_token(token,True) 

    conn.execute(presets.insert().values(
        name=preset.name,
        user_id=data["id"],
        pomodoro_time=preset.pomodoro_time,
        short_break_time=preset.short_break_time,
        long_break_time=preset.long_break_time,
        shorts_per_long=preset.shorts_per_long,
        ))
    return Response(message="Preset saved successfully")