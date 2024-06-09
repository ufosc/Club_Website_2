import React from "react"

const BadgeStyle = {
  borderRadius: 25,
  backgroundImage: "linear-gradient(90deg, #1EF198 0%, #73CBF8 45%, #69B0F5 100%)",
  fontFamily: "Diatype",
  fontSize: "1rem",
  padding: 8,
  margin: 0,
  marginRight: 5,
  fontWeight: 400,
  minWidth: 20,
  width: "fit-content",
}

const Badge = (props: { children?: any }) => (
  <div style={BadgeStyle}>{ props.children }</div>
)

export default Badge
