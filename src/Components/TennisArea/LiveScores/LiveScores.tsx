import { useEffect, useState } from "react";
import "./LiveScores.css";
import tennisService from "../../../Services/TennisService";
import LiveTennisModel from "../../../Models/LiveTennisModel";
import noImage from "../../../Assets/Images/No_Image_Available.jpeg"
import ghostImage from "../../../Assets/Images/ghost-headshot.png"
import LiveTennisStatisticsModel from "../../../Models/LiveTennisStatisticsModel";
import LiveStatistics from "../LiveStatistics/LiveStatistics";
import spinner from "../../../Assets/Images/1480.gif";


function LiveScores(): JSX.Element {

    const [liveScores, setLiveScores] = useState<LiveTennisModel[]>([]);
    const [oneLiveScore, setOneLiveScores] = useState<LiveTennisModel>(null);
    const [homeFlag, setHomeFlag] = useState<string>();
    const [awayFlag, setAwayFlag] = useState<string>();
    const [homePlayerImage, setHomePlayerImage] = useState<string>();
    const [awayPlayerImage, setAwayPlayerImage] = useState<string>();
    const [popUp, setPopup] = useState<boolean>(false);
    const [statistics, setStatistics] = useState<LiveTennisStatisticsModel>(null)
    const [displaySpinner, setDisplaySpinner] = useState<boolean>(false)


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

                // const rankings = await tennisService.getPlayersRanking();

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

    async function handlePupUp(statistics: LiveTennisStatisticsModel, liveSore?: LiveTennisModel): Promise<void> {
        setPopup(!popUp)
        if (statistics?.Text) {

            // setPopup(false)

        }

        if (!popUp) {

            const rankings = await tennisService.getPlayersRanking()

            await tennisService.getPlayersImageAndFlagById(liveSore, statistics, rankings)

            // const homePlayersImageAndFlag = await tennisService.getPlayersImageAndFlagById(liveSore, rankings);

            // const homePlayerId = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, liveSore["Home Player"]);
            // if(homePlayerId) {
            //     const homePlayer = await tennisService.getPlayerInfo(homePlayerId)
            //     statistics.homePlayerImage = homePlayer.Image;
            // }
            setStatistics(statistics)
            setOneLiveScores(liveSore)
            document.body.classList.add('NoScroll')

        }
        else {
            console.log("NOT POUP");

            document.body.classList.remove('NoScroll')
            setStatistics(null)
            setOneLiveScores(null)


        }


    }


    return (
        <div className="LiveScores">

            {liveScores.length === 0 &&

                <>
                    <img className="Spinner" src={spinner} />
                </>

            }

            {liveScores && <>
                {liveScores.map(oneLiveScore =>
                    <table className="TennisLiveScoreTable" key={oneLiveScore.ID}
                        onClick={async () => {

                            try {

                                setDisplaySpinner(true);

                                const statistics = await tennisService.getLiveStats(oneLiveScore.ID)
                                console.log("Triedf To Get Stats", statistics);



                                await handlePupUp(statistics, oneLiveScore)
                                setDisplaySpinner(false)
                            }

                            catch (err: any) {
                                console.log(err.message);

                            }

                        }


                        }

                    >
                        <thead>
                            <tr>
                                <th colSpan={8}>{oneLiveScore.Tournament} - {oneLiveScore.Round} -  {oneLiveScore.Surface}</th>
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
                                {/* <td><img src={oneLiveScore.homePlayerImage ? oneLiveScore.homePlayerImage : ghostImage} /></td> */}
                                {!oneLiveScore.homePlayer2 &&
                                    // <td className="Singles">

                                    //     <div className="x y"><img src={oneLiveScore.homePlayerFlag ? oneLiveScore.homePlayerFlag : noImage} /></div>
                                    //     <div className="x"><p>{oneLiveScore["Home Player"]}</p></div>

                                    // </td>

                                    <td>{oneLiveScore["Home Player"]}</td>
                                }
                                {/* <td className={oneLiveScore.homePlayer2 ? "Doubles" : "Singles"}>
                                    <div className="x y"><img src={oneLiveScore.homePlayerFlag ? oneLiveScore.homePlayerFlag : noImage} /></div>
                                    <div className="x"><p>{oneLiveScore["Home Player"]}</p></div>
                                </td> */}

                                {oneLiveScore.homePlayer2 &&
                                    <td className="Doubles">
                                        <div className="Singles">
                                            {/* <div className="x y"><img src={oneLiveScore.homePlayerFlag ? oneLiveScore.homePlayerFlag : noImage} /></div> */}
                                            <div className="x"><p>{oneLiveScore["Home Player"]}</p></div>
                                        </div>
                                        <div className="Singles">
                                            {/* <div className="x y"><img src={oneLiveScore.homePlayer2Flag ? oneLiveScore.homePlayerFlag : noImage} /></div> */}
                                            <div className="x"><p>{oneLiveScore.homePlayer2}</p></div>
                                        </div>


                                    </td>
                                }
                                {oneLiveScore["Player 1 Score"] !== "None" ? <td>{oneLiveScore["Player 1 Score"]}</td> : <td>0</td>}

                                <td>{oneLiveScore["Set1 Player 1"]}</td>
                                {oneLiveScore["Set2 Player 1"] !== "None" ? <td>{oneLiveScore["Set2 Player 1"]}</td> : null}
                                {oneLiveScore["Set3 Player 1"] !== "None" ? <td>{oneLiveScore["Set3 Player 1"]}</td> : null}
                                {oneLiveScore["Set4 Player 1"] !== "None" ? <td>{oneLiveScore["Set4 Player 1"]}</td> : null}
                                {oneLiveScore["Set5 Player 1"] !== "None" ? <td>{oneLiveScore["Set5 Player 1"]}</td> : null}

                            </tr>

                            <tr>
                                {/* <td><img src={oneLiveScore.awayPlayerImage ? oneLiveScore.awayPlayerImage : ghostImage} /></td> */}
                                {/* <td><img src={oneLiveScore.awayPlayerFlag ? oneLiveScore.awayPlayerFlag : noImage} /><div>{oneLiveScore["Away Player"]}</div></td> */}

                                {!oneLiveScore.homePlayer2 &&
                                    // <td className="Singles">

                                    //     <div className="x y"><img src={oneLiveScore.awayPlayerFlag ? oneLiveScore.awayPlayerFlag : noImage} /></div>
                                    //     <div className="x"><p>{oneLiveScore["Away Player"]}</p></div>

                                    // </td>

                                    <td>{oneLiveScore["Away Player"]}</td>

                                }
                                {/* <td className={oneLiveScore.homePlayer2 ? "Doubles" : "Singles"}>
                                    <div className="x y"><img src={oneLiveScore.homePlayerFlag ? oneLiveScore.homePlayerFlag : noImage} /></div>
                                    <div className="x"><p>{oneLiveScore["Home Player"]}</p></div>
                                </td> */}

                                {oneLiveScore.homePlayer2 &&
                                    <td className="Doubles">
                                        <div className="Singles">
                                            {/* <div className="x y"><img src={oneLiveScore.awayPlayerFlag ? oneLiveScore.awayPlayerFlag : noImage} /></div> */}
                                            <div className="x"><p>{oneLiveScore["Away Player"]}</p></div>
                                        </div>
                                        <div className="Singles">
                                            {/* <div className="x y"><img src={oneLiveScore.awayPlayer2Flag ? oneLiveScore.awayPlayerFlag : noImage} /></div> */}
                                            <div className="x"><p>{oneLiveScore.awayPlayer2}</p></div>
                                        </div>


                                    </td>
                                }

                                {oneLiveScore["Player 2 Score"] !== "None" ? <td>{oneLiveScore["Player 2 Score"]}</td> : <td>0</td>}

                                <td>{oneLiveScore["Set1 Player 2"]}</td>
                                {oneLiveScore["Set2 Player 2"] !== "None" ? <td>{oneLiveScore["Set2 Player 2"]}</td> : null}
                                {oneLiveScore["Set3 Player 2"] !== "None" ? <td>{oneLiveScore["Set3 Player 2"]}</td> : null}
                                {oneLiveScore["Set4 Player 2"] !== "None" ? <td>{oneLiveScore["Set4 Player 2"]}</td> : null}
                                {oneLiveScore["Set5 Player 2"] !== "None" ? <td>{oneLiveScore["Set5 Player 2"]}</td> : null}


                            </tr>


                            {/* <tr>
                                <td colSpan={6}>{oneLiveScore.Round}</td>
                            </tr> */}
                        </tbody>
                    </table>


                )}
            </>

            }


            {displaySpinner &&


                < img className="Spinner" src={spinner} />
                // <div>WOWOWOWOWO</div>



            }


            {
                popUp && statistics &&
                <div>
                    <div className="Overlay"
                        onClick={() => {
                            handlePupUp(null)
                        }}
                    ></div>
                    {/* <div className="PopUp">


                        <p>{oneLiveScore["Home Player"]}</p>
                        <p>{oneLiveScore["Away Player"]}</p>
                        <p>{statistics["P2 name"]}</p>
                        <button className="ClosePopupButton" onClick={() => {
                            closePopup()
                        }}>X</button>

                    </div> */}


                    <LiveStatistics statistics={statistics} liveScore={oneLiveScore} handlePopUP={() => handlePupUp(null)} />

                </div>

            }





        </div >
    );
}

export default LiveScores;
