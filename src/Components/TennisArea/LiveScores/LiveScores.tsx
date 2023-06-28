import { useEffect, useState } from "react";
import "./LiveScores.css";
import tennisService from "../../../Services/TennisService";
import LiveTennisModel from "../../../Models/LiveTennisModel";
import { log } from "console";
import axios from "axios";
import noImage from "../../../Assets/Images/No_Image_Available.jpeg"
import ghostImage from "../../../Assets/Images/ghost-headshot.png"
import { on } from "stream";

function LiveScores(): JSX.Element {

    const [liveScores, setLiveScores] = useState<LiveTennisModel[]>([]);
    const [oneLiveScore, setOneLiveScores] = useState<LiveTennisModel>();
    const [homeFlag, setHomeFlag] = useState<string>();
    const [awayFlag, setAwayFlag] = useState<string>();
    const [homePlayerImage, setHomePlayerImage] = useState<string>();
    const [awayPlayerImage, setAwayPlayerImage] = useState<string>();


    useEffect(() => {

        const getLiveScores = async () => {
            try {

                const liveScores = await tennisService.getLiveScores();
                setLiveScores(liveScores)
                // const oneLiveScore = liveScores[1]
                // setOneLiveScores(oneLiveScore)
                // const liveStats = await tennisService.getLiveSTats(liveScores[0].ID);

                console.log(liveScores);
                // console.log(oneLiveScore);
                // console.log(liveStats);
                const rankings = await tennisService.getPlayersRanking();

                // let awayPlayerId: string;
                // for (const rank of rankings) {
                //     const initial = oneLiveScore["Away Player"][0];
                //     const lastName = oneLiveScore["Away Player"].slice(oneLiveScore["Away Player"].indexOf(" ") + 1)
                //     // console.log(initial);
                //     // console.log(lastName);
                //     if (rank.Name[0] === initial && rank.Name.slice(rank.Name.lastIndexOf(" ") + 1) === lastName) {
                //         console.log(rank.Name);
                //         awayPlayerId = rank.id;

                //     }





                // }
                // console.log(awayPlayerId);

                // const awayPlayerName = oneLiveScore["Away Player"]
                // const awayPlayerId = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, awayPlayerName);

                // if id was found than get players image and flag
                // if (awayPlayerId) {
                //     const awayPlayer = await tennisService.getPlayerInfo(awayPlayerId);
                //     console.log(awayPlayer);
                //     setAwayPlayerImage(awayPlayer.Image);
                //     const awayPlayersFlag = await tennisService.getPlayersFlag(awayPlayer);
                //     setAwayFlag(awayPlayersFlag);
                // }

                // if id was NOT found because players ranking is to low
                // and does not appear in the api i am using than set images to no image available 
                // else {
                //     setAwayPlayerImage(noImage)
                //     setAwayFlag(noImage)
                // }

                // const homePlayerName = oneLiveScore["Home Player"]
                // const homePlayerId = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, homePlayerName);
                // if (homePlayerId) {
                //     const homePlayer = await tennisService.getPlayerInfo(homePlayerId);
                //     setHomePlayerImage(homePlayer.Image);
                //     console.log(homePlayer);
                //     const homePlayersFlag = await tennisService.getPlayersFlag(homePlayer);
                //     setHomeFlag(homePlayersFlag);
                // }
                // else {
                //     setHomePlayerImage(noImage)
                //     setHomeFlag(noImage)

                // }
            }

            catch (err: any) {
                console.log(err.message);

            }








        }

        getLiveScores();
    }, [])

    return (
        <div className="LiveScores">

            {liveScores && <>
                {liveScores.map(oneLiveScore =>
                    <table className="TennisLiveScoreTable" key={oneLiveScore.ID}>
                        <thead>
                            <tr>
                                <th colSpan={6}>{oneLiveScore.Tournament} - {oneLiveScore.Surface}</th>
                                {/* <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={oneLiveScore.homePlayerImage ? oneLiveScore.homePlayerImage : ghostImage} /></td>
                                <td className={oneLiveScore.homePlayer2 ? "Doubles" : "Singles"}>
                                    <div className="x y"><img src={oneLiveScore.homePlayerFlag ? oneLiveScore.homePlayerFlag : noImage} /></div>
                                    <div className="x"><p>{oneLiveScore["Home Player"]}</p></div>
                                    {/* {oneLiveScore.homePlayer2 && <div>YESS</div>} */}
                                </td>
                                <td>{oneLiveScore["Player 1 Score"]}</td>
                                <td>{oneLiveScore["Set1 Player 1"]}</td>
                                {oneLiveScore["Set2 Player 1"] !== "None" ? <td>{oneLiveScore["Set2 Player 1"]}</td> : <td></td>}
                                {oneLiveScore["Set2 Player 1"] !== "None" ? <td>{oneLiveScore["Set2 Player 1"]}</td> : <td></td>}

                            </tr>
                            <tr>
                                <td><img src={oneLiveScore.awayPlayerImage ? oneLiveScore.awayPlayerImage : ghostImage} /></td>
                                {/* <td><img src={oneLiveScore.awayPlayerFlag ? oneLiveScore.awayPlayerFlag : noImage} /><div>{oneLiveScore["Away Player"]}</div></td> */}
                                <td className={oneLiveScore.awayPlayer2 ? "Doubles" : "Singles"}>
                                    <div className="x y"><img src={oneLiveScore.awayPlayerFlag ? oneLiveScore.awayPlayerFlag : noImage} /></div>
                                    <div className="x"><p>{oneLiveScore["Away Player"]}</p></div>
                                    {/* {oneLiveScore.homePlayer2 && <div>YESS</div>} */}
                                </td>
                                <td>{oneLiveScore["Player 2 Score"]}</td>
                                <td>{oneLiveScore["Set1 Player 2"]}</td>
                                {oneLiveScore["Set2 Player 2"] !== "None" ? <td>{oneLiveScore["Set2 Player 2"]}</td> : <td></td>}
                                {oneLiveScore["Set2 Player 2"] !== "None" ? <td>{oneLiveScore["Set2 Player 2"]}</td> : <td></td>}


                            </tr>
                        </tbody>
                    </table>


                )}
            </>

            }





        </div>
    );
}

export default LiveScores;
