from re import M
from sqlalchemy import TEXT, VARCHAR, ForeignKey, Integer, Table, Column
from config.db import meta,engine

presets = Table("presets",meta,
    Column("id",Integer,primary_key=True,autoincrement=True),
    Column("user_id",Integer,ForeignKey("users.id")),
    Column("name",VARCHAR(50),nullable=False),
    Column("pomodoro_time",Integer,nullable=False),
    Column("short_break_time",Integer,nullable=False),
    Column("long_break_time",Integer,nullable=False),
    Column("shorts_per_long",Integer,nullable=False),
    extend_existing=True
)
meta.create_all(engine)