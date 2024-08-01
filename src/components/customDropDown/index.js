import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import { menuIcon } from '../../img';

const customMenuStyle = theme => ({
    root: {
        color: '#555BB3',
        fontSize: '16px',
        fontWeight: '600',
        paddingTop: '20px',
        paddingBottom: '20px',
        fontFamily: "Manrope",
        justifyContent: 'center',
        '&:hover': {
            color: "#FFFFFF",
            backgroundColor: "#5C58A5 !important",
        }
    },
    selected: {
        fontWeight: 600,
        color: "#FFFFFF",
        backgroundColor: "#5C58A5 !important",
    },
    menuPaper: {
        minWidth: '208px',
        borderRadius: '10px',
        backgroundColor: '#FAFAFA',
        boxShadow: '- 3px 3px 14px rgba(0, 0, 0, 0.15)',

    }

});

const Index = ({ data, tableOptions, tableMunuHandler, classes }) => {



    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        tableMunuHandler(option, data)

    };





    return (
        <div>
            <IconButton onClick={handleClick}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
            >
                <img src={menuIcon} alt='menuIcon' />

            </IconButton>
            <Menu
                id="long-menu"
                classes={{ paper: classes.menuPaper }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        left: '50%',
                        transform: 'translateX(-65%) translateY(0)',
                    }
                }}
                MenuListProps={{
                    style: {
                        padding: 0,
                    },
                }}
            >
                {tableOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}
                        classes={{ selected: classes.selected, root: classes.root }}
                    >
                        <span >{option}</span>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default withStyles(customMenuStyle)(Index);