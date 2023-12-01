import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useWebSocketContext } from '../contexts/WebSocketContext';
import { WebSocketResponse } from '../models/webSocketResponse';
import { UserData } from '../models/UserData';


const useWebSocket = (): WebSocketResponse => {
    const { setParticipants } = useWebSocketContext();

    const connectBrocker = (brocker: string): Stomp.Client => {
        const socket = new SockJS('http://localhost:8080/' + brocker);
        const stompClient = Stomp.over(socket);
        return stompClient;
    };

    const subscribe = (stompClient: Stomp.Client, topico: string, callback: (param: Stomp.Frame) => void): void => {
        stompClient?.subscribe(topico, callback, { id: 'all' });
    };

    const sendMessage = (stompClient: Stomp.Client, message: string, topico: string): void => {
        stompClient?.send(topico, {}, message);
    };

    const unsubscribeAll = (stompClient: Stomp.Client): void => {
        stompClient.unsubscribe('all');
    };

    const connect =  (stompClient: Stomp.Client): void => {
            stompClient.connect({}, () => {
                console.log('WebSocket connection opened');
            }, (error) => {
                console.error('WebSocket connection failed:', error);
            });
    };

    const userJoin =  (username: string, uuid: string, isHost: boolean, callback: (stompClient: Stomp.Client) => void): any => {
        const userData: UserData = {
            username,
            host: isHost,
        };
        
        const stompClient = connectBrocker('connect');

        callback(stompClient);

        stompClient?.connect({}, () => {
            console.log('Conectado ao servidor STOMP');

            subscribe(stompClient, `/room/${uuid}`, (joinData: Stomp.Frame) => {
                console.log('Recebeu uma mensagem do servidor:', joinData.body);

                    const users: UserData[] = JSON.parse(joinData.body);
                    
                    setParticipants(users);
            
            });
            
            sendMessage(stompClient, JSON.stringify(userData), `/app/room/${uuid}`);
        }, (error: any) => {
            console.error('WebSocket connection failed:', error);
        });
    };

    const subscribeToPing = (stompClient: Stomp.Client, username: string, uuid: string): any => {
        console.log('Entrou no subscribe to Ping!');
        stompClient?.connect({}, () =>  {
            console.log('Pingou!');
            subscribe(stompClient, `/room/${uuid}/ping`, (res) => {
                console.log(res.body);
            });

            sendMessage(stompClient, username, `/room/${uuid}/ping`);
        }, (error) => {
            console.error('Error:', error);
        });
    };

    return {
        connectBrocker,
        subscribe,
        sendMessage,
        unsubscribeAll,
        userJoin,
        connect,
        subscribeToPing,
    };
};

export default useWebSocket;
