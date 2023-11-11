import React from 'react';
import {NavLink} from "react-router-dom";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItem from '@mui/joy/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import styles from "./LinkMenuItem.module.css";

const LinkMenuItem = ({text, to, icon, setIsOpenNavigation}) => {
    return (
        <ListItem>
            <NavLink
                to={to}
                className={({isActive}) => {
                    return [
                        styles["LinkMenuItem"],
                        isActive ? styles["LinkMenuItem--active"] : ""
                    ].join(" ");
                }}
            >
                <ListItemButton onClick={() => setIsOpenNavigation(false)} className={styles["LinkMenuItem__button"]}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    {text}
                </ListItemButton>
            </NavLink>
        </ListItem>
    );
};

export default LinkMenuItem;