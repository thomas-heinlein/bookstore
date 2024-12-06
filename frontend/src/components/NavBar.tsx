import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {FC} from "react";

const NavBar: FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button variant="text"><Link to="/">Home</Link></Button>
                <Button variant="text"><Link to="/books">Books</Link></Button>
                <Button variant="text"><Link to="/create-book">Create Book</Link></Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
