import {useState, useEffect,useRef} from "react";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

const usePeer = () => {
    const socket = useSocket()
    const roomId = useRouter().query.roomId;
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log(`Your peer ID is ${id}`);
                setMyId(id);
            
                // Emit 'join-room' to the server
                socket?.emit('join-room', roomId, id);
            });
            
        })()
    }, [roomId, socket])

    return {
        peer,
        myId
    }
}

export default usePeer;