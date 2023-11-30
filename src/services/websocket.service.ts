import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


type UserData = {
    username: string;
    host: boolean;
};

function connectBrocker(brocker: string) {
    const socket = new SockJS('http://localhost:8080/' + brocker);
    const stompClient = Stomp.over(socket);
    return stompClient
}
async function subscribe(stompClient: Stomp.Client, topico: string, callback:(param:Stomp.Frame)=>void) {
    stompClient.subscribe(topico, callback, { id: "all" });
}

async function sendMessage(stompClient: Stomp.Client, message: string, topico: string) {
    stompClient.send(topico, {}, message);
}

async function unsubscribeAll(stompClient: Stomp.Client) {
    stompClient.unsubscribe("all");
}

const connect = async (stompClient: Stomp.Client) => {

    stompClient.connect({}, () => {
        console.log('WebSocket connection opened');
    }, (error) => {
        console.error('WebSocket connection failed:', error);
    })
}

// async function guestjoin(username: string, roomId: string, setCallback) {
//     const userData: UserData = {
//         username: username,
//         host: false
//     }

//     const stompClient = connectBrocker("connect");

//     stompClient.connect({}, () => {
//         console.log('Conectado ao servidor STOMP');

//         subscribe(stompClient, `/room/${roomId}`, (JoinData) => {
//             console.log(JoinData)
//             console.log('Recebeu uma mensagem do servidor:', JoinData.body);

//             const parsedJoinData = JSON.parse(JoinData.body);
//             setCallback({
//                 ...parsedJoinData,
//             });
//         })

//         sendMessage(stompClient, JSON.stringify(userData), '/app/room/1');
//     }, (error: any) => {
//         console.error('WebSocket connection failed:', error);
//     });
// }


async function hostjoin(username: string, uuid: string) {
    const userData: UserData = {
        username: username,
        host: true
    }

    const stompClient = connectBrocker("connect");

    stompClient.connect({}, () => {
        console.log('Conectado ao servidor STOMP');

        subscribe(stompClient, `/room/${uuid}`, (JoinData:Stomp.Frame) => {
            console.log('Recebeu uma mensagem do servidor:', JoinData.body);

            localStorage.setItem("userData", JoinData.body)
        })

        sendMessage(stompClient, JSON.stringify(userData), `/app/room/${uuid}`);
    }, (error: any) => {
        console.error('WebSocket connection failed:', error);
    });
}
export { connectBrocker, subscribe, sendMessage, unsubscribeAll, hostjoin, connect }