import { useEffect, useState } from "react"
import JoinGuest from "./JoinGuest"


const ConfigRoom = () => {

    useEffect(() => {
        // Chamar o back pra ver se o id da sala 
        // vai ser igual ao id do localstorage
    }, [])

    // const { id } = useParams()
    // console.log(id)

    const [isHost, setIsHost] = useState(true)

    return (
        <div>
            {isHost ?
                <div className="w-[100vw] flex items-center flex-col gap-10">
                    <h1>Config Room</h1>
                    <input type="text" placeholder="Nome da sala" />
                    <button>Enviar</button>
                </div>

                :

                <JoinGuest />
            }
        </div>
    )
}

export default ConfigRoom;