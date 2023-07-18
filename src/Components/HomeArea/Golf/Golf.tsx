import "./Golf.css";
import comingSoon from "../../../Assets/Images/coming-soon.png"
import coolGolf from "../../../Assets/Images/cool-golf.png"

function Golf(): JSX.Element {
    return (
        <div className="Golf">
            <img src={comingSoon} />
            <img src={coolGolf} />
			
        </div>
    );
}

export default Golf;
