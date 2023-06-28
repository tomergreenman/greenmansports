import { useEffect, useState } from "react";
import ItalyCodes from "../../../../Models/ItalyCodes";
import StandingsModel from "../../../../Models/StandingsModel";
import leaguesService from "../../../../Services/LeaguesService";
import LeagueTable from "../LeagueTable/LeagueTable";
import "./SerieA.css";

function SerieA(): JSX.Element {

    const [standings, setStandings] = useState<StandingsModel[]>()

    useEffect(() => {
        const getSerieATable = async () => {
            try {
                const standings = await leaguesService.getAnyLeagueTable(ItalyCodes.serieA.s22_23);
                setStandings(standings);
            }
            catch (err: any) {

                console.log(err);

            }

        }
        getSerieATable();
    }, []);

    function handleSeasonChange() {
        alert("Test")


    }

    return (
        <div className="SerieA">
            {standings &&
                <LeagueTable standings={standings} seasonsEnum={ItalyCodes.serieA} setStandings={setStandings} />

            }

        </div>
    );
}

export default SerieA;
