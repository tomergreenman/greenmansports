import PersonModel from "./PersonModel";

class PlayerModel extends PersonModel {
    public date_birth_at: string;
    public age: number;
    public shirt_number: number;
    public height: number;
    public weight: number;
    public position_name: string;
    public preferred_foot: string;
    


}

export default PlayerModel;