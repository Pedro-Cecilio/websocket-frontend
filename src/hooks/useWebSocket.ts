import { useWebSocketContext } from '../contexts/WebSocketContext';
import { WebSocketResponse } from '../models/webSocketResponse';
import { UserData } from '../models/UserData';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';



const useWebSocket = (): WebSocketResponse => {
    const { setParticipants } = useWebSocketContext();

    const subscribe = (stompClient: Client, topico: string, callback: (message: IMessage) => void): StompSubscription => {
        return stompClient.subscribe(`/room/${topico}`, message =>
            callback(message)
        );
    };

    const sendMessage = (stompClient: Client, message: string, topico: string): void => {
        stompClient.publish({ destination: `/app/room/${topico}`, body: message });

    };

    const unsubscribeAll = (stompSubscription: StompSubscription): void => {
        stompSubscription.unsubscribe();
    };

    const connect = (connectBrocker: string): Client => {
        const stompClient = new Client({
            brokerURL: `ws://localhost:8080/${connectBrocker}`,
        });
        stompClient.activate();
        return stompClient;
    };

    const userJoin = (username: string, uuid: string, isHost: boolean): void => {
        const userData: UserData = {
            username,
            host: isHost,
        };

        const stompClient = connect("connect")
        stompClient.onConnect = () => {
            subscribe(stompClient, uuid, (message: IMessage) => {
                setParticipants(JSON.parse(message.body))
            })
            sendMessage(stompClient, JSON.stringify(userData), uuid);
        }
    };


    return {
        subscribe,
        sendMessage,
        unsubscribeAll,
        userJoin,
        connect,
    };
};

export default useWebSocket;
