import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimerPage from '../components/countdown';
import { socket } from '../services/Socket';
import {Redirect, useLocation} from 'react-router-dom'

interface LobbyProp {
    
}

export type wordRand = {
    word : string;
    key : number;
}

export type Player = {
    name : string;
    score : number;
    id : string
}
let Arrplayers : Player[] = []
const Lobbypage : React.FC<LobbyProp> = () => {
    const [check, setCheck] = useState(false);
    const [randWords, setRandWords] = useState<wordRand[]>([])
    const [players, setPlayers] = useState<Player[]>(Arrplayers)
    const [redirectNow, setRedirectNow] = useState(false);
    const location = useLocation<{name : string}>();
    const [individual, setIndividual] = useState<Player>();
    const [time, setTime] = useState(false)
    const {name} = location.state
    const handlePlayer = async () => {
        const newPlayers = await socket.on("updatePlayerList", (players) => {
           
            setPlayers(players);
            setIndividual(() => {
                return players.find((player : Player) => player.name === name )
            })
        })

    }
    const handleTimeout = () => {
        setTime(true)
    }
    const countdownTimer = () => {
        socket.on("round", (ROUND) => {
            if(ROUND === 1) { 
                socket.on("wordsFirstRound", (words) => {
                    setRandWords(words);
                })
            }
        })
        setTimeout(() => {
            setRedirectNow(true)
        }, 10000)

        return (
            <TimerPage initialMinute = {0} initialSeconds = {10}  handleTimeout = {handleTimeout}/>
        )
    }
    useEffect(() => {
        handlePlayer()  
        socket.on("startWaitingRoomTimer", function (isGameStart) {
            setCheck(true);
          });
    },[players])
    return (
        <> {
             redirectNow ?  <Redirect to = {{
                 pathname : '/Game',
                 state : {
                     randWords,
                     individual
                 }
             }}/>
                 :
            <Container>
            {check ? countdownTimer() : null }
            {players.map((player) => {
                return (
                    <div key = {player.id}>
                    {player.name}
                </div>
                )
            })}
        </Container>
        }
           
        </>
    )
    
}


export default Lobbypage;
