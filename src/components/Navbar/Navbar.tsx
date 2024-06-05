import "./Navbar.css"
import "../../global.css"

import React, { useEffect, useLayoutEffect, useState } from "react"
import HBMenu from "../../images/hb-menu.png"
import { Link } from 'gatsby'

const Ribbon = (props: { href: string, children: any }) => {
  return (
    <li id="navbar-member-item">
      <Link to={props.href}>{props.children}</Link>
    </li>
  )
}

const NavBarLink = (props: { href: string, children: any }) => {
  return (
    <li className="navbar-item">
      <Link to={props.href}>{props.children}</Link>
    </li>
  )
}

const NavBar = (props: { children: any }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [forceShowMenu, setForceShowMenu] = useState<boolean>(false)
  useEffect(() => {
    if (window.innerWidth >= 601) {
      setShowMenu(true)
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 601) {
        setShowMenu(true)
        setForceShowMenu(false)
        return
      }
      setShowMenu(false)
    })
  })

  return (
    <div id="navigation-bar-parent">
      <ul id="navigation-bar">
        <li className="navbar-item" id="navbar-title">
          <Link to="/">UF OSC</Link>
        </li>
        {
          (showMenu || forceShowMenu) ? (
            <div className="menu">
              <hr />
              { props.children }
              <hr />
            </div>
          ) : null
        }
        {
          (!showMenu) ? (
            <button className="menu-btn" onClick={() => setForceShowMenu(!forceShowMenu)}>
              <img src={HBMenu} alt="menu" />
            </button>
          ): null
        }
      </ul>
    </div>
  )
}

export default function () {
  return (
    <NavBar>
      <NavBarLink href="/about">ABOUT</NavBarLink>
      <NavBarLink href="https://docs.ufosc.org">RESOURCES</NavBarLink>
      <NavBarLink href="/projects">PROJECTS</NavBarLink>
      <NavBarLink href="/blog">NEWS</NavBarLink>
      <NavBarLink href="/#get-in-touch">CONTACT</NavBarLink>
      <Ribbon href="/#become-a-member">BECOME<br /> A MEMBER</Ribbon>
    </NavBar>
  )
}
