import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
  MenuOutlined as MenuOutlinedIcon
} from '@mui/icons-material';
import { MdDesignServices } from "react-icons/md";
import { LuLanguages } from "react-icons/lu";
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

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Our Services"
              to="/"
              icon={<MdDesignServices />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Languages"
              to="/languages"
              icon={<LuLanguages/>}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarNav;
