from pydantic import BaseModel, Field


class Preset(BaseModel):
    name: str = Field(...,min_length=3, max_length=50)
    pomodoro_time:int = Field(default=30,ge=10,le=120)
    short_break_time:int = Field(default=5,ge=2,le=10) 
    long_break_time:int = Field(default=10,ge=10,le=40)
    shorts_per_long:int = Field(default=1,ge=1,le=5)

class PresetInDatabase(Preset):
    id: int 
    user_id:int

class PresetID(BaseModel):
    id: int =Field(...)