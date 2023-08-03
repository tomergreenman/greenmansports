class TennisPlayerModel {
    public Name: string;
    public Age: string;
    public Birthplace: string;
    public "Flag Code": string;
    public Coach: string;
    public Rank: string;
    public "Career high": string
    public "TItles Career": string;
    public Image: string;
    public "height(cm)": string;
    public "weight(kgs)": string;
    public "Prize money Career": string

    // Added field that will be added in the service because does not exist in IPA
    public id : string;

}

export default TennisPlayerModel;