import { useEffect, useState } from "react";
import FranceCodes from "../../../../Models/FranceCodes";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import LeagueTable from "../LeagueTable/LeagueTable";
import "./LeagueOne.css";

function LeagueOne(): JSX.Element {

    const [standings, setStandings] = useState<StandingsModel[]>()

    useEffect(() => {
        const getLeagueOneTable = async () => {
            try {
                const standings = await leaguesService.getAnyLeagueTable(FranceCodes.leagueOne.s22_23);
                
                setStandings(standings);
            }
            catch (err: any) {

                console.log(err);

            }

        }
        getLeagueOneTable();

    }, []);

    function handleSeasonChange() {
        alert("Test")


    }

    return (
        <div className="LeagueOne">

            {standings &&
                <LeagueTable standings={standings} seasonsEnum={FranceCodes.leagueOne} setStandings={setStandings} />

            }

        </div>
    );
}

export default LeagueOne;
