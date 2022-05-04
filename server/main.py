#Python3
import os
#pydantic

#FastAPI
from fastapi import FastAPI
from pydantic import BaseSettings
#Routes
from routes.user import users_route
app = FastAPI()
app.include_router(users_route)

@app.get("/")
async def root():
    return {"message": "Hello world"}