import { Manager, Socket } from 'socket.io-client'

let socket: Socket;
export const connectToServer = (jwtToken:string) => {

    // en la conection por websocket es siempre entre cliente y servidor, no hay peer to peer como en webrtc 

    const manager = new Manager('localhost:3001/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: `${jwtToken}`
        }
    }
        );

        //para evitar que se dupliquen los listeners
        socket?.removeAllListeners();
        //namespace is the path of the server o raiz
    socket = manager.socket('/') 

   addListeners();
}

const addListeners = () => {
    const serverStatusLabel = document.querySelector('#server-status');
    const clientsUl = document.querySelector('#clients-ul');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUl = document.querySelector('#messages-ul');

    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'Conectado';
    });

    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'Desconectado';
    });


    socket.on('clients-updated', (clients: string[]) => {
        clientsUl!.innerHTML = '';
        clients.forEach(client => {
            const li = document.createElement('li');
            li.innerHTML = client;
            clientsUl!.appendChild(li);
        });
    }
    );

    messageForm!.addEventListener('submit', (event) => {
        event.preventDefault();
           if(messageInput!.value.trim() === '') return;
        
        //emitir un mensaje al servidor, pero el servidor tambien tiene que estar 
        socket.emit('message-from-client', {
            id: socket.id,
            message: messageInput!.value
        });

        messageInput!.value = '';
       
       
    });


    socket.on('message-from-server',
     ( payload: {fullName:string, message:string}) => {
        const li = document.createElement('li');
        li.innerHTML = `${payload.fullName}: ${payload.message}`;
        messagesUl!.appendChild(li);
     });
    
   
}  