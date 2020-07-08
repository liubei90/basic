import click
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from routes import routes
from internal_routes import internal_routes
from basic_common.base.log import Log

log = Log()

class TestHandler(RequestHandler):
    def get(self):
        return self.write('test')

def create_app():
    return Application([('/test', TestHandler), *routes], debug=True)

def create_internal_app():
    return Application([('/test', TestHandler), *internal_routes], debug=True)

@click.command()
@click.option('--name', default='wx-access_token', help='')
@click.option('--port', type=int, help='对外服务端口，不设置将不启动对外服务')
@click.option('--internal_port', type=int, help='内部模块端口，不设置将不启用内部模块')
def main(name, port, internal_port):
    if port:
        app = create_app()
        app.listen(port)

    if internal_port:
        internal_app = create_internal_app()
        internal_app.listen(internal_port)

    if not port and not internal_port:
        log.print(f'模块{name}没有启动任何服务，退出程序')
        return

    IOLoop.current().start()

if __name__ == "__main__":
    main()
