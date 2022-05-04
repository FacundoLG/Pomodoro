#Python

#FastAPI
from select import select
from fastapi import APIRouter, Form,HTTPException,status
from pydantic import EmailStr
#DB
from config.db import conn
#Shemas
from models.user import users

users_route = APIRouter(prefix="/users")

username_max_length = 30
username_min_length = 2
password_min_length = 10
password_max_length = 30
name_max_length = 30
name_min_length = 2

@users_route.post(
    path="/register",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
    summary="Save a user in a database",
    tags=["users"]
    )
def register(
    username: str = Form(
        ...,
        max_length=username_max_length,
        min_length=username_min_length,
        example="WhiteBeard33",
        ),
    password: str = Form(
        ...,
        max_length=password_max_length,
        min_length=password_min_length,
        example="sdfgklgf.edfrkjih"
        ),
    confirmation_password: str = Form(
        ...,
        max_length=password_max_length,
        min_length=password_min_length,
        example="sdfgklgf.edfrkjih"
        ),
    email: EmailStr = Form(...),
    first_name:str = Form(
        ...,
        max_length=name_max_length,
        min_length=name_min_length,
        example="Facundo Leonel"
    ),
    last_name: str = Form(
        ...,
        max_length=name_max_length,
        min_length=name_min_length,
        example="Gimenez",
    )
):
    """ 
        ## Save a user in a database
         
        ### If there is an error in any input, it will raise an error with the field as a key and a message as a value
    """
    if not password == confirmation_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "confirmation_password": "Not equal to password"
            }
        )
    found_users = conn.execute(users.select().where(users.c.username == username)).fetchall()
    return found_users
@users_route.post(
    path="login",
    response_model=None,
    status_code=status.HTTP_200_OK,
    summary="Authenticates a user",
    tags=["users"]
)

def login(
    username: str = Form(
        ...,
        max_length=username_max_length,
        min_length=username_min_length,
        example="WhiteBeard33",
        ),
    password: str = Form(
        ...,
        max_length=password_max_length,
        min_length=password_min_length,
        example="sdfgklgf.edfrkjih"
        ),
    ):
    pass