import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {AuthProvider} from "./providers/AuthProvider.jsx";
import {routes} from "./routes/index.jsx";
import {PreferenceProvider} from "./providers/PreferencesProvider.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";

function App() {

    const router = createBrowserRouter([...routes, {
        path: "*",
        element: <NotFoundPage/>
    }]);

    return (
        <AuthProvider>
            <PreferenceProvider>
                <RouterProvider router={router}/>
            </PreferenceProvider>
        </AuthProvider>
    )
}

export default App
