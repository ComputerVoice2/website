document.getElementById('speak').addEventListener('click', function() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById('text').value;
    window.speechSynthesis.speak(msg);
});

