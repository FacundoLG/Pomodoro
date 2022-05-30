#Python3
import os
#pydantic
from pydantic import BaseSettings
#FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#Routes
from routes.user import users_route
from routes.presets import presets_route
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users_route)
app.include_router(presets_route)
