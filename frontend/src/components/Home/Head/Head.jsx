import { Button, MenuItem, Menu } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


export default function Head({ anchorElHead, setAnchorElHead, buttonHead, handleCloseHead }) {

    const handleClick = (event) => {
        setAnchorElHead(event.currentTarget);
    };
                    
    return (
        <div>
            <Button 
                size="small" 
                variant="outlined"
                color="primary"
                aria-controls="simple-menu" 
                aria-haspopup="true"
                onClick={handleClick}
                style={{margin: "8px 0 8px 0"}}
            >
                {buttonHead}
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorElHead}
                keepMounted
                open={Boolean(anchorElHead)}
                onClose={handleCloseHead}
            >
                <MenuItem onClick={handleCloseHead}>Special Donation</MenuItem>
                <MenuItem onClick={handleCloseHead}>Cell Donation</MenuItem>
                <MenuItem onClick={handleCloseHead}>Office Rent</MenuItem>
                <MenuItem onClick={handleCloseHead}>Blood Camp</MenuItem>
                <MenuItem onClick={handleCloseHead}>Entertainment</MenuItem>
                <MenuItem onClick={handleCloseHead}>Utility Bill</MenuItem>
                <MenuItem onClick={handleCloseHead}>Stationary</MenuItem>
                <MenuItem onClick={handleCloseHead}>Transport</MenuItem>
                <MenuItem onClick={handleCloseHead}>Toiletries</MenuItem>
                <MenuItem onClick={handleCloseHead}>Other</MenuItem>

            </Menu>
        </div>
    )
}