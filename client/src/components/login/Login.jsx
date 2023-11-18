import React from 'react';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import styles from "./login.module.css";

const Login = ({username, setUsername, login}) => {
    return (
        <div className={styles.Login}>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Type your username"
                inputProps={{'aria-label': 'Type your username'}}
                value={username ?? ""}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={() => login(username)}>
                <LoginIcon/>
            </IconButton>
        </div>
    );
};

export default Login;