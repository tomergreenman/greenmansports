import { useEffect, useState } from "react";
import PlayerModel from "../../../Models/PlayerModel";
import leaguesService from "../../../Services/LeaguesService";
import "./Home.css";
import footballer from "../../../Assets/Images/Footballer.png"
import federer from "../../../Assets/Images/Federer.png"
import roy from "../../../Assets/Images/Roy.png"
import rashford from "../../../Assets/Images/Rashford.png"
import lebron from "../../../Assets/Images/Lebron.png"
import Football from "../Sports Area/Football/Football";
import Tennis from "../Sports Area/Tennis/Tennis";
import TennisService from "../../../Services/TennisService";
import tennisService from "../../../Services/TennisService";
import AtpRankings from "../../TennisArea/ATPRanikings/AtpRankings";
import countryService from "../../../Services/CountryService";
import { get } from "http";
import Welcome from "../Welcome/Welcome";
import Golf from "../Golf/Golf";


function Home(): JSX.Element {

    const [players, setPlayers] = useState<PlayerModel[]>();

    // useEffect(()=>{
    //     const getTeams = async ()=>{
    //         try{
    //             const players = await leaguesService.getPlayersByTeamId(138)
    //             setPlayers(players)
    //             console.log(players);


    //         }
    //         catch(err:any){
    //             console.log(err.message);

    //         }
    //     }

    //     getTeams()
    // },[])

    useEffect(() => {

        const getCountries = async () => {

            const countries = await countryService.getAllCountries();
            console.log(countries);
        }

        getCountries()


    }, [])

    return (
        <div className="Home">


            <section className="About">
                <Welcome />
            </section>

            <section className="FootballSection">
                <Football />
            </section>


            <section className="TennisSection">
                <Tennis />
            </section>

            <section>
                <Golf />
            </section>


            {/* <Tennis />

            <div className="Div1">
                <img src={roy} className="roy" />
                <img src={rashford} className="rashford" />
                <img src={federer} className="federer" />
                <img src={lebron} className="lebron" />
            </div>

            <div className="Div2">
                <img src={roy} className="roy" />
                <img src={rashford} className="rashford" />
                <img src={federer} className="federer" />
                <img src={lebron} className="lebron" />
            </div> */}
        </div>

    );
}

export default Home;
