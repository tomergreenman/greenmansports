class TennisConfig {

    public ATPRankingsUrl = "https://ultimate-tennis1.p.rapidapi.com/rankings/atp/singles/1000/current"
    public PlayerInfoUrl = "https://ultimate-tennis1.p.rapidapi.com/player_info/" // need to add player id
    public liveScores = "https://ultimate-tennis1.p.rapidapi.com/live_scores"
    public liveStats = "https://ultimate-tennis1.p.rapidapi.com/match_details/" // need to add match id

    public headers = {

        'X-RapidAPI-Key': '2264410ea2msh9f4eaf323d09f12p168f68jsn854bd0556c44',
        'X-RapidAPI-Host': 'ultimate-tennis1.p.rapidapi.com'

    }

}

const tennisConfig = new TennisConfig();

export default tennisConfig