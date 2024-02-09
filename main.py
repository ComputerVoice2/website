from flask import Flask, render_template, request, send_file
from gtts import gTTS
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def text_to_speech():
    text = request.form['speech']
    language = 'en'
    myobj = gTTS(text=text, lang=language, slow=False)
    myobj.save("welcome.mp3")
    return send_file("welcome.mp3", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
