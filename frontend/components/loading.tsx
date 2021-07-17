//import { LinearProgress } from "@material-ui/core";
var tips = ["Hangle is open source on GitHub, HangleHQ/next", "You can use markdown in your messages", "We have a Discord, hangle.me/discord"]
import Progress from "@material-ui/core/CircularProgress";
// ignore that center error, it works anyway
export default function Loading() {
    return (
        <>
            <div className="loading_image">
                <div className="center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <center> 
                    <Progress />
                    <div className="card p-3 rounded-md m-4 text-blue bgs">
                    <h1 className="bgs">Did you know</h1>
                    <p className="bgs">
                       {tips[Math.floor(Math.random() * tips.length)]}

              </p>
              </div>
              </center>
                </div>
            </div>
        </>
    );
}