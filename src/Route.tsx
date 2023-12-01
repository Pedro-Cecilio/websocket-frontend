import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfigRoom from './pages/ConfigRoom'
import Join from './pages/Join'
import Room from './pages/Room'
import JoinGuest from './pages/JoinGuest'
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

