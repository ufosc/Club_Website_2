import React from "react"
import { Link, navigate } from "gatsby"
import Image from "../Image/Image"

import GroupPhoto from "../../images/group_photo.jpg"

const AboutSection = () => (
  <section>
    <h2 className="section-heading">UF Open Source Club</h2>
    <div className="section-root about-container">
      <div>
        <h3 style={{ fontWeight: 300, paddingTop: 15 }}>
          The Open Source Club (OSC) at the University of Florida is a
          community of makers who want to solve problems and improve
          our world through open source projects. The club was founded
          in the Spring of 2016 as an official student organization at
          UF. In 2017, OSC were founding members of
          the <Link to="https://community.mozilla.org/en/">
                Mozilla Open Source Student Network.
              </Link> Join us at casual codings, where we work on open source
          projects, do homework, or just hang
          out.
        </h3>
        <div style={{ marginTop: 20 }}>
          <button onClick={ () => navigate("https://discord.gg/Gsxej6u") }
            style={{ marginLeft: 0 }}>
            JOIN DISCORD
          </button>
          <button className='secondary' onClick={ () => navigate("/about") }>
            LEARN MORE
          </button>
        </div>
      </div>
      <Image className="club-group-photo" src={GroupPhoto} alt="Club Group Photo" />
    </div>
  </section>
)

export default AboutSection
