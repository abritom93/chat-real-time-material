import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ChatPage from "./pages/chat/ChatPage.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import {AuthProvider} from "./providers/AuthProvider.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/"  element={<ChatPage/>}/>
                    <Route path="/chat" element={<ChatPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
