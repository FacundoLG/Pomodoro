from fastapi import HTTPException, Request,status
from lib.auth import Auth
from fastapi.routing import APIRoute


class VerifyToken(APIRoute):
    def get_route_handler(self):
        original_route = super().get_route_handler()

        async def verify_token_middleware(request:Request):
            tkn = ""
            try:
                tkn = request.headers["Authorization"].split(" ")[1]
            except:
                raise HTTPException(detail={
                    "message":"No authorization token"
                },status_code=status.HTTP_400_BAD_REQUEST)
            token_validation = Auth().decode_user_token(tkn)
            if token_validation == None:
                return await original_route(request)
            else:
                return token_validation
        return verify_token_middleware