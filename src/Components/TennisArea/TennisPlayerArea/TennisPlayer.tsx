import "./TennisPlayer.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TennisPlayerModel from "../../../Models/TennisPlayerModel";
import tennisService from "../../../Services/TennisService";
import noImage from "../../../Assets/Images/ghost-headshot.png"


import axios from "axios";

function TennisPlyer(): JSX.Element {

    const params = useParams();
    const [player, setPlayer] = useState<TennisPlayerModel>();
    const [flag, setFlag] = useState<string>()

    useEffect(() => {
        const getPlayer = async () => {
            try{
            const playerId = params.playerId;
            const player = await tennisService.getPlayerInfo(playerId);
            setPlayer(player);
        
            const flag = await tennisService.getPlayersFlag(player)
            if (flag) setFlag(flag)
            else setFlag(noImage)
            }
            catch(err: any){
                
                console.log(err.message);
                
            }


        }
        getPlayer()

    }, []);

    return (

        <div className="TennisPlayer">

            <div className="TennisPlayerContainer">

                {
                    player && flag && <>

                        <div className="PlayerInfo">


                            <h1>{player.Name}</h1>
                            <div className="Age"><span>Age</span><h2>{player.Age}</h2></div>
                            <div className="Age"><span>Place of Birth</span><h2>{player.Birthplace}</h2></div>
                            <div className="Age"><span>Coach</span><h2>{player.Coach}</h2></div>
                            <div className="Age"><span>Career High</span><h2>#{player["Career high"]}</h2></div>
                            <div className="Age"><span>Hight {'(cm)'}</span><h2>{player["height(cm)"]}</h2></div>
                            <div className="Age"><span>Weight {'(kg)'}</span><h2>{player["weight(kgs)"]}</h2></div>
                            <div className="Age Rank"><span>Rank</span><h2>#{player.Rank}</h2></div>

                            {/* <div>Place of Birth: {player.Birthplace}</div> */}
                            {/* <div>Coach: {player.Coach}</div> */}

                            {/* <div>Career High: {player["Career high"]}</div> */}
                            {/* <div>Hight {player["height(cm)"]}</div> */}
                            {/* <div>Weight {player["weight(kgs)"]}</div> */}
                            {/* <div className="Rank">Rank: #{player.Rank}</div> */}

                        </div>

                        <div className="PlayerImageDiv" >


                            <img className="PlayerImage" src={player.Image? player.Image : noImage} />
                            <img className="FlagImage" src={flag}></img>
                        </div>
                    </>



                }

            </div >

        </div>
    )
}

export default TennisPlyer