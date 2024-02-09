class TextToSpeech {
  constructor() {
    this.textInput = document.getElementById("text-input");
    this.voiceSelect = document.getElementById("voice-select");
    this.speakButton = document.getElementById("speak-button");
    this.stopButton = document.getElementById("stop-button");
    this.statusMessage = document.getElementById("status-message");

    this.synth = window.speechSynthesis;
    this.voices = [];

    this.populateVoiceList();
    if (this.synth) {
      this.synth.addEventListener("voiceschanged", () => {
        this.populateVoiceList();
      });
    }

    this.speakButton.addEventListener("click", () => this.speak());
    this.stopButton.addEventListener("click", () => this.stop());
  }

  populateVoiceList() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
      for (let i = 0; i < this.voices.length; i++) {
        let option = document.createElement("option");
        option.value = this.voices[i].name;
        option.textContent = `${this.voices[i].name} (${this.voices[i].lang})`;
        this.voiceSelect.appendChild(option);
      }
    } else {
      console.error("Speech synthesis API not available");
    }
  }

  speak() {
    if (this.synth.speaking) {
      this.statusMessage.textContent = "Speech synthesis is already speaking.";
      return;
    }
    if (this.textInput.value !== "") {
      let utterance = new SpeechSynthesisUtterance(this.textInput.value);
      utterance.voice = this.voices.find(
        (voice) => voice.name === this.voiceSelect.value
      );
      this.synth.speak(utterance);
    }
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

window.addEventListener("load", () => new TextToSpeech());
