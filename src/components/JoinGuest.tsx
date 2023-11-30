import { useRef } from "react"


const JoinGuest = () => {

    const userNameRef = useRef<HTMLInputElement>(null);

    const handleSubmitGuest = () => {
        const username = userNameRef.current?.value;
        
        if (username && username.trim()) {
            localStorage.setItem("guestUsername", username)
            
            // guestjoin(username, setGuestData)
        }
    }
        
    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            <h1>Join Guest</h1>
            <input type="text" ref={userNameRef} placeholder="Mensagem" className="p-3 rounded" />
            <button onClick={() => handleSubmitGuest()}>Entrar Guest</button>
        </div>
    )
}

export default JoinGuest;