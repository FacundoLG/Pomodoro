#Python3

#pydantic

#FastAPI
from fastapi import FastAPI
#Routes
from routes.user import users_route
app = FastAPI()
app.include_router(users_route)

@app.get("/")
async def root():
    return {"message": "Hello world"}