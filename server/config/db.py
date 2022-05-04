from sqlalchemy import create_engine, MetaData
from dotenv import dotenv_values

URI = None
MODE = dotenv_values()["MODE"]

if MODE == "Development":
    URI = dotenv_values()["LOCAL_URI"]

engine = create_engine(URI)
meta = MetaData()
conn = engine.connect()

if MODE == "Development":
    meta.reflect(engine)
    meta.drop_all(engine)

