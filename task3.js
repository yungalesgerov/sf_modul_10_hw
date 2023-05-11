const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
let input = document.querySelector('.input');
let btnGeo = document.querySelector('.geo');
let status = document.createElement('p');
let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + input.value+'</span>'
    );
    input.value = '';
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnClose.addEventListener('click', () => {
  websocket.close();
  websocket = null;
});

btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
  // input.value = '';
});
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
  output.appendChild(status);
}
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let mapLink = document.createElement('a');
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  
  mapLink.textContent = 'Ссылка на карту';
  mapLink.target = '_blank';
 output.appendChild(mapLink);
  console.log(mapLink);
  
}

btnGeo.addEventListener('click',() => {
  
  
  if (!navigator.geolocation) {
    
    status.textContent = 'Geolocation не поддерживается вашим браузером';
    output.appendChild(status);
  } else {
    status.textContent = 'Определение местоположения…';
    output.appendChild(status);
    navigator.geolocation.getCurrentPosition(success, error);
  }
});