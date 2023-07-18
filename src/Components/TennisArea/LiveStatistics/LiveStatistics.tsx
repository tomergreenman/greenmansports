import { Dispatch, SetStateAction } from "react";
import LiveTennisModel from "../../../Models/LiveTennisModel";
import LiveTennisStatisticsModel from "../../../Models/LiveTennisStatisticsModel";
import "./LiveStatistics.css";
import noImage from "../../../Assets/Images/No_Image_Available.jpeg"
import ghostImage from "../../../Assets/Images/ghost-headshot.png"


interface LiveStatisticsProps {

    statistics: LiveTennisStatisticsModel;
    liveScore: LiveTennisModel;
    handlePopUP: (statistics: LiveTennisStatisticsModel, liveSore?: LiveTennisModel) => void
    // closePopUP: () => void

    // handlePopUP: (statistics: LiveTennisStatisticsModel, liveSore: LiveTennisModel, setStatistics: SetStateAction<LiveTennisStatisticsModel>, setLiveScores: SetStateAction<LiveTennisModel>) => void

}

function LiveStatistics(props: LiveStatisticsProps): JSX.Element {



    return (
        <div className="LiveStatistics">

            {
                !props.statistics.Text && <>


                    <table className="PupUpTable">
                        <thead>
                            <tr>
                                <th><img className="PlayersImage" src={props.statistics.homePlayerImage ? props.statistics.homePlayerImage : ghostImage} /></th>
                                <th>
                                    <div className="PlayersName">
                                        <div>
                                            <span>{props.liveScore["Home Player"]}</span>
                                            <img className="PlayersFlag" src={props.statistics.homePlayerFlag ? props.statistics.homePlayerFlag : noImage} />
                                        </div>
                                        <div>
                                            <img className="PlayersFlag" src={props.statistics.awayPlayerFlag ? props.statistics.awayPlayerFlag : noImage} />

                                            <span>{props.liveScore["Away Player"]}</span>
                                        </div>
                                    </div>
                                </th>
                                <th> <img className="PlayersImage" src={props.statistics.awayPlayerImage ? props.statistics.awayPlayerImage : ghostImage} /></th>
                            </tr>

                            {props.liveScore.homePlayer2 &&
                                <tr>
                                    <th><img className="PlayersImage" src={props.statistics.homePlayer2Image ? props.statistics.homePlayer2Image : ghostImage} /></th>
                                    <th>
                                        <div className="PlayersName">
                                            <div>
                                                <span>{props.liveScore.homePlayer2}</span>
                                                <img className="PlayersFlag" src={props.statistics.homePlayer2Flag ? props.statistics.homePlayer2Flag : noImage} />
                                            </div>
                                            <div>
                                                <img className="PlayersFlag" src={props.statistics.awayPlayer2Flag ? props.statistics.awayPlayer2Flag : noImage} />

                                                <span>{props.liveScore.awayPlayer2}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th> <img className="PlayersImage" src={props.statistics.awayPlayer2Image ? props.statistics.awayPlayer2Image : ghostImage} /></th>
                                </tr>
                            }
                        </thead>

                        <tbody>

                            <tr>
                                <td>{props.liveScore["Initial Home Odd"]}</td>
                                <td>Initial Odds</td>
                                <td>{props.liveScore["Initial Away Odd"]}</td>
                            </tr>

                            <tr>
                                <td>{props.liveScore["Live Home Odd"]}</td>
                                <td>Live Odds</td>
                                <td>{props.liveScore["Live Away Odd"]}</td>
                            </tr>

                            <tr>
                                <td>{props.statistics["Aces P1"]}</td>
                                <td>Aces</td>
                                <td>{props.statistics["Aces P2"]}</td>
                            </tr>

                            <tr>
                                <td>{props.statistics["First serve points P1"].slice(props.statistics["First serve points P1"].indexOf("(") + 1,
                                    props.statistics["First serve points P1"].indexOf(")"))}</td>
                                <td>Win % on First Serve</td>
                                <td>{props.statistics["First serve points P2"].slice(props.statistics["First serve points P2"].indexOf("(") + 1,
                                    props.statistics["First serve points P2"].indexOf("}"))}</td>

                            </tr>
                            <tr>
                                <td>{props.statistics["Second serve points P1"].slice(props.statistics["Second serve points P1"].indexOf("(") + 1,
                                    props.statistics["Second serve points P1"].indexOf(")"))}</td>
                                <td>Win % on Second Serve</td>
                                <td>{props.statistics["Second serve points P2"].slice(props.statistics["Second serve points P2"].indexOf("(") + 1,
                                    props.statistics["Second serve points P2"].indexOf(")"))}</td>
                            </tr>

                            <tr>
                                <td>{props.statistics["Break points saved P1"].slice(0, props.statistics["Break points saved P1"].indexOf("("))}</td>
                                <td>Break Points Won</td>
                                <td>{props.statistics["Break points saved P2"].slice(0, props.statistics["Break points saved P2"].indexOf("("))}</td>

                            </tr>

                            <tr>
                                <td>{props.statistics["Tiebreaks P1"]}</td>
                                <td>Tiebreaks Points Won</td>
                                <td>{props.statistics["Tiebreaks P2"]}</td>
                            </tr>

                            <tr>
                                <td>{props.statistics["First serve return points P1"]}</td>
                                <td>First Serve Return Points</td>
                                <td>{props.statistics["First serve return points P2"]}</td>
                            </tr>

                            <tr>
                                <td>{props.statistics["Total points won P1"]}</td>
                                <td>Total Points Won</td>
                                <td>{props.statistics["Total points won P2"]}</td>
                            </tr>




                        </tbody>
                    </table>





                    {/* <img src={props.statistics.homePlayerImage ? props.statistics.homePlayerImage : ghostImage} />
                    <img src={props.statistics.homePlayerFlag ? props.statistics.homePlayerFlag : noImage} />
                    <img src={props.statistics.awayPlayerImage ? props.statistics.awayPlayerImage : ghostImage} />
                    <img src={props.statistics.awayPlayerFlag ? props.statistics.awayPlayerFlag : noImage} />
                    
                    
                    
                    <p>{props.liveScore["Home Player"]}</p>
                    <p>{props.liveScore["Away Player"]}</p>
                    <p>{props.statistics["P2 name"]}</p>
                    <p>{props.statistics["P2 name"]}</p>
                    <p>{props.statistics["P2 name"]}</p>
                <p>{props.statistics["P2 name"]}</p> */}
                    <button className="ClosePopupButton" onClick={() => props.handlePopUP(null)}>X</button>
                </>
            }

            {
                props.statistics.Text &&
                <div className="NoStats">
                    <h2> Sorry, There Are No Statistics</h2>
                    <button className="ClosePopupButton" onClick={() => props.handlePopUP(null)}>X</button>
                </div>
            }



        </div>
    );
}

export default LiveStatistics;