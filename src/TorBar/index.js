import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./TopBarElements";

const TopBar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>3D Object Detection</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/Camera" activeStyle>
            Camera
          </NavLink>
          <NavLink to="/Service" activeStyle>
            Service
          </NavLink>
          <NavLink to="/Contact" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/SignUp" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/SignIn">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default TopBar;
