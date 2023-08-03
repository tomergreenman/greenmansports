import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import LeaguesTables from "../../FootballArea/TablesArea/LeaguesTables/LeaguesTables";
import AllTeamsList from "../../FootballArea/TeamsArea/AllTeamsList/AllTeamsList";
import TeamMorInfoList from "../../FootballArea/TeamsArea/TeamMorInfoList/TeamMorInfoList";
import "./Routing.css";
import AtpRankings from "../../TennisArea/ATPRanikings/AtpRankings";
import TennisPlyer from "../../TennisArea/TennisPlayerArea/TennisPlayer";
import LiveScores from "../../TennisArea/LiveScores/LiveScores";
import ComingSoon from "../../GolfArea/ComingSoon/ComingSoon";

function Routing(): JSX.Element {



    return (
        <div className="Routing">

            <Routes>
                <Route path="/greenmansports" element={<Home />} />
                <Route path="greenmansports/leagues/:leagueId" element={<LeaguesTables />} />
                <Route path="greenmansports/teams/:leagueId" element={<AllTeamsList />} />
                <Route path="greenmansports/teams/list/:teamId" element={<TeamMorInfoList />} />
                <Route path="greenmansports/tennis-players/:playerId" element={<TennisPlyer />} />
                <Route path="greenmansports/tennis-rankings" element={<AtpRankings />} />
                <Route path="greenmansports/tennis-liveScores" element={<LiveScores />} />
                <Route path="/greenmansports/golf" element={<ComingSoon />} />
                <Route path="/" element={<Navigate to={"/greenmansports"} />} />
                <Route path="*" element={<Navigate to={"/greenmansports"} />} />
            </Routes>

        </div>
    );
}

export default Routing;
