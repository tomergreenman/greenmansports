class StandingsModel {

    public position: number;
    public team: {
        id: number;
        manager_id: number;
        venue_id: number;
        name: string;
        logo: string;

    };

    public fields: {
        matches_total: string;
        wins_total: string;
        draws_total: string;
        losses_total: string;
        points_total: string;
        goals_total: string;
    };

    public goalsFor: number;
    public goalsAgainst: number;
    public goalsDifference: number;



    public constructor(standings: StandingsModel) {
        this.position = standings.position;
        this.team = {
            id: standings.team.id,
            manager_id: standings.team.manager_id,
            venue_id: standings.team.venue_id,
            name: standings.team.name,
            logo: standings.team.logo
        };

        this.fields = {
            matches_total: standings.fields.matches_total,
            wins_total: standings.fields.wins_total,
            draws_total: standings.fields.draws_total,
            losses_total: standings.fields.losses_total,
            points_total: standings.fields.points_total,
            goals_total: standings.fields.goals_total,

        };

        this.goalsFor = +this.fields.goals_total.substring(0, this.fields.goals_total.indexOf(":"));
        this.goalsAgainst = +this.fields.goals_total.substring(this.fields.goals_total.indexOf(":") + 1);
        this.goalsDifference = +this.goalsFor - +this.goalsAgainst

    };
};



export default StandingsModel;