import { useEffect, useState } from "react";
import "./LiveScores.css";
import tennisService from "../../../Services/TennisService";
import LiveTennisModel from "../../../Models/LiveTennisModel";
import LiveTennisStatisticsModel from "../../../Models/LiveTennisStatisticsModel";
import LiveStatistics from "../LiveStatistics/LiveStatistics";
import spinner from "../../../Assets/Images/1480.gif";


function LiveScores(): JSX.Element {

    const [liveScores, setLiveScores] = useState<LiveTennisModel[]>([]);
    const [oneLiveScore, setOneLiveScores] = useState<LiveTennisModel>(null);
    const [popUp, setPopup] = useState<boolean>(false);
    const [statistics, setStatistics] = useState<LiveTennisStatisticsModel>(null)
    const [displaySpinner, setDisplaySpinner] = useState<boolean>(false)

    useEffect(() => {

        const getLiveScores = async () => {
            try {

                const liveScores = await tennisService.getLiveScores();
                setLiveScores(liveScores);
            }

            catch (err: any) {
                console.log(err.message);

            }

        }

        getLiveScores();

    }, [])

    async function handlePupUp(statistics: LiveTennisStatisticsModel, liveSore?: LiveTennisModel): Promise<void> {
        setPopup(!popUp)

        if (!popUp) {

            const rankings = await tennisService.getPlayersRanking()

            await tennisService.getPlayersImageAndFlagById(liveSore, statistics, rankings)

            setStatistics(statistics)
            setOneLiveScores(liveSore)
            document.body.classList.add('NoScroll')

        }
        else {
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
                        onClick={
                            async () => {

                                try {

                                    setDisplaySpinner(true);
                                    const statistics = await tennisService.getLiveStats(oneLiveScore.ID)
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
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {!oneLiveScore.homePlayer2 &&

                                    <td>{oneLiveScore["Home Player"]}</td>
                                }

                                {oneLiveScore.homePlayer2 &&
                                    <td className="Doubles">
                                        <p>{oneLiveScore["Home Player"]}</p>
                                        <p>{oneLiveScore.homePlayer2}</p>
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
                                {!oneLiveScore.homePlayer2 &&

                                    <td>{oneLiveScore["Away Player"]}</td>

                                }

                                {oneLiveScore.homePlayer2 &&
                                    <td className="Doubles">
                                        <p>{oneLiveScore["Away Player"]}</p>
                                        <p>{oneLiveScore.awayPlayer2}</p>
                                    </td>
                                }

                                {oneLiveScore["Player 2 Score"] !== "None" ? <td>{oneLiveScore["Player 2 Score"]}</td> : <td>0</td>}

                                <td>{oneLiveScore["Set1 Player 2"]}</td>
                                {oneLiveScore["Set2 Player 2"] !== "None" ? <td>{oneLiveScore["Set2 Player 2"]}</td> : null}
                                {oneLiveScore["Set3 Player 2"] !== "None" ? <td>{oneLiveScore["Set3 Player 2"]}</td> : null}
                                {oneLiveScore["Set4 Player 2"] !== "None" ? <td>{oneLiveScore["Set4 Player 2"]}</td> : null}
                                {oneLiveScore["Set5 Player 2"] !== "None" ? <td>{oneLiveScore["Set5 Player 2"]}</td> : null}

                            </tr>

                        </tbody>

                    </table>


                )}
            </>

            }


            {displaySpinner &&

                < img className="Spinner" src={spinner} />

            }

            {/*Extra statistics popup */}
            {
                popUp && statistics &&
                <div>
                    <div className="Overlay"
                        onClick={() => {
                            handlePupUp(null)
                        }}
                    >

                    </div>

                    <LiveStatistics statistics={statistics} liveScore={oneLiveScore} handlePopUP={() => handlePupUp(null)} />

                </div>

            }

        </div >
    );
}

export default LiveScores;
