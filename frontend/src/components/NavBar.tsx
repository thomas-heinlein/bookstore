import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {FC, ReactElement} from "react";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useAuth} from "react-oidc-context";

interface Page {
    displayText: string,
    path: string,
    icon: ReactElement
}

const pages: Page[] = [
    {displayText: "Home", path: "/", icon: <HomeIcon/>},
    {displayText: "List Books", path: "/books", icon: <FormatListBulletedIcon/>},
    {displayText: "Add Book", path: "/books/create", icon: <AddIcon/>}
];

const NavBar: FC = () => {

    const auth = useAuth();

    const getUsername = () => {
        const fullUsername = auth.user?.profile.preferred_username ?? 'User'
        return Array.from(fullUsername)[0].toUpperCase();
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <nav>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ImportContactsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Bookstore
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={!!anchorElNav}
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {pages.map((page) => (
                                    <Link key={page.path} to={page.path} style={{textDecoration: 'none'}}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography sx={{textAlign: 'center', display: 'inline-flex'}}>
                                                {page.icon}
                                                <span style={{marginLeft: 8}}>{page.displayText}</span>
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Link key={page.path} to={page.path} style={{textDecoration: 'none'}}>
                                    <Button
                                        key={page.path}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            mx: 1,
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}
                                        startIcon={page.icon}
                                    >
                                        {page.displayText}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar>{getUsername()}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={!!anchorElUser}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => auth.signoutRedirect()}>
                                    <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
};

export default NavBar;
