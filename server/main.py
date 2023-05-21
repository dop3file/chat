import asyncio
import websockets
import json

from server import config


class Server:
    def __init__(self):
        self.clients = set()

    async def client_connector(self, client: websockets.WebSocketClientProtocol, path: str):
        print(client)
        self.clients.add(client)
        while True:
            message = await client.recv()
            print(f"Message: {message}")
            await self.send_all_message(message)

    async def send_all_message(self, message: str):
        for client in self.clients:
            await client.send(message)

    async def run_server(self):
        print("Start server")
        await websockets.serve(
            self.client_connector,
            config.HOST,
            config.PORT
        )


if __name__ == "__main__":
    try:
        server = Server()
        event_loop = asyncio.get_event_loop()
        event_loop.run_until_complete(server.run_server())
        event_loop.run_forever()
    except KeyboardInterrupt:
        ...
    finally:
        print("Close server")
