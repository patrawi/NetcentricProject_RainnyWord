import React , {useState,  useContext} from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import { User } from '../interfaces/User'
import { SocketContext } from '../context/SocketContext';

interface EndProp {
    
}


const Endpage : React.FC<EndProp> = () => {
    const location = useLocation<{
        id : string
        score : number
    }>();
    const {socket} = useContext(SocketContext)
    const {id, score} = location.state
    const [players, setPlayers] = useState<User[]>([]);
    const first_name = "punlee";
    const first_score = 900;

    const second_name = "pp";
    const second_score = 500;

    const third_name = "mk";
    const third_score = 300;

    const your_score = 555;

    const handlePlayer = async () => {

    }
    useEffect(() => {
        console.log(id, score);
        handlePlayer();
    },[])
    return (
        <React.Fragment>
            <Container maxWidth="sm"> 
                <Box sx={{ mt: 12}}>
                    <Typography variant="h4" component="h1" style={{ backgroundColor:"#FFB800", padding:"1em" }} align="center" gutterBottom>
                        Winner!<br/> {first_name} {first_score}
                    </Typography>
                </Box>

                
            </Container>

            <Container maxWidth="sm">
                <Box sx={{ mt: 8, display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Typography display="inline" variant="h4" component="h1" style={{ backgroundColor:'#ECECEC', padding:'1em' }} gutterBottom>
                        2nd Place: <br/> {second_name} {second_score}
                    </Typography>
                    <Typography display="inline" variant="h4" component="h1" style={{ backgroundColor:'#ECECEC', padding:'1em' }} gutterBottom>
                        3rd Place: <br/> {third_name} {third_score}
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth="sm">
                <Box sx={{ mt: 12, display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Typography display="inline" variant="h4" component="h1" style={{ padding:'1em' }} gutterBottom>
                        You Scored: {your_score}
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>

    )
    
}


export default Endpage;
