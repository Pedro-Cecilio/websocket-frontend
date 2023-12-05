import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

export interface WebSocketResponse {
    subscribe: (stompClient: Client, topico: string, callback: (message: IMessage) => void) => StompSubscription;
    sendMessage: (stompClient: Client, message: string, topico: string) => void;
    unsubscribeAll: (stompSubscription: StompSubscription) => void;
    connect: (ConectBroker:string) => Client;
    userJoin: (username: string, uuid: string, isHost: boolean) => void;
}