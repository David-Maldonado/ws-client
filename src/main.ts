import { connectToServer } from './socket.client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h2>Websocket - Cliente</h2>
   <input id="jwt-token" placeholder="Json Web Token" />
   <button id="btn-connect">Conectar</button>
   <br />
   <br />
   <span id="server-status">Offline</span>
   <ul id="clients-ul"></ul>

   <form id="message-form">
      <input placeholder="message" id="message-input" type="text" />
   </form>

   <h3>Mensajes</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken= document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
 if(jwtToken.value.trim() === '') return alert('Token is required');

  connectToServer(  jwtToken.value.trim() );

});

// connectToServer()

