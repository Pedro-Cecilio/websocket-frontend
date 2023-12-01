import { useWebSocketContext } from '../contexts/WebSocketContext';

const Room = () => {
    const { participants } = useWebSocketContext();

    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            <h1>Participants:</h1>
            <ul>
                {participants.map((participant, index) => (
                    <li key={index}>
                        <strong>Username:</strong> {participant.username}, 
                        <strong> Host:</strong> {participant.host ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Room