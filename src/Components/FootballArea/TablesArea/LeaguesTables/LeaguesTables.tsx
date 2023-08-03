import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SeasonModel from "../../../../Models/SeasonsModel";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/FootballService";
import "./LeaguesTables.css";
import spinner from "../../../../Assets/Images/1480.gif";


function LeaguesTables(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const SelectRef = useRef<HTMLSelectElement>();

    const [seasons, setSeasons] = useState<SeasonModel[]>([])
    const [standings, setStandings] = useState<StandingsModel[]>([]);


    useEffect(() => {
        const getSeasons = async () => {
            try {
                const leagueId = +params.leagueId;
                const seasons = await leaguesService.getSeasonsByLeague(leagueId);

                // get current year season standings
                const standings = await leaguesService.getAnyLeagueTable(seasons[0].id);
                setStandings(standings);
                setSeasons(seasons);

                // always restart and display current year slug in select element after user leaves tables page and return later
                if (SelectRef.current) SelectRef.current.value = seasons[0].slug;

            }
            catch (err: any) {
                console.log(err.message);

            }
        }

        getSeasons();
    }, [document.URL])



    async function handleSeasonChange(event: ChangeEvent<HTMLSelectElement>) {

        try {
            let standings: StandingsModel[] = [];

            // get slug from select element
            const slug = event.target.value;

            const season = seasons.find(season => season.slug === slug);
            standings = await leaguesService.getAnyLeagueTable(season.id);

            setStandings(standings);

        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    return (
        <div className="LeaguesTables">

            {
                standings?.length === 0 &&
                <>
                    <img className="Spinner" src={spinner} />
                </>
            }

            {standings?.length > 0 && <>

                <div className="SeasonPicker">

                    <label>Season:</label>
                    <select ref={SelectRef} onChange={handleSeasonChange}>

                        <>
                            {seasons.map(season => <option key={season.id}>{season.slug}</option>)}
                        </>
                    </select>

                </div>

                <table className="LeaguesTable">


                    <thead>
                        <tr>
                            <th className="Rank">#</th>
                            <th className="Club">Club</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>

                    <tbody>

                        {standings.map(standing => <tr key={standing.team.id}>
                            <td className="Rank">{standing.position}</td>
                            <td className="Club" onClick={() => navigate("/greenmansports/teams/list/" + standing.team.id)}><img src={standing.team.logo} /> {standing.team.name}</td>
                            <td>{standing.fields.matches_total}</td>
                            <td>{standing.fields.wins_total}</td>
                            <td>{standing.fields.draws_total}</td>
                            <td>{standing.fields.losses_total}</td>
                            <td>{standing.goalsFor}</td>
                            <td>{standing.goalsAgainst}</td>
                            <td>{standing.goalsDifference}</td>
                            <td>{standing.fields.points_total}</td>
                        </tr>)}

                    </tbody>

                </table>
            </>
            }

        </div>
    );
}

export default LeaguesTables;
