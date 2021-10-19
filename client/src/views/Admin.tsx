import React from 'react';
import { Grid, Paper } from '@material-ui/core'



interface AdminProp {
    
}

const Adminpage : React.FC<AdminProp> = () => {

    const paperStyle={padding :20}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                Sign In
            </Paper>
        </Grid>
    )

}


export default Adminpage;
