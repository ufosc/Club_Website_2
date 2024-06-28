import React from "react"

const BadgeStyle = {
  borderRadius: 25,
  backgroundImage: "var(--theme-gradient)",
  fontFamily: "var(--fontFamily-Diatype)",
  fontSize: "var(--fontSize-1)",
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
