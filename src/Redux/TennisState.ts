import { createStore } from "redux";
import TennisPlayerModel from "../Models/TennisPlayerModel";
import TennisRankingModel from "../Models/TennisRankingModel";
import LiveTennisModel from "../Models/LiveTennisModel";

export class TennisState {
    public tennisRankings: TennisRankingModel[] = [];
    public tennisPlayers: TennisPlayerModel[] = [];
}

export enum TennisActionType {
    FetchRankings = "FetchRankings",
    AddTennisPlayer = "AddTennisPlayer",
}

export interface TennisAction {
    type: TennisActionType;
    payload: any;
}

export function TennisReducer(currentState = new TennisState(), action: TennisAction): TennisState {

    const newState = {...currentState}

    switch (action.type) {
        case TennisActionType.FetchRankings:
            newState.tennisRankings = action.payload;
            break;
         
        case TennisActionType.AddTennisPlayer:
            newState.tennisPlayers.push(action.payload)
            break;     
    }

    return newState;

}

export const TennisStore = createStore(TennisReducer);