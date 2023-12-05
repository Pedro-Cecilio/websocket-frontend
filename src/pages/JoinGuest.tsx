import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";


const JoinGuest = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {userJoin} = useWebSocket()

    const userNameRef = useRef<HTMLInputElement>(null);

    const handleSubmitGuest = () => {
        const username = userNameRef.current?.value;
        if (username && username.trim()) {
            localStorage.setItem("guestUsername", username)
            userJoin(username, id || '', false)
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