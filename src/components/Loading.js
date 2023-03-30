import React from "react"
import GridLoader from "react-spinners/GridLoader"

const LoadingScreen = (props) => {
  return (
    <div
      className="loading-screen"
      style={{
        display: props.isLoading?"flex":"none",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        position: "fixed",
        background: "rgba(0,0,0, 0.5)",
      }}
    >
      <GridLoader
        color="rgba(196,224,7,.6)"
        speedMultiplier={1.5}
        width={1}
        loading={props.isLoading}
      />
    </div>
  )
}

export default LoadingScreen
