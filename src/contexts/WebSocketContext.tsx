import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface UserData {
    username: string;
    host: boolean
    token?: string
}

interface WebSocketContextProps {
    participants: UserData[];
    setParticipants: Dispatch<SetStateAction<UserData[]>>;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

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
