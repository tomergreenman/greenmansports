import { useEffect, useState } from "react";
import GermanyCodes from "../../../../Models/GermanyCodes";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import LeagueTable from "../LeagueTable/LeagueTable";
import "./Bundesliga.css";

function Bundesliga(): JSX.Element {

    const [standings, setStandings] = useState<StandingsModel[]>([])

    useEffect(() => {
        const getBundesligaTable = async () => {
            try {
                const standings = await leaguesService.getAnyLeagueTable(GermanyCodes.bundesliga.s22_23);
                setStandings(standings);
            }
            catch (err: any) {

                console.log(err);

            }

        }
        getBundesligaTable();
    }, []);

    function handleSeasonChange() {
        alert("Test")


    }


    return (
        <div className="Bundesliga">

            {standings &&
                <LeagueTable standings={standings} seasonsEnum={GermanyCodes.bundesliga} setStandings={setStandings} />

            }

        </div>
    );
}

export default Bundesliga;
