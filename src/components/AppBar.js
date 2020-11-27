import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Brightness4, Brightness7 } from '@material-ui/icons';

function AppBar({ darkMode, setDarkMode }) {
    return (
        <MuiAppBar
            position="static"
            variant="elevation"
            color="default"
        >
            <Toolbar variant="regular">
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    CountryApp
          </Typography>
                <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {
                        darkMode
                            ? <Brightness7 />
                            : <Brightness4 />
                    }
                </IconButton>
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar;
