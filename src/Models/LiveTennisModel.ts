class LiveTennisModel {

    public "Away Player": string;
    public "Home Player": string;
    public ID: string;
    public "Current set": string;
    public "Player 1 Score": string;
    public "Player 2 Score": string;
    public "Set1 Player 1": any; // string or number
    public "Set1 Player 2": any; // string or number
    public "Set2 Player 1": any; // string or number
    public "Set2 Player 2": any; // string or number
    public "Set3 Player 1": any; // string or number
    public "Set3 Player 2": any; // string or number
    public "Set4 Player 1": any; // string or number
    public "Set4 Player 2": any; // string or number
    public "Set5 Player 1": any; // string or number
    public "Set5 Player 2": any; // string or number
    public "Sets Player 1": number;
    public "Sets Player 2": number;
    public Surface: string;
    public Tournament: string;

    //Added fields that do not exist in the model of the api but i will add
    // them in the service in order to use them in the liveScores component 
    public awayPlayerImage: string;
    public homePlayerImage:string;
    public awayPlayerFlag: string;
    public homePlayerFlag: string;
    public awayPlayer2 : string;
    public homePlayer2: string;




}

export default LiveTennisModel