import SockJS from 'sockjs-client';
import Stomp from 'stompjs';



export function joinChat(username: string) {
    
    const socket = new SockJS('http://localhost:8080/connect');
    const stompClient = Stomp.over(socket);
    const obj = {
        user: "Seila",
        message: "Seila"
    }
    const json = JSON.stringify(obj);
    stompClient.connect({}, () => {
        console.log('Conectado ao servidor STOMP');
        // Subscreva a um tópico específico
        stompClient.subscribe('/room', (data) => {
            console.log('Recebeu uma mensagem do servidor:', data.body);
        });

        // Envie uma mensagem para o servidor
        stompClient.send('/app/wellcome/1', {}, username);
    }, (error: any) => {
        console.error('WebSocket connection failed:', error);
    });
}