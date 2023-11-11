import React, {useState} from 'react';
import styles from "./Header.module.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../../hooks/useAuth.js";
import Popover from '@mui/material/Popover';
import Login from "../../components/login/Login.jsx";

const Header = ({setIsOpenNavigation}) => {
    const {user, login, logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onLogout = () => {
        setAnchorEl(null);
        logout();
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
                            Chat
                        </Typography>
                        {
                            user ?
                                (
                                    <Button color="inherit" onClick={onLogout}>({user}) Logout</Button>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={handleClick}>
                                            Login
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
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