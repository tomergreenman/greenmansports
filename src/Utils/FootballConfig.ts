class Config {

    public seasonsUrl = "https://sportscore1.p.rapidapi.com/seasons/";  // need to add "seasonId + /standings-tables or /teams"
    public managersUrl = "https://sportscore1.p.rapidapi.com/managers/" //need to add managerId
    public teamsUrl = "https://sportscore1.p.rapidapi.com/teams/" // need to add teamId + /players 
    public leaguesUrl = "https://sportscore1.p.rapidapi.com/leagues/" // need to add leagueId +/seasons

    // public teamsBySeasonId = "https://sportscore1.p.rapidapi.com/seasons/"; // need to add "seasonId/teams"

    public headers = {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
        'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
      }
    
}

const appConfig = new Config();

export default appConfig;