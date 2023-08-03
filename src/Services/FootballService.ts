import axios from "axios";
import PlayerModel from "../Models/PlayerModel";
import SeasonModel from "../Models/SeasonsModel";
import StandingsModel from "../Models/StandingsModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/FootballConfig";
import ManagerModel from "../Models/ManagerModel";
import { FootballActionType, FootballStore } from "../Redux/FootballState";

class FootballService {

    async getAnyLeagueTable(seasonId: number): Promise<StandingsModel[]> {

        const allReduxStandings = FootballStore.getState().standings;

        //check if standings already retrieved from API and saved to redux
        let standings = allReduxStandings.find(standings => standings[0].seasonId === seasonId);

        // if standings don't exist in redux, fetch from API and send to redux
        if (!standings) {

            const response = await axios.get(appConfig.seasonsUrl + seasonId + "/standings-tables", { headers: appConfig.headers });
            const data = response.data.data;
            const dataStandings: StandingsModel[] = data[0].standings_rows;
            dataStandings.sort((a, b) => a.position - b.position); // sort teams by current position

            // creating a new array to match my specific standings model using standing model constructor
            standings = [];
            for (const standing of dataStandings) {
                const newStanding = new StandingsModel(standing, seasonId); // create a standings model from each standings that was sent from API
                standings.push(newStanding);
            }

            FootballStore.dispatch({ type: FootballActionType.AddStanding, payload: standings });

        }

        return standings;

    }

    //NOT IN USE AT THE MOMENT
    async getTeamsBySeasonId(seasonId: number): Promise<TeamModel[]> {
        const response = await axios.get(appConfig.seasonsUrl + seasonId + "/teams", { headers: appConfig.headers });
        const teams = response.data.data;
        return teams;
    }

    async getTeamDataByTeamId(teamId: number): Promise<TeamModel> {

        //check if team already retrieved from API and saved to redux
        const allReduxTeams = FootballStore.getState().teams;
        let team = allReduxTeams.find(team => team.id === teamId);

        // if team doesn't exist in redux, fetch from API and send to redux
        if (!team) {

            const response = await axios.get(appConfig.teamsUrl + teamId, { headers: appConfig.headers });
            team = response.data.data;
            FootballStore.dispatch({ type: FootballActionType.AddTeam, payload: team });
        }

        return team;
    }

    async getManagerById(managerId: number): Promise<ManagerModel> {

        //check if manager already retrieved from API and saved to redux
        const allReduxManagers = FootballStore.getState().managers;
        let manager = allReduxManagers.find(manager => manager.id === managerId);

        // if manager doesn't exist in redux, fetch from API and send to redux
        if (!manager) {

            const response = await axios.get(appConfig.managersUrl + managerId, { headers: appConfig.headers });
            manager = response.data.data;
            FootballStore.dispatch({ type: FootballActionType.AddManager, payload: manager });

        }

        return manager;
    }

    async getPlayersByTeamId(teamId: number): Promise<PlayerModel[]> {

        //check if teams players already retrieved from API and saved to redux
        const allReduxPlayers = FootballStore.getState().players;
        let players = allReduxPlayers.find(players => players[0].teamId === teamId);

        // if players don't exist in redux, fetch from API and send to redux
        if (!players) {

            const response = await axios.get(appConfig.teamsUrl + teamId + "/players", { headers: appConfig.headers });
            players = response.data.data;

            //sorting by shirt number
            players.sort((a, b) => a.shirt_number - b.shirt_number)

            //fixing hight bug in IPA (sometimes player hight is with added 0 not needed)
            // also add team id for each player (in order to help with redux)
            for (const player of players) {
                player.height = Math.round(player.height * 100) / 100
                player.teamId = teamId;
            }

            //deleting doubles (sometimes players appear twice in API)
            for (let i = 0; i <= players.length - 2; i++) {
                if (players[i].id === players[i + 1].id) players.splice(i, 1);

            }

            FootballStore.dispatch({ type: FootballActionType.AddPlayers, payload: players });

        }

        return players;
    }

    async getSeasonsByLeague(LeagueId: number): Promise<SeasonModel[]> {
        const response = await axios.get(appConfig.leaguesUrl + LeagueId + "/seasons", { headers: appConfig.headers });
        const seasons: SeasonModel[] = response.data.data;
        seasons.reverse();
        return seasons;
    }

}

const footballService = new FootballService();

export default footballService;