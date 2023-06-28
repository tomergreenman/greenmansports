import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Bundesliga from "../../FootballArea/TablesArea/Bundesliga/Bundesliga";
import IsraelPremierLeague from "../../FootballArea/TablesArea/IsraelPremierLeague/IsraelPremierLeague";
import LaLiga from "../../FootballArea/TablesArea/LaLiga/LaLiga";
import LeagueOne from "../../FootballArea/TablesArea/LeagueOne/LeagueOne";
import LeaguesTables from "../../FootballArea/TablesArea/LeaguesTables/LeaguesTables";
import PremierLeague from "../../FootballArea/TablesArea/PremierLeague/PremierLeague";
import SerieA from "../../FootballArea/TablesArea/SerieA/SerieA";
import AllTeamsList from "../../FootballArea/TeamsArea/AllTeamsList/AllTeamsList";
import PremierLeagueTeams from "../../FootballArea/TeamsArea/PremierLeagueTeams/PremierLeagueTeams";
import TeamMorInfoCard from "../../FootballArea/TeamsArea/TeamMorInfoCard/TeamMorInfoCard";
import TeamMorInfoList from "../../FootballArea/TeamsArea/TeamMorInfoList/TeamMorInfoList";
import Footer from "../Footer/Footer";
import "./Routing.css";
import AtpRankings from "../../TennisArea/ATPRanikings/AtpRankings";
import TennisPlyer from "../../TennisArea/TennisPlayerArea/TennisPlayer";
import LiveScores from "../../TennisArea/LiveScores/LiveScores";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
                {/* <div className="BufferDiv"></div> */}
            <Routes>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/premier-league" element={<PremierLeague />} /> */}
                <Route path="/leagues/:leagueId" element={<LeaguesTables />} />
                {/* <Route path="/la-liga" element={<LaLiga />} /> */}
                {/* <Route path="/serie-a" element={<SerieA />} /> */}
                {/* <Route path="/bundesliga" element={<Bundesliga />} /> */}
                {/* <Route path="/league-one" element={<LeagueOne />} /> */}
                {/* <Route path="/israel-league" element={<IsraelPremierLeague />} /> */}
                {/* <Route path="premier-league/teams" element={<PremierLeagueTeams />} /> */}
                <Route path="teams/:leagueId" element={<AllTeamsList />} />
                <Route path="/teams/list/:teamId" element={<TeamMorInfoList />} />
                <Route path="tennis-players/:playerId" element={<TennisPlyer />} />
                <Route path="/tennis-rankings" element={<AtpRankings />} />
                <Route path="/tennis-liveScores" element={<LiveScores />}/>
                <Route path="/footer" element={<Footer />} />
                <Route path="/" element={<Navigate to={"/home"} />} />
            </Routes>

        </div>
    );
}

export default Routing;
