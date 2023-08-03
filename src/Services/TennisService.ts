import axios from "axios";
import tennisConfig from "../Utils/TennisConfig";
import TennisPlayerModel from "../Models/TennisPlayerModel";
import TennisRankingModel from "../Models/TennisRankingModel";
import LiveTennisModel from "../Models/LiveTennisModel";
import countryService from "./CountryService";
import { TennisActionType, TennisStore } from "../Redux/TennisState";
import noFlag from "../Assets/Images/No_Image_Available.jpeg"
import LiveTennisStatisticsModel from "../Models/LiveTennisStatisticsModel";


class TennisService {

    async getPlayersRanking(): Promise<TennisRankingModel[]> {
        try {

            // Get rankings from redux 
            let rankings = TennisStore.getState().tennisRankings;

            // if not in redux get rankings from API
            if (rankings.length === 0) {

                const response = await axios.get(tennisConfig.ATPRankingsUrl, { headers: tennisConfig.headers });
                rankings = response.data.data;

                //Send rankings to redux
                TennisStore.dispatch({ type: TennisActionType.FetchRankings, payload: rankings });

            }

            return rankings;
        }
        catch (err: any) {
            console.log(err.message);

        }

    }

    async getPlayerInfo(playerId: string): Promise<TennisPlayerModel> {
        try {

            // Try to get player from redux
            const tennisPlayers = TennisStore.getState().tennisPlayers;
            let player = tennisPlayers.find(player => player.id === playerId)

            // if player no in redux get him from API
            if (!player) {
                const response = await axios.get(tennisConfig.PlayerInfoUrl + playerId, { headers: tennisConfig.headers });
                player = response.data.player_data[0];
                player.id = playerId;

                //Add player to redux 
                TennisStore.dispatch({ type: TennisActionType.AddTennisPlayer, payload: player });
            }

            return player;
        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    async getPlayersFlag(player: TennisPlayerModel): Promise<string> {

        try {

            const playersBirthPlace = player.Birthplace;


            let playersCountry = playersBirthPlace.slice(playersBirthPlace.lastIndexOf(',') + 1).trim();

            //changing counties name to fix bugs caused by api conflicts (flags api only uses great for all Britain's countries)
            if (playersCountry === "England" ||
                playersCountry === "Scotland" ||
                playersCountry === "Wales" ||
                playersCountry === "Nnorthern Ireland") playersCountry = "United Kingdom"

            // fixing more bugs caused by api conflict  
            if (playersCountry === "Berlin") playersCountry = "Germany"

            if (playersCountry === "USA") playersCountry = "United States"

            if (playersCountry === "CZE") playersCountry = "Czechia"

            let country = await countryService.getOneCountry(playersCountry);

            // if didn't manage to get players flag than return no image available 
            if (!country) {

                return noFlag;
            }

            return country.flags.png

        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    //get players id from rankings and live scores in order to get and display player image in live scores 
    getPlayersIdFromRankingsAndLiveScores(rankings: TennisRankingModel[], playersName: string): string {

        try {

            let playerId: string;

            for (const rank of rankings) {
                /// check if players name from live scores exists in ranking table and if so than return his id
                const initial = playersName[0];
                const lastName = playersName.slice(playersName.indexOf(" ") + 1);

                if (rank.Name[0] === initial && rank.Name.slice(rank.Name.indexOf(" ") + 1) === lastName) {
                    playerId = rank.id;
                    break;

                }

            }

            return playerId;

        }

        catch (err: any) {
            console.log(err.message);

        }
    }

    async getLiveScores(): Promise<LiveTennisModel[]> {

        try {

            // always get scores from API because they change all the time
            const response = await axios.get(tennisConfig.liveScores, { headers: tennisConfig.headers });
            const scores = response.data.matches;

            for (const score of scores) {


                //shorten tournaments name (IPA uses very unnecessary long name) 
                let tournament = score.Tournament;
                tournament = tournament.slice(0, tournament.indexOf(","));
                score.Tournament = tournament;


                // Change players name form format of lastName initial. to initial. lastName 
                //(Greenman T. => T. Greenman)
                // if doubles match than extract each name separately (API uses one name for both players)
                if (score["Home Player"].includes('/')) {

                    let homePlayer1 = score["Home Player"].slice(0, score["Home Player"].indexOf("/") - 1);
                    homePlayer1 = homePlayer1.slice(homePlayer1.indexOf(" " + 1)) + ". " + homePlayer1.slice(0, homePlayer1.indexOf(" "));
                    let homePlayer2 = score["Home Player"].slice(score["Home Player"].indexOf("/") + 2);
                    homePlayer2 = homePlayer2.slice(homePlayer2.indexOf(" " + 1)) + ". " + homePlayer2.slice(0, homePlayer2.indexOf(" "));

                    score["Home Player"] = homePlayer1;
                    score.homePlayer2 = homePlayer2;

                    let awayPlayer1 = score["Away Player"].slice(0, score["Away Player"].indexOf("/") - 1);
                    awayPlayer1 = awayPlayer1.slice(awayPlayer1.indexOf(" " + 1)) + ". " + awayPlayer1.slice(0, awayPlayer1.indexOf(" "));
                    let awayPlayer2 = score["Away Player"].slice(score["Away Player"].indexOf("/") + 2);
                    awayPlayer2 = awayPlayer2.slice(awayPlayer2.indexOf(" " + 1)) + ". " + awayPlayer2.slice(0, awayPlayer2.indexOf(" "));

                    score["Away Player"] = awayPlayer1;
                    score.awayPlayer2 = awayPlayer2;

                }

                //Singles match
                else {

                    const awayPlayersFirstNameInitials = score["Away Player"].slice(score["Away Player"].indexOf('.') - 1).trim();
                    const awayPlayersLastName = score["Away Player"].substring(0, score["Away Player"].indexOf(".") - 2);
                    score["Away Player"] = awayPlayersFirstNameInitials + " " + awayPlayersLastName

                    const homePlayersFirstNameInitials = score["Home Player"].slice(score["Home Player"].indexOf('.') - 1).trim();
                    const homePlayersLastName = score["Home Player"].substring(0, score["Home Player"].indexOf(".") - 2);
                    score["Home Player"] = homePlayersFirstNameInitials + " " + homePlayersLastName

                }

            }

            return scores;
        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    async getLiveStats(matchId: string): Promise<LiveTennisStatisticsModel> {

        try {

            // Always get stats from API because they change all the time 
            const response = await axios.get(tennisConfig.liveStats + matchId, { headers: tennisConfig.headers });
            const stats = response.data.statistics[0];
            return stats;
        }

        catch (err: any) {
            console.log(err.message);

        }

    }


    // get players image and flag for live scores and stats because the images don't exist in live score or statistics API Model
    async getPlayersImageAndFlagById(liveScore: LiveTennisModel, statistics: LiveTennisStatisticsModel, rankings: TennisRankingModel[]): Promise<LiveTennisStatisticsModel> {

        try {

            // If no statistics found than return right away (statistics.Text only appears when not found and contains message of no stats found)
            if (statistics.Text) return statistics;

            const homePlayerId = this.getPlayersIdFromRankingsAndLiveScores(rankings, liveScore["Home Player"])

            // if id was found than get players image and flag
            if (homePlayerId) {

                const player = await tennisService.getPlayerInfo(homePlayerId);
                if (player) {
                    statistics.homePlayerImage = player.Image;
                    const homePayersFlag = await tennisService.getPlayersFlag(player);
                    statistics.homePlayerFlag = homePayersFlag;
                }
            }
            else {
                statistics.homePlayerImage = "";
                statistics.homePlayerFlag = "";
            }


            const awayPlayerId = this.getPlayersIdFromRankingsAndLiveScores(rankings, liveScore["Away Player"])
            if (awayPlayerId) {

                const player = await this.getPlayerInfo(awayPlayerId);
                if (player) {
                    statistics.awayPlayerImage = player.Image;
                    const awayPayersFlag = await this.getPlayersFlag(player);
                    statistics.awayPlayerFlag = awayPayersFlag;
                }

            }

        }

        catch (err: any) {
            console.log(err.message);

        }

        const newStats = { ...statistics };
        return newStats;


    }

}

const tennisService = new TennisService();

export default tennisService;