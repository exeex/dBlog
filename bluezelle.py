import websockets as ws
import json

UUID = "caa7eeca-3ca8-427d-bd17-a42e8c37ea06"

class bluezelle:
    def __init__(self,UUID=UUID, ip= "127.0.0.1:51010"):
        self.UUID = UUID
        self.ip = ip
        self.channel = self.connect()

    def connect(self):
        return ws.connect("ws://"+self.ip)



    def create(self, key, value):

        data = {
            "bzn-api": "crud",
            "cmd": "create",
            "data": {
                "key": key,
                "value": value
            },
            "db-uuid": "80174b53-2dda-49f1-9d6a-6a780d4cceca",
            "request-id": 33
        }


        ret = dir(self.channel)
        print(ret)







b = bluezelle()

b.connect()

b.create("gg","gggg")