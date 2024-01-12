// import { Button, TextField } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import FileBase64 from "react-file-base64";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const initialValues = {
//     name : "",
//     email : "",
//     password : "",
// };

// const validationSchema = Yup.object({
//     name : Yup.string().required("Name is Requared"),
//     email : Yup.string().required("Email is Requared"),
//     password : Yup.string().required("Password is Requared"),
// })

// let handelSubmit = (values, { resetForm, setSubmitting}) => {
//     console.log(values);

//     resetForm();
//     setSubmitting(false);
// }

// const App = () => {
//   return (
//     <>
//     <div>
//         <h1 className="text-center text-[30px] font-[600] font-serif">Formik Example</h1>

//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handelSubmit}>
//             <Form className="flex flex-col items-start gap-[20px] bg-gray-50 p-[30px] rounded-[30px] w-[450px] m-auto mt-[30px]">
//                 <div className="flex items-center gap-[10px]">
//                     <label htmlFor="name">Name : </label>
//                     <Field type="text" id="name" name="name" classNamew = "w-[400px] p-[10px] border-[1px] border-black" />
//                     <ErrorMessage name="name" component={"div"} />
//                 </div>
//                 <div className="flex items-center gap-[10px]">
//                     <label htmlFor="email">Email : </label>
//                     <Field type="text" id="email" name="email" classNamew = "w-[400px] p-[10px] border-[1px] border-black" />
//                     <ErrorMessage name="email" component={"div"} />
//                 </div>
//                 <div className="flex items-center gap-[10px]">
//                     <label htmlFor="password">Password : </label>
//                     <Field type="password" id="password" name="password" classNamew = "w-[400px] p-[10px] border-[1px] border-black" />
//                     <ErrorMessage name="password" component={"div"} />
//                 </div>
//                 <Button variant="contained" type="submit">Submit</Button>
//             </Form>
//        </Formik>
//     </div>
//     </>
//   )
// }

// export default App

import React from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AccountBalanceOutlined, AccountCircle, Close, Delete, Edit } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TemporaryDrawer from "./components/TemporaryDrawer";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import WorkIcon from '@mui/icons-material/Work';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

/// avatar
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

/// dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/// add - post
const initialValues = {
  img : "",
  name: "",
  job: "",
  isComplete: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is Requared"),
  job: Yup.string().required("Job is required"),
});


/// edit - put
const initialValuesEdit = {
  img : "",
  name: "",
  job: "",
};
const validationSchemaEdit = Yup.object({
  name: Yup.string().required("Name is Requared"),
  job: Yup.string().required("Job is required"),
});

const App = () => {
  /// api
  let API = "http://localhost:3000/data";
  let [todos, setTodos] = useState([]);
  let [user, setUser] = useState(null);

  /// info
  const [state, setState] = React.useState({
    right : false
  });
  
  /// search
  let [inpSearch, setInpSearch] = useState("");
  
  /// get
  async function get() {
    try {
      let { data } = await axios.get(API);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    get();
  }, []);
  
  /// tabs
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  /// dialog add
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  let [selAddStatus, setSelAddStatus] = useState("")
  const [status, setStatus] = React.useState('');
  const handleChangeStatusAdd = (event) => {
    setStatus(event.target.value);
  };

  
  /// dialog edit
  const [openEdit, setOpenEdit] = React.useState(false);
  let [selEditStatus, setSelEditStatus] = useState("")
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  
  /// menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, elem) => {
    setAnchorEl(event.currentTarget);
    setUser(elem);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  /// search
  async function searchUser(searchValue) {
    try {
      let { data } = await axios.get(`${API}?q=${searchValue}`);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  /// select - filter
  async function selectUserActive() {
    try {
      let { data } = await axios.get(`${API}?isComplete=${true}`)
      setTodos(data)
    } catch (error) {
      console.log(error);
    }
  }
  async function selectUserinactive() {
    try {
      let { data } = await axios.get(`${API}?isComplete=${false}`)
      setTodos(data)
    } catch (error) {
      console.log(error);
    }
  }
  
  /// delete
  async function deleteUser(id) {
    try {
      let { data } = await axios.delete(`${API}/${id}`);
      get();
    } catch (error) {
      console.log(error);
    }
  }
  
  /// add
  // let handelSubmit = (values, { resetForm, setSubmitting}) => {
    //   console.log(values);
    //   console.log("Hello"); 
    //   resetForm();
    //   setSubmitting(false);
    // }
  async function addUser(values, { resetForm, setSubmitting}) {
    let newUser = {
      img : values.img,
      name : values.name,
      job : values.job,
      isComplete : selAddStatus == "active" ? true : false
    }
    try {
      let { data } = await axios.post(API, newUser)
      resetForm();
      setSubmitting(false);
      handleCloseAdd()
      get()
    } catch (error) {
      console.log(error);
    }
  }

    /// edit
  function editShow(user) {
    handleClickOpenEdit()
    initialValuesEdit.name = user.name
    initialValuesEdit.img = user.img
    initialValuesEdit.job = user.job
    setSelEditStatus(user.isComplete ? "active" : "inactive")
  }
  async function editUser(values, { resetForm, setSubmitting}) {
    let newEditUser = {
      id : user.id,
      img : values.img,
      name : values.name,
      job : values.job,
      isComplete : selEditStatus == "active" ? true : false
    }
    try {
      let { data } = await axios.put(`${API}/${user.id}`, newEditUser)
      get()
      handleCloseEdit()
    } catch (error) {
      console.log(error);
    }
  }

  /// info
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


    
    return (
      <>
      <div className="p-[20px] flex items-center justify-between xl:px-[100px]">
        <h1 className="text-[20px] font-[600]">Member list</h1>
        <Button variant="contained" startIcon={<AccountCircle />} onClick={handleClickOpen}>Add Member</Button>
      </div>
      <div className="flex p-[20px] px-[100px]">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" onClick={get} label="All" />
            <Tab value="two" onClick={selectUserActive} label="Active" />
            <Tab value="three" onClick={selectUserinactive} label="Inactive" />
          </Tabs>
        </Box>
        <TextField
          label="Search"
          value={inpSearch}
          onChange={(event) => setInpSearch(event.target.value)}
          onInput={() => searchUser(inpSearch)}
          className="w-[400px]"
        />
      </div>
      <div className="xl:px-[100px] mb-[100px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Job</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((elem) => (
                <TableRow
                  key={elem.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                  >
                    {elem.isComplete ? (
                      <Stack direction="row" spacing={2}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar alt="Remy Sharp" src={elem.img} />
                        </StyledBadge>
                      </Stack>
                    ) : (
                      <Avatar alt="Remy Sharp" src={elem.img} />
                    )}
                    {elem.name}
                  </TableCell>
                  <TableCell align="left">{elem.job}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color={elem.isComplete ? "success" : "inherit"}
                    >
                      {elem.isComplete ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    {
                      <React.Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Tooltip title="Account settings">
                            <IconButton
                              onClick={(event) => handleClick(event, elem)}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? "account-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                            >
                              <Avatar sx={{ width: 32, height: 32 }}>
                                <MoreVertIcon />
                              </Avatar>
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem onClick={toggleDrawer("right", true)}>
                            <Avatar /> Profile Account
                          </MenuItem>
                          <MenuItem onClick={() => editShow(user)}>
                            <Edit className="text-[gray] mr-[10px]" /> Edit
                            Account
                          </MenuItem>
                          <MenuItem onClick={() => deleteUser(user.id)}>
                            <Delete className="text-[red] mr-[10px]" /> Delete
                            Account
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* add dialog */}
      { <React.Fragment>
      <Dialog
        open={openAdd}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAdd}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="flex items-center justify-between p-[20px]">
            <h2 className="text-[20px] font-[600]">Add User</h2>
            <Button onClick={handleCloseAdd}> <Close /> </Button>
        </div>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addUser}>
            <Form className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="img">Img</label>
                    <Field type="text" name="img" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" id="img" />
                    <ErrorMessage name="img" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" id="name" />
                    <ErrorMessage name="name" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="job">Job</label>
                    <Field type="text" name="job" id="job" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" />
                    <ErrorMessage name="job" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="selStatus">chooseSelete</label>
                  <select value={selAddStatus} onChange={(event) => setSelAddStatus(event.target.value)} className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ErrorMessage name="isComplete" component={"div"} />
                </div>
                <DialogActions>
                  <Button onClick={handleCloseAdd} >Disagree</Button>
                  <Button type="submit">Agree</Button>
                </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>}
      {/* edit dialog */}
      { <React.Fragment>
      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEdit}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="flex items-center justify-between p-[20px]">
            <h2 className="text-[20px] font-[600]">Edit User</h2>
            <Button onClick={handleCloseEdit}> <Close /> </Button>
        </div>
        <DialogContent>
          <Formik initialValues={initialValuesEdit} validationSchema={validationSchemaEdit} onSubmit={editUser}>
            <Form className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="img">Img</label>
                    <Field type="text" name="img" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" id="img" />
                    <ErrorMessage name="img" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" id="name" />
                    <ErrorMessage name="name" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="job">Job</label>
                    <Field type="text" name="job" id="job" className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]" />
                    <ErrorMessage name="job" component={"div"} />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="selStatus">chooseSelete</label>
                  <select name="select" value={selEditStatus} onChange={(event) => setSelEditStatus(event.target.value)} className="border-[1px] border-black p-[10px] rounded-[5px] w-[350px]">
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                    <ErrorMessage name="status" component={"div"} />
                  </select>
                </div>
                <DialogActions>
                  <Button onClick={handleCloseEdit} >Disagree</Button>
                  <Button type="submit">Agree</Button>
                </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>}
    {/* info dialog */}
    {<React.Fragment>
      <Drawer
        anchor={"right"}
        open={state["right"]}
      >
        <Box
      sx={{ width: 250, width:"400px" }}
      role="presentation"
    >
      <List>
        <div className="flex items-center justify-between p-[20px]">
            <h1 className="text-[20px]">Info User</h1>
        </div>
        <div className="flex flex-col items-center gap-[20px] p-[20px]">
            <img className="w-[200px] h-[200px] rounded-[50%]" src={state.right ? user.img : null} alt="" />
            <h1 className="text-[25px] font-[700]">{state.right ? user.name : null}</h1>
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
                <li>{state.right ? user.job : null}</li>
                <Button variant="contained" color={state.right ? user.isComplete ? "success" : "inherit" : null}>{state.right ? user.isComplete ? "Active" : "Inactive" : null}</Button>
            </ul>
        </div>
        <div className="p-[20px] flex items-center gap-[15px]">
            <Button variant="contained" onClick={() => editShow(user)} startIcon={<Edit />}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => deleteUser(user.id)} startIcon={<Delete />}>Delete</Button>
        </div>
      </List>
    </Box>
      </Drawer>
    </React.Fragment>}
    </>
  );
};

export default App;
