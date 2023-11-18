import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://broken-fog-300.fly.dev/';

export const socket = io(URL,{
    autoConnect: false
});