import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import JoinGuest from "./JoinGuest"


const ConfigRoom = () => {

    useEffect(() => {
        // Chamar o back pra ver se o id da sala 
        // vai ser igual ao id do localstorage
    }, [])

    const [guestLink, setGuestLink] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const generateGuestLink = () => {
        const baseUrl = 'http://localhost:5173'
        const link = `${baseUrl}/joinGuest/${id}`
        setGuestLink(link)
    }

    return (
        <div>
            <div className="w-[100vw] flex items-center flex-col gap-10">
                <h1>Config Room</h1>
                <input type="text" placeholder="Nome da sala" />
                <p>{guestLink}</p>
                <button onClick={generateGuestLink}>Gerar link</button>
                <button onClick={() => { navigate(`/room/${id}`) }}>Enviar</button>
            </div>
        </div>
    )
}

export default ConfigRoom;