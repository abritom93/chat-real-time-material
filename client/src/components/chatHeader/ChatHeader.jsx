import React from 'react';
import writingGif from "../../assets/writing.gif";
import styles from "./ChatHeader.module.css";

const ChatHeader = ({authorWriting}) => {
    return (
        <>
            {
                authorWriting && (
                    <div className={styles.ChatHeader}>
                        <>
                            <strong>{authorWriting?.toUpperCase()}  </strong>
                            <img alt={"Something writing"} src={writingGif}/>
                        </>
                    </div>
                )
            }
        </>
    )
};

export default ChatHeader;