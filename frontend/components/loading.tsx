//import { LinearProgress } from "@material-ui/core";
var tips = ["Hangle is open source on GitHub, HangleHQ/next", "You can use markdown in your messages", "We have a Discord, hangle.me/discord"]
import Progress from "@material-ui/core/CircularProgress";
import Image from 'next/image';
import { useEffect } from "react";
export default function Loading() {
    useEffect(() => {
        setTimeout(() => {
        document.getElementById('didyouknowtitle').innerHTML = "This is taking longer than expected"
        document.getElementById('didyouknowbody').innerHTML = "Make sure you have an active internet connection and are running a stable version of Hangle."
    }, 10000)
    },[])
    return (
        <>
            <div className="loading_image">
                <div className="center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <Image id="hanglespin" src="/hangle.png" width="400" height="400"/>
                    <div className="card bgs" id="didyouknowtitle">
                    <h1 className="bgs" id="didyouknowbody">Did you know</h1>
                    <p className="bgs">
                       {tips[Math.floor(Math.random() * tips.length)]}

              </p>
              </div>
                </div>
            </div>
        </>
    );
}