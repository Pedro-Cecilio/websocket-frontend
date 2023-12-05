import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { generateUuid } from '../utils/generateUuid';
import useWebSocket from "../hooks/useWebSocket";

const Join = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const { userJoin } = useWebSocket()
    const handleSubmit = () => {
        const username = userNameRef.current?.value;

        if (username && username.trim()) {
            const uuid = generateUuid();
            userJoin(username, uuid, true)
            navigate(`configRoom/${uuid}`)
        }
    }

    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            <h1>Join</h1>
            <input type="text" ref={userNameRef} placeholder="Nome" className="p-3 rounded" />
            <button onClick={handleSubmit}>
                Entrar Host
            </button>
        </div>
    )
}

export default Join;