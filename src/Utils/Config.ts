class Config {

    public premierLeagueTable = "https://sportscore1.p.rapidapi.com/seasons/18686/standings-tables";
    public seasonsUrl = "https://sportscore1.p.rapidapi.com/seasons/";  // need to add "seasonId + /standings-tables or /teams"
    // public teamsBySeasonId = "https://sportscore1.p.rapidapi.com/seasons/"; // need to add "seasonId/teams"
    public managersUrl = "https://sportscore1.p.rapidapi.com/managers/" //need to add managerId
    public teamsUrl = "https://sportscore1.p.rapidapi.com/teams/" // need to add teamId + /players 
    public leaguesUrl = "https://sportscore1.p.rapidapi.com/leagues/" // need to add leagueId +/seasons

    public headers = {
        'X-RapidAPI-Key': '2264410ea2msh9f4eaf323d09f12p168f68jsn854bd0556c44',
        'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
      }
    
}


const appConfig = new Config();

export default appConfig;