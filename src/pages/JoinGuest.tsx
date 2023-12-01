import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Stomp from 'stompjs';
import useWebSocket from "../hooks/useWebSocket";


const JoinGuest = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {userJoin, subscribeToPing} = useWebSocket()
    const [stompClient, setStompClient] = useState<Stomp.Client>()

    const userNameRef = useRef<HTMLInputElement>(null);

    const handleSubmitGuest = () => {
        const username = userNameRef.current?.value;
        if (username && username.trim()) {
            localStorage.setItem("guestUsername", username)
            userJoin(username, id || '', false, setStompClient)
            subscribeToPing(stompClient!, username, id!)
            navigate(`/room/${id}`)
        }
    }

    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            <h1>Join Guest</h1>
            <input type="text" ref={userNameRef} placeholder="Nome" className="p-3 rounded" />
            <button onClick={() => handleSubmitGuest()}>Entrar Guest</button>
        </div>
    )
}

export default JoinGuest;