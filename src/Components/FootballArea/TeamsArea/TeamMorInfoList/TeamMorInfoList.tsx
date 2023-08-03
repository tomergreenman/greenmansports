import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerModel from "../../../../Models/PlayerModel";
import TeamModel from "../../../../Models/TeamModel";
import leaguesService from "../../../../Services/FootballService";
import ManagerCard from "../ManagerCard/ManagerCard";
import TeamMorInfoCard from "../PlayerCard/PlayerCard";
import "./TeamMorInfoList.css";
import ManagerModel from "../../../../Models/ManagerModel";

function TeamMorInfoList(): JSX.Element {

    const [players, setPlayers] = useState<PlayerModel[]>();
    const [manager, setManager] = useState<ManagerModel>();
    const [team, setTeam] = useState<TeamModel>()

    const params = useParams();

    useEffect(() => {

        const teamId = +params.teamId
        const getInfo = async () => {
            try {
                const players = await leaguesService.getPlayersByTeamId(teamId);
                setPlayers(players);

                const team = await leaguesService.getTeamDataByTeamId(teamId);
                setTeam(team);

                const manager = await leaguesService.getManagerById(team.manager_id);
                setManager(manager);
            }

            catch (err: any) {
                console.log(err.message);

            }
        }

        getInfo();

    }, []);

    return (
        <div className="TeamMorInfoList">

            {
                players && manager && team &&

                <>
                    <div className="ManagerAndLogo">
                        <div className="Logo" ><img src={team.logo} /></div>
                        <div className="Manager"><ManagerCard manager={manager} /></div>
                    </div>

                    <div className="Players">
                        {players.map(player => <TeamMorInfoCard key={player.id} player={player} />)}
                    </div>
                    
                </>
            }

        </div>
    );
}

export default TeamMorInfoList;
