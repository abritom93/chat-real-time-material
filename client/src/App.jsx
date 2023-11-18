import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {AuthProvider} from "./providers/AuthProvider.jsx";
import {routes} from "./routes/index.jsx";
import {PreferenceProvider} from "./providers/PreferencesProvider.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import {ChatProvider} from "./providers/ChatProvider.jsx";

function App() {

    const router = createBrowserRouter([...routes, {
        path: "*",
        element: <NotFoundPage/>
    }]);

    return (
        <AuthProvider>
            <PreferenceProvider>
                <ChatProvider>
                    <RouterProvider router={router}/>
                </ChatProvider>
            </PreferenceProvider>
        </AuthProvider>
    )
}

export default App
