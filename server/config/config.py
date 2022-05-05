from distutils.command.config import config
from dotenv import dotenv_values

config = dotenv_values(".env")