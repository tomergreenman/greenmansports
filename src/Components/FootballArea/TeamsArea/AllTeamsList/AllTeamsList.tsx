import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnglandCodes from "../../../../Models/EnglandCodes";
import TeamModel from "../../../../Models/TeamModel";
import leaguesService from "../../../../Services/LeaguesService";
import TeamsList from "../TeamsList/TeamsList";
import "./AllTeamsList.css";

function AllTeamsList(): JSX.Element {

    const [teams, setTeams] = useState<TeamModel[]>([])
    const params = useParams();



    useEffect(() => {
        const getTeams = async () => {
            try {
                const leagueId = +params.leagueId; 
                const seasons = await leaguesService.getSeasonsByLeague(leagueId);
                const currentSeasonId = seasons[0].id;
                const teams = await leaguesService.getTeamsBySeasonId(currentSeasonId);
                setTeams(teams);
            }
            catch (err: any) {
                console.log(err.message);

            }
        }

        getTeams()
    }, [document.URL])


    return (
        <div className="AllTeamsList">

{
                teams.length > 0 &&
                <TeamsList teams={teams} />
            }

			
        </div>
    );
}

export default AllTeamsList;
