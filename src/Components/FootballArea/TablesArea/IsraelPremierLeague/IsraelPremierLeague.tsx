import { useEffect, useState } from "react";
import IsraelCodes from "../../../../Models/IsraelCodes";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import LeagueTable from "../LeagueTable/LeagueTable";
import "./IsraelPremierLeague.css";

function IsraelPremierLeague(): JSX.Element {

    const [standings, setStandings] = useState<StandingsModel[]>()

    useEffect(() => {
        const getIsraelPremierLeagueTable = async () => {
            try {
                const standings = await leaguesService.getAnyLeagueTable(IsraelCodes.israelPremierLeague.s22_23);
                setStandings(standings);
            }
            catch (err: any) {

                console.log(err);

            }

        }
        getIsraelPremierLeagueTable();
    }, []);

    function handleSeasonChange() {
        alert("Test")


    }


    return (
        <div className="IsraelPremierLeague">

            {standings &&
                <LeagueTable standings={standings} seasonsEnum={IsraelCodes.israelPremierLeague} setStandings={setStandings} />

            }

        </div>
    );
}

export default IsraelPremierLeague;
