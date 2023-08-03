import ManagerModel from "../../../../Models/ManagerModel";
import PersonModel from "../../../../Models/PersonModel";
import "./ManagerCard.css";

interface ManagerCardProps {

    manager: ManagerModel;

}

function ManagerCard(props: ManagerCardProps): JSX.Element {
    return (
        <div className="ManagerCard">

            <img src={props.manager.photo} />
            <h4>{props.manager.name}</h4>
            <span>Manager</span>
            <span>Date of Birth: {new Date(props.manager.date_birth).toLocaleDateString()}</span>
            <span>Nationality: {props.manager.nationality_code}</span>

        </div>
    );
}

export default ManagerCard;
