import React from "react"
import Marquee from "../Marquee/Marquee"
import Image from "../Image/Image"

import GroupPhoto from "../../images/group_photo.jpg"
import SoccerImage from "../../images/blog/2024-04-11-intramural-soccer.jpeg"
import CareerImage from "../../images/blog/2024-04-11-navigating-career-fair.jpeg"
import GBMImage from "../../images/GBM.jpeg"
import ReitzGameImage from "../../images/reitz_game_day.jpeg"
import RebeccaImage from "../../images/rebecca_lol.jpeg" // for female representation.

const CommunitySection = () => (
  <section style={{ maxWidth: "99vw", width: "99vw", overflow: "hidden" }}
    id='become-a-member'>
    <div id="infinite-scroll-heading">
      <h2 className="section-heading">Join a thriving community</h2>
    </div>
    <Marquee style={{ padding: "20px 0" }}>
      <div className="infinite-scroll">
        <Image src={CareerImage} alt="Navigating UF Career Fair"
          style={{ gridRowStart: 1, gridRowEnd: 3 }}>
          <div className="infinite-scroll__image__meta">
            <h2> Career Fair </h2>
            <h3> Fall 2023 - OSC at the O'Connell Center Career Fair. </h3>
          </div>
        </Image>
        <div className="card">
          <h2 style={{ color: "rgb(231 241 126)" }}>Est. 2016</h2>
          <h3>
            OSC was founded in the Spring semester of 2016 and joined the
            Mozilla Open Source Student Network shortly after.
          </h3>
        </div>
        <Image src={GBMImage} alt="Last CC of the spring semester"
          style={{ gridRow: "1 / 3", gridColumn: "3 / 5" }}>
          <div className="infinite-scroll__image__meta">
            <h2> Last Spring Meeting </h2>
            <h3> Spring 2024 - Members meet at Casual coding for the last day of the semester </h3>
          </div>
        </Image>
        <div className="card"
          style={{ gridRow: "2/3", gridColumn: "5" }}>
          <h2 style={{ color: "rgb(20 241 149)" }}>300+</h2>
          <h3>Active members</h3>
        </div>
        <Image src={GroupPhoto} alt="Winners of the OSC Gainesville Hackathon">
          <div className="infinite-scroll__image__meta"
            style={{ gridRow: "2/ 3", gridColumn: "2" }}>
            <h2> OSC Mini-Hackathon </h2>
            <h3> Spring 2024 - Winners of the first OSC Mini-Hackathon </h3>
          </div>
        </Image>
        <Image src={ReitzGameImage} alt="Reitz Game Day"
          style={{ gridRow: "1/3", gridColumn: "6/8" }}>
          <div className="infinite-scroll__image__meta">
            <h2> Game Day at the Reitz </h2>
            <h3> Spring 2024 - OSC meets at the Reitz Game Room </h3>
          </div>
        </Image>
        <div className="card">
          <h2 style={{ color: "rgb(235 84 187)" }}>250k+</h2>
          <h3>Lines of code contributed to Open Source Software</h3>
        </div>
        <Image src={RebeccaImage} alt="New OSC Board"
          style={{ gridRow: "2/3", gridColumn: "2"}}>
          <div className="infinite-scroll__image__meta">
            <h2> New OSC Board </h2>
            <h3> Spring 2024 - OSC presents the new executive board </h3>
          </div>
        </Image>
        <Image src={SoccerImage} alt="OSC Gainesville Intramural Soccer">
          <div className="infinite-scroll__image__meta">
            <h2> Intramural Soccer Team </h2>
            <h3>
              Fall 2023 - Post-game photo of the OSC Intramural soccer team.
            </h3>
          </div>
        </Image>
      </div>
    </Marquee>
    <div id="become-a-member-card">
      <h3>
        Becoming a member of the Open Source Club is as simple
        as showing up. Everyone is invited to attend our
        twice-weekly casual coding meetings, where members meet
        to work on open source projects, do homework, or just hang
        out. You may also contribute remotely by joining us on Discord.
        <br /><br />
        If interested, join our Discord channel and keep an eye out for
        any upcoming meetings on our announcements page.
      </h3>
      <div style={{ marginTop: 50 }}>
        <button onClick={ () => navigate("https://discord.gg/Gsxej6u") }
          style={{ marginLeft: 0 }}>
          JOIN DISCORD
        </button>
        <button className='secondary' onClick={ () => navigate("/about") }>
          LEARN MORE
        </button>
      </div>
    </div>
  </section>
)

export default CommunitySection
