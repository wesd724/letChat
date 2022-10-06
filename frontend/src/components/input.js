import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import List from "./list"

const Input = () => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("socket IO connect!");
        const socketIo = io(process.env.REACT_APP_URL);
        setSocket(socketIo);
        socketIo.on('show', (msg) => {
            setList(list => [...list, msg])
        })
    }, []);

    useEffect(() => {
        return () => {
            if (socket) {
                console.log("disconnect!");
                socket.disconnect();
            }
        }
    }, [socket]);

    const change = useCallback(e => {
        setText(e.target.value);
    }, []);

    const click = useCallback(() => {
        socket.emit('letChat', text);
        setText("");
    }, [socket, text]);

    return (
        <div>
            <input value={text} onChange={change} />
            <button onClick={click}>send</button>
            <List list={list} />
        </div>
    )
}

export default Input;
