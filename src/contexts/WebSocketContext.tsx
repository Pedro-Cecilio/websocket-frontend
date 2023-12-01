import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { UserData } from '../models/UserData';

interface WebSocketContextProps {
    participants: UserData[];
    setParticipants: Dispatch<SetStateAction<UserData[]>>;
}

interface WebSocketProviderProps {
    children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [participants, setParticipants] = useState<UserData[]>([]);

    const contextValue: WebSocketContextProps = {
        participants,
        setParticipants,
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);

    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    
    return context;
};
