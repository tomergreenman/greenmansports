import PlayerModel from "../../../../Models/PlayerModel";
import "./PlayerCard.css";

interface PlayerCardProps {

    player: PlayerModel;

}

function PlayerCard(props: PlayerCardProps): JSX.Element {
    return (
        <div className="PlayerCard">

            <img src={props.player.photo} />
            <h4>{props.player.name}</h4>
            <span>Position: {props.player.position_name}</span>
            <span>Age: {props.player.age}</span>
            <span>Date of Birth: {new Date(props.player.date_birth_at).toLocaleDateString()}</span>
            <span>Height: {props.player.height}</span>
            <span>Shirt Number: {props.player.shirt_number}</span>

        </div>
    );
}

export default PlayerCard;
