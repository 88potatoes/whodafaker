import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

function Room() {
    const params = useParams();
    const [players, setPlayers] = useState<number[]>([])
    const roomCode = params.roomCode;
    console.log(roomCode);

    useEffect(() => {
        const socket = io("ws://localhost:9091")
        socket.on('connect', () => {
            console.log("connected to server!")
            socket.emit("join_room", {roomCode: roomCode})
        })

        return () => {
            socket.disconnect();
        }

        // xsc.register_event('player_join', (data) => {
        //     // console.log("player_join:", data);
        //     // console.log(players);
        //     // data should be {playerId: playerId}
        //     setPlayers(data.players)
        //     // console.log(players)
        //     // console.log(typeof players); // Should log "object"
        //     // console.log(Array.isArray(players)); // should log "true"
        // })
        
        // xsc.register_event("create_room", {});
    }, []);

    return ( 
    <div>
        <div className="row">
            <h1>Room {roomCode}</h1>
        </div>
        <div className="row">
            <h2>Players</h2>
            {players.map((number, index) => {
                return <div className="col-3" key={index}><h1>{number}</h1></div>
            })}
        </div>
        <div>
            <h2>Set</h2>
            
        </div>

    </div> );
}

export default Room;