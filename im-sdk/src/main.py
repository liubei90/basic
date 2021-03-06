import click
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from routes import routes

class TestHandler(RequestHandler):
    def get(self):
        return self.write('test')

def create_app():
    return Application([('/test', TestHandler), *routes], debug=True)

@click.command()
@click.option('--name', default='im-sdk', help='')
@click.option('--port', default=8002, type=int, help='默认端口8001')
def main(name, port):
    app = create_app()
    app.listen(port)
    IOLoop.current().start()

if __name__ == "__main__":
    main()