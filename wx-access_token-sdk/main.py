import click
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from routes import routes
from internal_routes import internal_routes
from basic_common.base.log import Log


class TestHandler(RequestHandler):
    def get(self):
        return self.write('test')

def create_app():
    return Application([('/test', TestHandler), *routes], debug=True)

def create_internal_app():
    return Application([('/test', TestHandler), *internal_routes], debug=True)

@click.command()
@click.option('--name', default='im-sdk', help='')
@click.option('--port', default=8002, type=int, help='默认端口8002')
@click.option('--internal_port', type=int, help='内部模块端口，不设置将不启用内部模块')
def main(name, port, internal_port):
    app = create_app()
    app.listen(port)

    if internal_port:
        internal_app = create_internal_app()
        internal_app.listen(internal_port)

    IOLoop.current().start()

if __name__ == "__main__":
    main()
