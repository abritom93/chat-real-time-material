import React from 'react';
import ListItem from "@mui/joy/ListItem";
import {Paper} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import styles from "./ChatMessageItem.module.css";

const ChatMessageItem = ({content, author}) => {
    return (
        <ListItem divider="true" className={styles.ChatMessageItem}>
            <Paper elevation={3} className={styles["ChatMessageItem_container"]}>
                <ListItemText
                    primary={content}
                    secondary={
                            <Typography
                                sx={{float: "right"}}
                                component="div"
                                variant="caption"
                                color="text.primary"
                            >
                                {author}
                            </Typography>
                    }
                />
            </Paper>
        </ListItem>
    );
};

export default ChatMessageItem;