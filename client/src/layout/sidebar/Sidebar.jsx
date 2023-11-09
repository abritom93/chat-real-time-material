import React from 'react';
import styles from "./Sidebar.module.css";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import {useAuth} from "../../hooks/useAuth.js";
import {NavLink} from "react-router-dom";

const Sidebar = ({isOpenNavigation, setIsOpenNavigation}) => {

    const {user} = useAuth();

    return (
        <aside className={styles.Sidebar}>
            <Drawer open={isOpenNavigation} onClose={() => setIsOpenNavigation(false)}>
                <ModalClose/>
                <DialogTitle>Ariel Enterprise</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={() => setIsOpenNavigation(false)}>
                                <NavLink
                                    to={"/chat"}
                                    style={({isActive, isPending}) => {
                                        return {
                                            color: isActive ? "grey" : "inherit",
                                        };
                                    }}
                                    className={({isActive, isPending}) => {
                                        return isActive ? "active" : isPending ? "pending" : "";
                                    }}
                                >
                                    Chat
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
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