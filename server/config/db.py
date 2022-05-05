from sqlalchemy import create_engine, MetaData
from config.config import config
URI = None

MODE = config["MODE"]

if MODE == "Development":
    print("INFO:     Using local DATABASE")
    URI = config["LOCAL_URI"]

engine = create_engine(URI)
meta = MetaData()
conn = engine.connect()

if MODE == "Development":
    meta.reflect(engine)
    meta.drop_all(engine)

