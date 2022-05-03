from curses import meta
from sqlalchemy import TEXT, VARCHAR, Integer, Table, Column
from config.db import meta,engine
users = Table("users",meta,
    Column("id",Integer,primary_key=True,autoincrement=True),
    Column("username",VARCHAR(40),nullable=False),
    Column("email", VARCHAR(255),nullable=False),
    Column("password",TEXT,nullable=False),
    Column("first_name",VARCHAR(30)),
    Column("last_name",VARCHAR(30)),
)

meta.create_all(engine)