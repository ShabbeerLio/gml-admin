import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlined as HomeOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  CalendarTodayOutlined as CalendarTodayOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon
} from '@mui/icons-material';
import logo from "../../Assets/logo2.jpg";
import "./SidebarNav.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "black" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  let location = useLocation();
  let history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  // API
  const host = "http://localhost:8000";
  const [userData, setUserData] = useState([null])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      });
      const json = await response.json();
      setUserData(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "white !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          // padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        borderRight: "1px solid #ddd",
      }}
    >
      <ProSidebar collapsed={isCollapsed} width="300px">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography className="sidenav-logo">
                  <img src={logo} alt="Logo" />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography>
                  Add additional content if needed
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Banner"
              to="/"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Welcome to"
              to="/welcome-to"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Our Services"
              to="/our-services"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clients"
              to="/clients"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarNav;