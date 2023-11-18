import ChatPage from "../pages/chat/ChatPage.jsx";
import SettingPage from "../pages/setting/SettingPage.jsx";
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckPreference from "../components/CheckPreference/CheckPreference.jsx";

export const routes = [
    {
        icon: <MailIcon/>,
        text: "Chat",
        path: "/",
        element: <CheckPreference><ChatPage/></CheckPreference>
    },
    {
        icon: <SettingsIcon/>,
        text: "Settings",
        path: "/settings",
        element: <SettingPage/>
    }
]