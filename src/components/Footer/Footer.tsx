import "./Footer.css"
import "../../global.css"

import React from "react"
import { version } from "../../../package.json"

import Discord from "../../images/Discord.png"
import Facebook from "../../images/Facebook.png"
import Github from "../../images/Github.png"
import Instagram from "../../images/Instagram.png"

export default function () {
  return (
    <footer>
      <div>
        <div className="footer-content-container">
          <div className='footer-upper'>
            <div>
              <h1 style={{paddingLeft: "20px", fontSize: "18px", float: "left"}}>
                UF OSC
              </h1>
              <p className="version-txt">
                { version }
              </p>
            </div>
            <div className="social-buttons">
              <a href="https://discord.gg/Gsxej6u" target="_blank">
                <img src={Discord} alt="discord" width="35" />
              </a>
              <a href="https://github.com/ufosc" target="_blank">
                <img src={Github} alt="github" width="35" />
              </a>
              <a href="https://instagram.com/uf_osc?igshid=YmMyMTA2M2Y=" target="_blank">
                <img src={Instagram} alt="instagram" width="35" loading="lazy" />
              </a>
              <a href="https://www.facebook.com/groups/ufosc/" target="_blank">
                <img src={Facebook} alt="facebook" width="35" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-content-container" style={{background: "white"}}>
          <div className="footer-lower">
            <h4 style={{float: "left"}}>Copyright (C) 2023 Open Source Club</h4>
            <div style={{float: "right"}}>
              <a href="https://github.com/ufosc/Club_Website_2/blob/main/LICENSE.md"
                target="_blank"
                style={{
                  float: "left",
                  marginLeft: "30px",
                  fontWeight: "bold",
                  textDecoration: "underline"
                }}>
                License AGPL -3.0-or-later
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
