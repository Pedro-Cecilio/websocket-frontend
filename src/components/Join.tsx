import { useRef } from "react"
import { hostjoin } from "../services/websocket.service"
import { useNavigate } from "react-router-dom";
import { generateUuid } from '../utils/generateUuid';

const Join = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const username = userNameRef.current?.value;

        if (username && username.trim()) {
            const uuid = generateUuid();
            await hostjoin(username, uuid)
            navigate(`configRoom/${uuid}`)
        }
    }

    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            <h1>Join</h1>
            <input type="text" ref={userNameRef} placeholder="Mensagem" className="p-3 rounded" />
            <button onClick={() => handleSubmit()}>
                Entrar Host
            </button>
        </div>
    )
}

export default Join;