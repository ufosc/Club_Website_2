import "./Navbar.css"
import "../../global.css"
import React, { useEffect, useLayoutEffect, useState } from "react"
import HBMenu from "../../images/hb-menu.png"

const Ribbon = (props: { href: string, children: any }) => {
  return (
    <li id="navbar-member-item">
      <a href={props.href}>{props.children}</a>
    </li>
  )
}

const NavBarLink = (props: { href: string, children: any }) => {
  return (
    <li className="navbar-item">
      <a href={props.href}>{props.children}</a>
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
          <a href="/">UF OSC</a>
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
      <NavBarLink href="/#contact">CONTACT</NavBarLink>
      <Ribbon href="/#join">BECOME<br /> A MEMBER</Ribbon>
    </NavBar>
  )
}
