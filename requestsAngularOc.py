# import requests
from flask import Flask
from flask_cors import CORS
from flask import request
from flask_jsonpify import jsonify
# import win32com.client as win32
from flask_mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.marabraz.com.br'
app.config['MAIL_PORT'] = 25
# app.config['MAIL_USERNAME'] = 'tsouzamacedo@gmail.com'
# app.config['MAIL_PASSWORD'] = 'Gustavo 20042017*'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = False
# app.config['MAIL_ASCII_ATTACHMENTS'] = True
mail = Mail(app)
# api = Api(app)

CORS(app)


@app.route("/")
def openFile():
    remetente = request.args['remetente']
    msg = Message('Teste', sender=f'{remetente}', recipients=['noc.infra@marabraz.com.br'])
    msg.body = 'Teste Angular Python com anexo 2'
    with app.open_resource('\\\\marabraz.com.br\\MAPEAMENTOS\\INFRAESTRUTURA\\LOJAS\\Planilha Ocorrências\\Vistoria-Lj123.pdf') as fp:
        msg.attach("Teste", "application/pdf", fp.read())
    mail.send(msg)

    return 'teste de envio de email com anexo 2'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
