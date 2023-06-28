import axios from "axios";
import PersonModel from "../Models/PersonModel";
import PlayerModel from "../Models/PlayerModel";
import SeasonModel from "../Models/SeasonsModel";
import StandingsModel from "../Models/StandingsModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/Config";

class LeagueService {

    async getPremierLeagueTable(): Promise<StandingsModel[]> {

        const response = await axios.get(appConfig.premierLeagueTable, { headers: appConfig.headers });
        const data = response.data.data;
        const dataStandings: StandingsModel[] = data[0].standings_rows;
        dataStandings.sort((a, b) => a.position - b.position); // sort teams by current position
        let standings: StandingsModel[] = []; // creating a new array to match my specific standings model
        for (const standing of dataStandings) {
            const newStanding = new StandingsModel(standing); // create a standings model from each standings that was sent from API
            standings.push(newStanding);
        }

        return standings;

    }

    async getAnyLeagueTable(seasonId: number): Promise<StandingsModel[]> {

        const response = await axios.get(appConfig.seasonsUrl + seasonId + "/standings-tables", { headers: appConfig.headers });
        const data = response.data.data;
        const dataStandings: StandingsModel[] = data[0].standings_rows;
        dataStandings.sort((a, b) => a.position - b.position); // sort teams by current position
        let standings: StandingsModel[] = []; // creating a new array to match my specific standings model
        for (const standing of dataStandings) {
            const newStanding = new StandingsModel(standing); // create a standings model from each standings that was sent from API
            standings.push(newStanding);
        }

        return standings;

    }

    async getTeamsBySeasonId(seasonId: number): Promise<TeamModel[]> {
        const response = await axios.get(appConfig.seasonsUrl + seasonId + "/teams", { headers: appConfig.headers });
        const teams = response.data.data;
        return teams;
    }

    async getTeamDataByTeamId(teamId: number): Promise<TeamModel> {
        const response = await axios.get(appConfig.teamsUrl + teamId, { headers: appConfig.headers });
        const team = response.data.data;
        return team;
    }

    async getManagerById(managerId: number): Promise<PersonModel> {
        const response = await axios.get(appConfig.managersUrl + managerId, { headers: appConfig.headers });
        const manager = response.data.data;
        return manager;
    }



    async getPlayersByTeamId(teamId: number): Promise<PlayerModel[]> {
        const response = await axios.get(appConfig.teamsUrl + teamId + "/players", { headers: appConfig.headers });
        const players: PlayerModel[] = response.data.data;

        //sorting by shirt number
        players.sort((a, b) => a.shirt_number - b.shirt_number)
        for (const player of players) {
            player.height = Math.round(player.height * 100) / 100

        }
    
        //deleting doubles
        for (let i = 0; i <= players.length - 2; i++) {
            if (players[i].id === players[i + 1].id) {
                players.splice(i,1)
            }

        }

        return players;
    }

    async getSeasonsByLeague(LeagueId: number): Promise<SeasonModel[]> {
        const response = await axios.get(appConfig.leaguesUrl + LeagueId +"/seasons", { headers: appConfig.headers });
        const seasons :SeasonModel[] = response.data.data;
        seasons.reverse();
        return seasons;
    }






}

const leaguesService = new LeagueService();

export default leaguesService;