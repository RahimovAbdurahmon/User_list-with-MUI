import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Close, Delete, Edit } from "@mui/icons-material";
import WorkIcon from '@mui/icons-material/Work';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, width:"400px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="flex items-center justify-between p-[20px]">
            <h1 className="text-[20px]">Info User</h1>
            <Close onClick={toggleDrawer(anchor, false)} />
        </div>
        <div className="flex flex-col items-center gap-[20px] p-[20px]">
            <img className="w-[200px] h-[200px] rounded-[50%]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzG38zvv2H-k6esow4sRWZHcFV2Gd4QSJTNHyg1Veij9owJYyjEZe3jmDahg&s" alt="" />
            <h1 className="text-[25px] font-[700]">Alex Port</h1>
        </div>
      </List>
      <Divider />
      <List>
        <div className="flex items-center justify-between p-[20px]">
            <ul className="flex flex-col gap-[15px] text-[20px] font-[600]">
                <li><WorkIcon/> Job</li>
                <li><ArrowUpwardIcon /> Status</li>
            </ul>
            <ul className="flex flex-col gap-[15px] text-[20px] font-[600]">
                <li>Doctor</li>
                <Button variant="contained" color="success">Active</Button>
            </ul>
        </div>
        <div className="p-[20px] flex items-center gap-[15px]">
            <Button variant="contained" startIcon={<Edit />}>Edit</Button>
            <Button variant="contained" color="error" startIcon={<Delete />}>Delete</Button>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
