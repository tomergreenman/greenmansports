import { useEffect, useState } from "react";
import EnglandCodes from "../../../../Models/EnglandCodes";
import TeamModel from "../../../../Models/TeamModel";
import leaguesService from "../../../../Services/LeaguesService";
import TeamsList from "../TeamsList/TeamsList";
import "./PremierLeagueTeams.css";

function PremierLeagueTeams(): JSX.Element {

    const [teams, setTeams] = useState<TeamModel[]>([])



    useEffect(() => {
        const getTeams = async () => {
            try {
                const teams = await leaguesService.getTeamsBySeasonId(EnglandCodes.premierLeague.s22_23)
                setTeams(teams)
            }
            catch (err: any) {
                console.log(err.message);

            }
        }

        getTeams()
    }, [])


    return (
        <div className="PremierLeagueTeams">

            {
                teams.length > 0 &&
                <TeamsList teams={teams} />
            }

        </div>
    );
}

export default PremierLeagueTeams;
