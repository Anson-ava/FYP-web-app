import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./TopBarElements.js";

const TopBar = () => {
  return (
    <Nav>
      <NavLink to="/">3D Object Detection</NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/Camera" activeStyle>
          Camera
        </NavLink>
        <NavLink to="/Service" activeStyle>
          Service
        </NavLink>
        <NavLink to="/photo" activeStyle>
          Photo
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/SignUp">Sign Up</NavBtnLink>
        <NavBtnLink to="/SignIn">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default TopBar;
