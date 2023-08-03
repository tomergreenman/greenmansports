import { useEffect, useState } from "react";
import "./AtpRankings.css"
import TennisRankingModel from "../../../Models/TennisRankingModel";
import { useNavigate } from "react-router-dom";
import tennisService from "../../../Services/TennisService";
import spinner from "../../../Assets/Images/1480.gif";

function AtpRankings(): JSX.Element {

    const [rankings, setRankings] = useState<TennisRankingModel[]>([]);
    const [displayedRankings, setDisplayedRankings] = useState<TennisRankingModel[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const getRankings = async () => {
            try {
                const rankings = await tennisService.getPlayersRanking();
                setRankings(rankings);
                const subRankings = rankings.slice(0, 100)
                setDisplayedRankings(subRankings)
            }

            catch (err: any) {
                console.log(err.message);

            }
        }

        getRankings();

    }, []);

    function display50MoreRankings() {
        const lastRankingIndex = displayedRankings.length;
        const subRankings = rankings.slice(0, lastRankingIndex + 100)
        setDisplayedRankings(subRankings)

    }

    function display50LessRankings() {
        const lastRankingIndex = displayedRankings.length;
        const subRankings = rankings.slice(0, lastRankingIndex - 100)
        setDisplayedRankings(subRankings)

    }

    return (
        <div className="AtpRankings">

            {
                rankings?.length < 1 &&
                <>
                    <img className="Spinner" src={spinner} />
                </>
            }

            {rankings?.length > 1 &&

                <table className="AtpTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Names </th>
                            <th>Age</th>
                            <th>Rank Diff</th>
                            <th>More Info</th>
                        </tr>

                    </thead>

                    <tbody>
                        {displayedRankings.map(rank =>
                            <tr key={rank.id}>
                                <td>#{rank.Rank}</td>
                                <td className="PlayerName" onClick={() => { navigate("/greenmansports/tennis-players/" + rank.id) }}>{rank.Name}</td>
                                <td>{rank.Age}</td>
                                <td>{rank["Rank Diff"]}</td>
                                <td><button onClick={() => { navigate("/greenmansports/tennis-players/" + rank.id) }}>More Info</button></td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={6}><button className="RankingsController" disabled={displayedRankings.length >= 1000} onClick={display50MoreRankings}>Show More</button>
                                <button className="RankingsController" disabled={displayedRankings.length <= 100} onClick={display50LessRankings}>Show Less</button></td>

                        </tr>

                    </tbody>
                </table>

            }

        </div>
    )

}

export default AtpRankings;