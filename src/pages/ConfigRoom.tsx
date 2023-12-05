import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UserInLobbyContainer from "../components/usersInLobbyContainer"
import CopyToClipboardButton from "../components/copyToClipboardButton"
// import JoinGuest from "./JoinGuest"


const ConfigRoom = () => {

    const { id } = useParams()
    const [guestLink, setGuestLink] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        
        generateGuestLink()      
        // Chamar o back pra ver se o id da sala 
        // vai ser igual ao id do localstorage
    }, [id])
    
    const generateGuestLink = () => {
        const baseUrl = 'http://localhost:5173'
        const link = `${baseUrl}/joinGuest/${id}`
        setGuestLink(link)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10">
          {/* CopyToClipboardButton at the top center */}
          <CopyToClipboardButton textToCopy={guestLink} />
      
          <div className="w-[100vw] flex flex-col items-center gap-10">
            <h1>Config Room</h1>
            <input type="text" placeholder="Nome da sala" />
            <button onClick={() => navigate(`/room/${id}`)}>Entrar na Sala</button>
          </div>
      
          {/* UserInLobbyContainer at the bottom left */}
          <div className="mt-auto">
            <UserInLobbyContainer />
          </div>
        </div>
      );
      
}

export default ConfigRoom;