import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background-color: black;
  z-index: 11;
  opacity: 0.9;
  position: sticky;
  top: 0px;
  height: 70px;
  display: flex;
  justify-content: flex-start;
`;

export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;

  &.active {
    color: #fcae1e;
    border-bottom: 5px solid #fcae1e;
  }
`;

// when the windows too small and did not show all the item
export const Bars = styled(FaBars)`
  display: none;
  color: white;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
