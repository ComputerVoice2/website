// script.js
// Get the DOM elements
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speakButton = document.getElementById("speak-button");
const stopButton = document.getElementById("stop-button");

// Initialize the speech synthesis API
const synth = window.speechSynthesis;

// Create an array to store the available voices
let voices = [];

// A function to populate the voice select element
const populateVoiceList = () => {
  // Get the voices from the speech synthesis API
  voices = synth.getVoices();

  // Loop through the voices and create an option element for each one
  for (let i = 0; i < voices.length; i++) {
    // Create a new option element
    let option = document.createElement("option");
    // Set the value and text of the option element
    option.value = voices[i].name;
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    // Append the option element to the voice select element
    voiceSelect.appendChild(option);
  }
};

// A function to speak the text input
const speak = () => {
  // Check if the speech synthesis API is speaking
  if (synth.speaking) {
    // If yes, alert the user and return
    alert("Speech synthesis is already speaking.");
    return;
  }
  // Check if the text input is not empty
  if (textInput.value !== "") {
    // If yes, create a new speech synthesis utterance
    let utterance = new SpeechSynthesisUtterance(textInput.value);
    // Set the voice of the utterance to the selected voice
    utterance.voice = voices.find(
      (voice) => voice.name === voiceSelect.value
    );
    // Speak the utterance
    synth.speak(utterance);
  }
};

// A function to stop the speech synthesis API
const stop = () => {
  // Check if the speech synthesis API is speaking
  if (synth.speaking) {
    // If yes, cancel the speech
    synth.cancel();
  }
};

// Populate the voice list when the page loads
window.addEventListener("load", populateVoiceList);

// Populate the voice list when the voices change
synth.addEventListener("voiceschanged", populateVoiceList);

// Speak the text input when the speak button is clicked
speakButton.addEventListener("click", speak);

// Stop the speech synthesis API when the stop button is clicked
stopButton.addEventListener("click", stop);
