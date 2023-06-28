import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerModel from "../../../../Models/PersonModel";
import TeamModel from "../../../../Models/TeamModel";
import leaguesService from "../../../../Services/LeaguesService";
import "./TeamCard.css";

interface TeamCardProps {

    team: TeamModel;

}

function TeamCard(props: TeamCardProps): JSX.Element {

    const navigate = useNavigate();

    // const [manager, setManager] = useState<ManagerModel>()

    // useEffect(() => {
    //     const getManager = async () => {
    //         try {
    //             const manager = await leaguesService.getManagerById(props.team.manager_id)
    //             setManager(manager)

    //         }

    //         catch (err: any) {
    //             console.log(err.message);

    //         }
    //     }

    //     getManager()
    // }, [])

    function morInfo(){
        navigate("/teams/list/" + props.team.id)

    }

    return (
        <div onClick={morInfo} className="TeamCard">

                <h4>{props.team.name}</h4>
                <div><img src={props.team.logo} /></div>

        </div>
    );
}

export default TeamCard;
