import { useEffect, useState } from "react";
import SpainCodes from "../../../../Models/SpainCodes";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import LeagueTable from "../LeagueTable/LeagueTable";
import "./LaLiga.css";

function LaLiga(): JSX.Element {

    const [standings, setStandings] = useState<StandingsModel[]>()

    useEffect(() => {
        const getLaligaTable = async () => {
            try {
                const standings = await leaguesService.getAnyLeagueTable(SpainCodes.laLiga.s22_23);
                setStandings(standings);
            }
            catch (err: any) {

                console.log(err);

            }

        }
        getLaligaTable();
    }, []);

    function handleSeasonChange() {
        alert("Test")


    }


    return (
        <div className="LaLiga">

            {standings &&
                <LeagueTable standings={standings} seasonsEnum={SpainCodes.laLiga} setStandings={setStandings} />

            }

            {/* <table className="LeagueTable">

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

    {standings && standings.map(standing => <tr key={standing.team.id}>
        <td className="Rank">{standing.position}</td>
        <td className="Club"><img src={standing.team.logo} /> {standing.team.name}</td>
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

</table> */}

        </div>
    );
}

export default LaLiga;
