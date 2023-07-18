
class LiveTennisStatisticsModel {
    public "Aces P1": string
    public "Aces P2": string
    public "Break points converted P2": string
    public "Break points saved P1": string
    public "Break points converted P1": string
    public "Break points saved P2": string
    public "First serve P1": string
    public "First serve P2": string
    public "First serve points P1": string
    public "First serve points P2": string
    public "First serve return points P1": string
    public "First serve return points P2": string
    public "Max games in a row P2": string
    public "Max games in a row P1": string
    public "P1 name": string
    public "P2 name": string
    public "Second serve P1": string
    public "Second serve P2": string
    public "Second serve points P1": string
    public "Second serve points P2": string
    public "Second serve return points P1": string
    public "Second serve return points P2": string
    public "Service games played P1": string
    public "Service games played P2": string
    public "Service points won P1": string
    public "Service points won P2": string
    public "Tiebreaks P1": string
    public "Tiebreaks P2": string
    public "Total points won P1": string
    public "Total points won P2": string
    public "Tournament": string


    //Added fields that do not exist in the model of the api but i will add
    // them in the service in order to use them in the liveScores component 
    public awayPlayerImage: string;
    public homePlayerImage:string;
    public awayPlayerFlag: string;
    public homePlayerFlag: string;
    // public awayPlayer2 : string;
    // public homePlayer2: string;
    public awayPlayer2Image: string;
    public homePlayer2Image:string;
    public awayPlayer2Flag: string;
    public homePlayer2Flag: string;

    // if no stats were found
    public Text: string
    
}


export default LiveTennisStatisticsModel;