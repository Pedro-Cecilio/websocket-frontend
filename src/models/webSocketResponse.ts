import Stomp from 'stompjs';

export interface WebSocketResponse {
    connectBrocker: (brocker: string) => Stomp.Client;
    subscribe: (stompClient: Stomp.Client, topico: string, callback: (param: Stomp.Frame) => void) => void;
    sendMessage: (stompClient: Stomp.Client, message: string, topico: string) => void;
    unsubscribeAll: (stompClient: Stomp.Client) => void;
    connect: (stompClient: Stomp.Client) => void;
    userJoin: (username: string, uuid: string, isHost: boolean, callback: (stompClient: Stomp.Client) => void) => void;
    subscribeToPing: (stompClient: Stomp.Client, username: string, uuid: string) => void;
}