import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import "./LeagueTable.css";

interface LeagueTableProps {

    standings: StandingsModel[];
    seasonsEnum: any;
    setStandings: Dispatch<SetStateAction<StandingsModel[]>>;

}


// async function handleSeasonChange(event: ChangeEvent<HTMLSelectElement>, SeasonsEnum: any, setStandings: Dispatch<SetStateAction<StandingsModel[]>>) {

//     try {
//         let standings: StandingsModel[] = []
//         const season = event.target.value;
//         switch (season) {
//             case "22/23":
//                 standings = await leaguesService.getAnyLeagueTable(SeasonsEnum.s22_23);
//                 break;

//             case "21/22":
//                 standings = await leaguesService.getAnyLeagueTable(SeasonsEnum.s21_22);
//                 break;

//             case "20/21":
//                 standings = await leaguesService.getAnyLeagueTable(SeasonsEnum.s20_21);
//                 break;
//         }

//         setStandings(standings)

//     }

//     catch (err: any) {
//         console.log(err.message);

//     }

// }

function LeagueTable(props: LeagueTableProps): JSX.Element {



    async function handleSeasonChange(event: ChangeEvent<HTMLSelectElement>) {

        try {
            let standings: StandingsModel[] = [];
            const season = event.target.value;
            switch (season) {
                case "22/23":
                    standings = await leaguesService.getAnyLeagueTable(props.seasonsEnum.s22_23);
                    break;
    
                case "21/22":
                    standings = await leaguesService.getAnyLeagueTable(props.seasonsEnum.s21_22);
                    break;
    
                case "20/21":
                    standings = await leaguesService.getAnyLeagueTable(props.seasonsEnum.s20_21);
                    break;
            }
    
            props.setStandings(standings)
    
        }
    
        catch (err: any) {
            console.log(err.message);
    
        }
    
    }

    const navigate = useNavigate();

    return (
        <div className="LeagueTable">

            <div className="SeasonPicker">

                <label>Season:</label>
                <select onChange={handleSeasonChange}>
                    <option>22/23</option>
                    <option>21/22</option>
                    <option>20/21</option>
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

                    {props.standings.map(standing => <tr key={standing.team.id}>
                        <td className="Rank">{standing.position}</td>
                        <td className="Club" onClick={()=> navigate("/teams/" + standing.team.id)}><img src={standing.team.logo} /> {standing.team.name}</td>
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



        </div>
    );
}

export default LeagueTable;
