import React from "react";
import Loader from "react-loading";

export function LoaderWrapper(props) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader type="bars" color={"#5941f2"} height={100} width={100} />
            <p className="text-2xl text-black">loading...</p>
        </div>
    )
}


export const FallBack = props => {

    return (
        <div className={`fixed top-0 left-0 w-full flex flex-col items-center justify-center h-screen`} style={{ backgroundColor: "rgb(0 0 0 / 40%)" }}>
            <Loader type="bubbles" color={"rgb(54 211 153)"} height={100} width={100} />
        </div>
    )
}