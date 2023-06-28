import { useEffect, useState } from "react";
import "./AtpRankings.css"
import TennisRankingModel from "../../../Models/TennisRankingModel";
import { useNavigate } from "react-router-dom";
import tennisService from "../../../Services/TennisService";
import spinner from "../../../Assets/Images/tenor.gif";

function AtpRankings(): JSX.Element {

    const [rankings, setRankings] = useState<TennisRankingModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getRankings = async () => {
            const rankings = await tennisService.getPlayersRanking();
            setRankings(rankings);
            // const scores = await tennisService.getLiveScores();
            // console.log(scores);

        }

        getRankings();

    }, []);



    return (
        <div className="AtpRankings">
            {/* <div className="BufferDiv"></div> */}

            {
                rankings.length < 1 &&
                <>
                    <img className="spinner" src={spinner} />
                </>
            }

            {rankings.length > 1 &&

                <table className="AtpTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Rank Diff</th>
                            <th>More Info</th>
                        </tr>

                    </thead>

                    <tbody>
                        {rankings.map(rank =>
                            <tr key={rank.id}>
                                <td>#{rank.Rank}</td>
                                <td className="PlayerName" onClick={() => { navigate("/tennis-players/" + rank.id) }}>{rank.Name}</td>
                                <td>{rank.Age}</td>
                                <td>{rank["Rank Diff"]}</td>
                                <td><button onClick={() => { navigate("/tennis-players/" + rank.id) }}>More Info</button></td>
                            </tr>
                        )}

                    </tbody>
                </table>
            }

        </div>
    )

}

export default AtpRankings;