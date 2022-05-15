#Python

#FastAPI
from fastapi import APIRouter, Form,HTTPException,status
from pydantic import EmailStr
from sqlalchemy import or_
#DB
from config.db import conn
from lib.auth import Auth
#Shemas
from models.user import users
from schemas.response import Response, ResponseError,ResponseToken
from schemas.user import UserInToken

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
    tags=["Users"]
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
         
        ## If there is an error in any input, it will raise an error with the field as a key and a message as a value
    """
    if not password == confirmation_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "confirmation_password": "Not equal to password"
            }
        )
    found_users = conn.execute(users.select().where(or_(users.c.username == username, users.c.email == email) )).fetchall()
    if len(found_users) >=1:
        print(found_users)
        error_detail = {}
        if found_users[0]["username"] == username:
            error_detail["username"] = "This username is not available"
        if found_users[0]["email"] == email:
            error_detail["email"] = "This email is already used"
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=error_detail
            )

    hashed_password = Auth().hash_password(password).decode("utf-8")
    conn.execute(users.insert().values(username=username,password=hashed_password,first_name=first_name,email=email,last_name=last_name))
    return Response(message="User created successfully")

@users_route.post(
    path="/login",
    response_model=ResponseToken,
    status_code=status.HTTP_200_OK,
    summary="Authenticates a user",
    tags=["Users"]
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
    """ 
    # Login
    ## This function gets a user based on the given username, then check if exist and compare the passwords, if all is okey, will return a token
    """
    fetched_user = conn.execute(users.select().where(users.c.username == username)).fetchall()
    if len(fetched_user) == 1:
        user = fetched_user[0]
        if Auth().check_password_match(password,user.password):
            user:UserInToken = {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
            token = Auth().encode_user_data(user)
            Auth().decode_user_token(token)
            return ResponseToken(
                message="User authenticated", 
                data={
                       "token": token
                     }
                )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )