import TeamModel from "../../../../Models/TeamModel";
import TeamCard from "../TeamCard/TeamCard";
import "./TeamsList.css";

interface TeamsListProps {

    teams: TeamModel[];
	
}

function TeamsList(props: TeamsListProps): JSX.Element {
    return (
        <div className="TeamsList">

            {
                props.teams.map(team=> <TeamCard key={team.id} team={team} />)
            }
			
        </div>
    );
}

export default TeamsList;
