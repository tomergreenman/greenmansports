import { createStore } from "redux";
import StandingsModel from "../Models/StandingsModel";
import TeamModel from "../Models/TeamModel";
import PlayerModel from "../Models/PlayerModel";
import ManagerModel from "../Models/ManagerModel";

export class FootballState {
    public standings: StandingsModel[][] = []; // will contain all standings that were retrieved by API 
    public teams: TeamModel[] = [];
    public players: PlayerModel[][] = []; // will contain all teams players that were retrieved by API
    public managers: ManagerModel[] = [];
}

export enum FootballActionType {
    AddStanding = "AddStanding",
    AddTeam = "AddTeam",
    AddPlayers = "AddPlayers",
    AddManager = "AddManager",
}

export interface FootballAction {
    type: FootballActionType;
    payload: any;
}

export function FootballReducer(currentState = new FootballState(), action: FootballAction): FootballState {
    const newState = { ...currentState }

    switch (action.type) {

        case FootballActionType.AddStanding:
            newState.standings.push(action.payload);
            break;

        case FootballActionType.AddTeam:
            newState.teams.push(action.payload);
            break;

        case FootballActionType.AddPlayers:
            newState.players.push(action.payload);
            break;

        case FootballActionType.AddManager:
            newState.managers.push(action.payload);
            break;
    }

    return newState;
}

export const FootballStore = createStore(FootballReducer);