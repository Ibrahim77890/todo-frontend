import React from 'react'

const Overlay = ({children}) => {
  return (
    <div style={{position: "absolute", height: "fit-content", width: "200px", zIndex: "10", backgroundColor: "white", transform: "translateY(-50px)", padding: "8px"}}>
      {children}
    </div>
  )
}

export default Overlay
