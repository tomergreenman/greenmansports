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

            let rankings = TennisStore.getState().tennisRankings;

            if (rankings.length === 0) {

                const response = await axios.get(tennisConfig.ATPRankingsUrl, { headers: tennisConfig.headers });
                rankings = response.data.data;
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

            const tennisPlayers = TennisStore.getState().tennisPlayers;
            let player = tennisPlayers.find(player => player.id === playerId)

            if (!player) {

                console.log("in not player");


                const response = await axios.get(tennisConfig.PlayerInfoUrl + playerId, { headers: tennisConfig.headers });
                player = response.data.player_data[0];
                player.id = playerId;
                TennisStore.dispatch({ type: TennisActionType.AddTennisPlayer, payload: player });
            }
            else console.log("already had in store");

            console.log(player);



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

            //fixing bugs caused by api conflicts (flags api only uses great for all Britain's countries)
            if (playersCountry === "England" ||
                playersCountry === "Scotland" ||
                playersCountry === "Wales" ||
                playersCountry === "Nnorthern Ireland") playersCountry = "United Kingdom"

            //tennis ipa sometimes states berlin as country instead of germany
            if (playersCountry === "Berlin") playersCountry = "Germany"

            if (playersCountry === "USA") playersCountry = "United States"

            if (playersCountry === "CZE") playersCountry = "Czechia"

            let country = await countryService.getOneCountry(playersCountry);
            if (!country) {

                return noFlag;
            }
            return country.flags.png

        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    getPlayersIdFromRankingsAndLiveScores(rankings: TennisRankingModel[], playersName: string): string {

        try {

            let playerId: string

            for (const rank of rankings) {
                const initial = playersName[0];
                const lastName = playersName.slice(playersName.indexOf(" ") + 1);

                // console.log(initial, rank.Name[0]);
                // console.log(lastName, rank.Name.slice(rank.Name.lastIndexOf(" ") + 1));




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

            let scores: LiveTennisModel[] = TennisStore.getState().liveScores;

            if (scores.length === 0) {

                console.log("GETTING NEW SCORES");


                const response = await axios.get(tennisConfig.liveScores, { headers: tennisConfig.headers });
                scores = response.data.matches;
                // scores.splice(3)



                const rankings = await tennisService.getPlayersRanking();





                // Change players name form format of lastName initial. to initial. lastName 
                //(Greenman T. => T. Greenman)
                for (const score of scores) {

                    let tournament = score.Tournament;
                    tournament = tournament.slice(0, tournament.indexOf(","))
                    score.Tournament = tournament



                    if (score["Home Player"].includes('/')) {
                        // console.log("Includes")

                        let homePlayer1 = score["Home Player"].slice(0, score["Home Player"].indexOf("/") - 1);
                        homePlayer1 = homePlayer1.slice(homePlayer1.indexOf(" " + 1)) + ". " + homePlayer1.slice(0, homePlayer1.indexOf(" "))
                        let homePlayer2 = score["Home Player"].slice(score["Home Player"].indexOf("/") + 2);
                        homePlayer2 = homePlayer2.slice(homePlayer2.indexOf(" " + 1)) + ". " + homePlayer2.slice(0, homePlayer2.indexOf(" "))

                        score["Home Player"] = homePlayer1
                        score.homePlayer2 = homePlayer2

                        // console.log(homePlayer1);
                        // console.log(homePlayer2);

                        let awayPlayer1 = score["Away Player"].slice(0, score["Away Player"].indexOf("/") - 1);
                        awayPlayer1 = awayPlayer1.slice(awayPlayer1.indexOf(" " + 1)) + ". " + awayPlayer1.slice(0, awayPlayer1.indexOf(" "))

                        let awayPlayer2 = score["Away Player"].slice(score["Away Player"].indexOf("/") + 2);
                        awayPlayer2 = awayPlayer2.slice(awayPlayer2.indexOf(" " + 1)) + ". " + awayPlayer2.slice(0, awayPlayer2.indexOf(" "))

                        score["Away Player"] = awayPlayer1
                        score.awayPlayer2 = awayPlayer2
                        // console.log(awayPlayer1);
                        // console.log(awayPlayer2);



                    }

                    else {

                        const awayPlayersFirstNameInitials = score["Away Player"].slice(score["Away Player"].indexOf('.') - 1).trim();
                        const awayPlayersLastName = score["Away Player"].substring(0, score["Away Player"].indexOf(".") - 2);
                        score["Away Player"] = awayPlayersFirstNameInitials + " " + awayPlayersLastName


                        const homePlayersFirstNameInitials = score["Home Player"].slice(score["Home Player"].indexOf('.') - 1).trim();
                        const homePlayersLastName = score["Home Player"].substring(0, score["Home Player"].indexOf(".") - 2);
                        score["Home Player"] = homePlayersFirstNameInitials + " " + homePlayersLastName

                    }


                    // const awayPlayerId = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, score["Away Player"]);

                    // // if id was found than get players image and flag
                    // if (awayPlayerId) {
                    //     const awayPlayer = await tennisService.getPlayerInfo(awayPlayerId);
                    //     if (awayPlayer) {
                    //         score.awayPlayerImage = awayPlayer.Image;
                    //         console.log("Waay image", awayPlayer.Image);

                    //         const awayPlayersFlag = await tennisService.getPlayersFlag(awayPlayer);
                    //         score.awayPlayerFlag = awayPlayersFlag;
                    //     }
                    // }

                    // const homePlayerId = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, score["Home Player"]);
                    // if (homePlayerId) {

                    //     const homePlayer = await tennisService.getPlayerInfo(homePlayerId);
                    //     if (homePlayer) {
                    //         console.log("home image", homePlayer.Image);

                    //         score.homePlayerImage = homePlayer.Image;
                    //         const homePlayersFlag = await tennisService.getPlayersFlag(homePlayer);
                    //         score.homePlayerFlag = homePlayersFlag;


                    //     }

                    // }



                    // if (score.awayPlayer2) {

                    //     const awayPlayer2Id = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, score.awayPlayer2);
                    //     if (awayPlayerId) {

                    //         const awayPlayer2 = await tennisService.getPlayerInfo(awayPlayer2Id);
                    //         if (awayPlayer2) {

                    //             score.awayPlayer2Image = awayPlayer2.Image;
                    //             const awayPlayers2Flag = await tennisService.getPlayersFlag(awayPlayer2);
                    //             score.awayPlayer2Flag = awayPlayers2Flag;


                    //         }

                    //     }
                    // }

                    // if (score.homePlayer2) {

                    //     const homePlayer2Id = tennisService.getPlayersIdFromRankingsAndLiveScores(rankings, score.homePlayer2);
                    //     if (homePlayerId) {

                    //         const homePlayer2 = await tennisService.getPlayerInfo(homePlayer2Id);
                    //         if (homePlayer2) {

                    //             score.homePlayer2Image = homePlayer2.Image;
                    //             const homePlayers2Flag = await tennisService.getPlayersFlag(homePlayer2);
                    //             score.homePlayer2Flag = homePlayers2Flag;


                    //         }

                    //     }
                    // }


                }

                TennisStore.dispatch({ type: TennisActionType.FetchLiveScores, payload: scores })

            }

            return scores;
        }

        catch (err: any) {
            console.log(err.message);

        }

    }

    async getLiveStats(matchId: string): Promise<LiveTennisStatisticsModel> {

        try {

            const response = await axios.get(tennisConfig.liveStats + matchId, { headers: tennisConfig.headers });
            const stats = response.data.statistics[0];
            console.log(stats);
            


            // if (stats.Text) return null

            return stats;
        }

        catch (err: any) {
            console.log(err.message);

        }

    }


    async getPlayersImageAndFlagById(liveScore: LiveTennisModel, statistics: LiveTennisStatisticsModel, rankings: TennisRankingModel[]): Promise<LiveTennisStatisticsModel> {

        try {

            if (statistics.Text) return statistics


            const homePlayerId = this.getPlayersIdFromRankingsAndLiveScores(rankings, liveScore["Home Player"])

            // if id was found than get players image and flag
            if (homePlayerId) {
                // console.log("FoundID for home");

                const player = await tennisService.getPlayerInfo(homePlayerId);
                if (player) {
                    statistics.homePlayerImage = player.Image;
                    const homePayersFlag = await tennisService.getPlayersFlag(player);
                    statistics.homePlayerFlag = homePayersFlag;
                }
            }
            else {
                statistics.homePlayerImage = ""
                statistics.homePlayerFlag = ""
            }



            const awayPlayerId = this.getPlayersIdFromRankingsAndLiveScores(rankings, liveScore["Away Player"])
            if (awayPlayerId) {
                // console.log("FoundID for away");

                const player = await this.getPlayerInfo(awayPlayerId);
                if (player) {
                    statistics.awayPlayerImage = player.Image;
                    const awayPayersFlag = await this.getPlayersFlag(player);
                    statistics.awayPlayerFlag = awayPayersFlag;
                }




            }
            // else console.log("notfound");



        }



        catch (err: any) {
            console.log(err.message);

        }

        const newStats = { ...statistics }
        return newStats


    }


    // async addImagesToStatistics(statistics: LiveTennisStatisticsModel, liveScore: LiveTennisModel, rankings: TennisRankingModel[]) {

    //     const homePlayerId = this.getPlayersIdFromRankingsAndLiveScores(rankings, liveScore["Home Player"])
    //     if homePlayerId





    // }

}

const tennisService = new TennisService();

export default tennisService;