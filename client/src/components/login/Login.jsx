import React from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./login.module.css";

const Login = ({username, setUsername, login}) => {
    return (
        <div className={styles.Login}>
            <TextField
                value={username ?? ""}
                onChange={(e) => setUsername(e.target.value)}
                size={"medium"}
                placeholder={"Type your usename"}
                label={"Username"}
            />
            <Button size={"small"}  variant={"outlined"} onClick={() => login(username)}>
                <Typography variant={"body2"} sx={{p: 2}}>Sign in</Typography>
            </Button>
        </div>
    );
};

export default Login;