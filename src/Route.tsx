import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfigRoom from './components/ConfigRoom'
import Join from './components/Join'
import Room from './components/Room'
import JoinGuest from './components/JoinGuest'
import { WebSocketProvider } from './contexts/WebSocketContext'

const Router = () => {

    return (
        <BrowserRouter>
            <WebSocketProvider>
                <Routes>
                    <Route path="/" element={<Join />} />
                    <Route path="/configRoom/:id" element={<ConfigRoom />} />
                    <Route path="/joinGuest/:id" element={<JoinGuest />} />
                    <Route path="/room/:id" element={<Room />} />
                </Routes>
            </WebSocketProvider>
        </BrowserRouter>
    )
}

export default Router

