import React, {useState} from 'react';
import styles from "./Header.module.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../../hooks/useAuth.js";
import Popover from '@mui/material/Popover';
import Login from "../../components/login/Login.jsx";
import {socket} from "../../socket.js";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({setIsOpenNavigation, title}) => {
    const {user, login, logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLoginClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onLogout = () => {
        setAnchorEl(null);
        logout();
        socket.emit("logout")
    }

    return (
        <header className={styles.Header}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => setIsOpenNavigation(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {title}
                        </Typography>
                        {
                            user ?
                                (
                                    <Button
                                        variant="plain"
                                        color="neutral"
                                        endDecorator={<LogoutIcon variant="" />}
                                        onClick={onLogout}>{user}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            color="inherit"
                                            onClick={handleClick}>
                                            Login
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleLoginClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}

                                        >
                                            <Login
                                                setUsername={setUsername}
                                                login={login}
                                                username={username}
                                            />
                                        </Popover>
                                    </>

                                )
                        }

                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default Header;