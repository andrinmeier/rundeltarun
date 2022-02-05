import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
    return (
        <header>
            <AppBar position="static">
                <Toolbar disableGutters={true} variant="dense">
                    <Typography>Run Delta, Run!</Typography>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default NavBar;