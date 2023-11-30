import { useRef } from "react"
import {joinChat} from "../services/websocket.service"

interface joinProps {
    setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}


const Join = ({ setChatVisibility }: joinProps) => {

    const userNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const username = userNameRef.current?.value;
        
        if (username && username.trim()) {
            localStorage.setItem("chatUsername", username)
            joinChat(username)
            setChatVisibility(true)
        }
    }
    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={userNameRef} placeholder="Mensagem" />
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
    )
}

export default Join;