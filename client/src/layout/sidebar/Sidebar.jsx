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
import styles from "./Sidebar.module.css";

const Sidebar = ({isOpenNavigation, setIsOpenNavigation}) => {

    const {user} = useAuth();

    return (
        <aside className={styles.Sidebar}>
            <Drawer open={isOpenNavigation} onClose={() => setIsOpenNavigation(false)}>
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