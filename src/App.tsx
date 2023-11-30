import Join from "./components/Join";
import Chat from "./components/Chat";
import { useState } from "react"

const App = () => {
    const [chatVisibility, setChatVisibility] = useState(false)
    return (
        <div className="w-[100vw] flex items-center flex-col gap-10">
            {!chatVisibility ?
                <Join setChatVisibility={setChatVisibility} />
                :
                <Chat />
            }

        </div>
    )
}

export default App;