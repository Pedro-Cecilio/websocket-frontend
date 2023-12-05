# Websocket + React

Para começar, certifique-se de adicionar a biblioteca @stomp/stompjs ao seu projeto React:

```
npm install @stomp/stompjs
```

### Arquivo: useWebSocket

Vamos analisar o código do hook **useWebSocket** linha a linha:

Inicializamos o hook **useWebSocket** e desestruturamos a função **setParticipants** do contexto criado em **useWebSocketContext**.

```
const useWebSocket = (): WebSocketResponse => {
    const { setParticipants } = useWebSocketContext();
```

Definimos a função **subscribe** que recebe um cliente **Stomp**, um **tópico** e um **callback**. Ela subscreve ao tópico **WebSocket** e executa o callback quando uma mensagem é recebida.

```
 const subscribe = (stompClient: Client, topico: string, callback: (message: IMessage) => void): StompSubscription => {
        return stompClient.subscribe(`/room/${topico}`, message =>
            callback(message)
        );
    };
```

Implementamos a função **sendMessage** para enviar mensagens ao servidor. Ela utiliza o cliente **Stomp** para publicar uma mensagem no destino apropriado.

```
    const sendMessage = (stompClient: Client, message: string, topico: string): void => {
        stompClient.publish({ destination: `/app/room/${topico}`, body: message });
    };
```

Criamos a função **unsubscribeAll** para cancelar a inscrição em todos os tópicos associados a uma assinatura Stomp.

```
    const unsubscribeAll = (stompSubscription: StompSubscription): void => {
        stompSubscription.unsubscribe();
    };
```

Implementamos a função **connect** para criar e ativar um cliente **Stomp**, conectando-o ao endpoint **WebSocket** do servidor.

```
    const connect = (connectBrocker: string): Client => {
        const stompClient = new Client({
            brokerURL: `ws://localhost:8080/${connectBrocker}`,
        });
        stompClient.activate();
        return stompClient;
    };
```

A função **userJoin** representa a ação de um usuário ingressando na sala. Ela cria um objeto de dados do usuário, estabelece a conexão WebSocket e executa a inscrição, envio de mensagem e processamento de mensagens.

```
    const userJoin = (username: string, uuid: string, isHost: boolean): any => {
        const userData: UserData = {
            username,
            host: isHost,
        };

        const stompClient = connect("connect");
        stompClient.onConnect = () => {
            subscribe(stompClient, uuid, (message: IMessage) => {
                setParticipants(JSON.parse(message.body))
            });
            sendMessage(stompClient, JSON.stringify(userData), uuid);
        }
    };
```

Finalmente, o hook retorna um objeto contendo todas as funções necessárias para interagir com o WebSocket no frontend React. Isso inclui subscrever, enviar mensagens, cancelar inscrições, realizar a conexão e permitir que um usuário entre na sala.

```
    return {
        subscribe,
        sendMessage,
        unsubscribeAll,
        userJoin,
        connect,
    };
};

export default useWebSocket;
```

#

### Arquivo: Componente Join


Vamos analisar o componente Join que utiliza o hook **useWebSocket**:

No geral, o componente Join fornece uma interface simples para os usuários inserirem um nome de usuário, e ao clicarem no botão, são conectados à sala como host usando o WebSocket.

Importamos useRef para criar uma referência ao campo de entrada, useNavigate para navegar para outras páginas e generateUuid para gerar um identificador único. Também importamos o hook useWebSocket para interações com o WebSocket.

```
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { generateUuid } from '../utils/generateUuid';
import useWebSocket from "../hooks/useWebSocket";

const Join = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const { userJoin } = useWebSocket()
```

Criamos a função handleSubmit que é chamada quando o formulário é enviado. Ela obtém o nome de usuário do campo de entrada, gera um UUID único, realiza a chamada para userJoin do hook useWebSocket e, em seguida, navega para a página de configuração da sala.

```
    const handleSubmit = () => {
        const username = userNameRef.current?.value;

        if (username && username.trim()) {
            const uuid = generateUuid();
            userJoin(username, uuid, true)
            navigate(`configRoom/${uuid}`)
        }
    }
```
