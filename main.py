from flask import Flask, request, send_file
from gtts import gTTS
import os

pip install flask gTTS


app = Flask(__name__)

@app.route('/convert')
def convert():
    text = request.args.get('text')
    speech = gTTS(text=text, lang='en', slow=False)
    filename = "output.mp3"
    speech.save(filename)
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)
