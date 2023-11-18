import React from 'react';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import {useAuth} from "../../hooks/useAuth.js";
import LinkMenuItem from "./components/LinkMenuItem/LinkMenuItem.jsx";
import {routes} from "../../routes/index.jsx";
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/joy/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import {useChat} from "../../hooks/useChat.js";
import styles from "./Sidebar.module.css";

const Sidebar = ({isOpenNavigation, setIsOpenNavigation}) => {

    const {user} = useAuth();
    const {activeUsers} = useChat();
    return (
        <aside className={styles.Sidebar}>
            <Drawer
                open={isOpenNavigation}
                onClose={() => setIsOpenNavigation(false)}
                size={"sm"}
            >
                <ModalClose/>
                <DialogTitle>Ariel Enterprise</DialogTitle>
                <DialogContent>
                    <List>
                        {
                            routes?.map(({text, path, icon}) => (
                                <LinkMenuItem
                                    key={text}
                                    setIsOpenNavigation={setIsOpenNavigation}
                                    text={text}
                                    to={path}
                                    icon={icon}
                                />
                            ))
                        }
                    </List>
                    <Divider/>
                    <DialogTitle variant={"soft"}>Users connected</DialogTitle>
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                        component="nav"
                    >
                        {
                            activeUsers?.map(text => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        p: 1.5,
                        pb: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Avatar size="lg"/>
                    <div>
                        <Typography level="title-md">{user}</Typography>
                    </div>
                </Box>
            </Drawer>
        </aside>
    );
};

export default Sidebar;