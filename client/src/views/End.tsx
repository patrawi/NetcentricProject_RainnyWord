import * as React from 'react';
import { Container, Typography, Box } from '@material-ui/core';


interface EndProp {
    
}


const Endpage : React.FC<EndProp> = () => {
    let first_name = "punlee";
    let first_score = 900;

    let second_name = "pp";
    let second_score = 500;

    let third_name = "mk";
    let third_score = 300;

    let your_score = 555;

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
