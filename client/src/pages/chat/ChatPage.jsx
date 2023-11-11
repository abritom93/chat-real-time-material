import PageLayout from "../../layout/PageLayout.jsx";
import ChatContainer from "./components/chatContainer/ChatContainer.jsx";

const ChatPage = () => {
    return (
        <PageLayout title={"Chat"}>
            <ChatContainer/>
        </PageLayout>
    );
};

export default ChatPage;