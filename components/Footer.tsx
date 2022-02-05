import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <footer>
            <Box position="static" bgcolor="primary.dark" color="white" sx={{
                minHeight: 100
            }}>
                <Typography>© 2022 Andrin Meier. All rights reserved.</Typography>
            </Box>
        </footer >
    )
}

export default Footer;