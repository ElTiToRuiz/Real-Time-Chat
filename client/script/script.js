import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io() 

const form = document.getElementById('form');
const input = document.getElementById('input');
const container = document.getElementById('message')
const span = document.createElement('span')

const generateUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

const checkId = (inputId=null) =>{
    const id = localStorage.getItem('userId')
    if (inputId!== null) return id === inputId 
    if(id) return id
    const newId = generateUUID()
    localStorage.setItem('userId', newId)
    return newId
}

const appendMessage = (msg, isUser) =>{
    const div = document.createElement('div')
    const message = document.createElement('p');
    div.className = isUser ? 'user' : 'other' 
    message.textContent = msg;
    div.appendChild(message)
    container.appendChild(div)
    scrollToBottom()
}

const scrollToBottom = () => {
    container.scrollTop = container.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (msg) {
        socket.emit('chat message', msg, checkId())
        input.value = '';
    }
});


function logMessage(msg) {
    log.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
}

socket.on('load messages', (messages) => {
    messages.forEach(({id, userID, content}) => {
        appendMessage(content, checkId(userID))
    });
});

socket.on('chat message', (msg, userId, lastMes)=>{
    appendMessage(msg, checkId(userId))
})

socket.on('disconnect', (socket) => {
    console.log(socket)
    logMessage('disconnected')
})