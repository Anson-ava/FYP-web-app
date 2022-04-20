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
      <NavLink to="/" style={{ fontSize: 30 }}>
        3D Object Detection
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/camera" activeStyle>
          Real-Time Detection
        </NavLink>
        <NavLink to="/service" activeStyle>
          Photo Detection
        </NavLink>
        {/* <NavLink to="/photo" activeStyle>
          Photo
        </NavLink> */}
      </NavMenu>
      {/* <NavBtn>
        <NavBtnLink to="/SignUp">Sign Up</NavBtnLink>
        <NavBtnLink to="/SignIn">Sign In</NavBtnLink>
      </NavBtn> */}
    </Nav>
  );
};

export default TopBar;
