<?php
$host = "localhost";
$db = "test_db";
$user = "root";
$pass = "";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];

    $sql = "INSERT INTO users (username, email) VALUES (?, ?)";

    // Prepare and bind
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $email);

    // Execute the statement
    $stmt->execute();

    echo "New record created successfully";
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<body>

<h2>Registration Form</h2>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Username: <input type="text" name="username">
  <br>
  E-mail: <input type="text" name="email">
  <br>
  <input type="submit">
</form>

<h2>Text to Speech</h2>

<p>Enter text and click the button:</p>

<textarea id="text" rows="5" cols="30">
Type something here...
</textarea>

<button onclick="textToSpeech()">Speak</button>

<script>
function textToSpeech() {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10];
  msg.voiceURI = 'native';
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;
  msg.text = document.getElementById('text').value;
  msg.lang = 'en-US';

  speechSynthesis.speak(msg);
}
</script>

</body>
</html>
