import { createStore } from "redux";
import TennisPlayerModel from "../Models/TennisPlayerModel";
import TennisRankingModel from "../Models/TennisRankingModel";
import LiveTennisModel from "../Models/LiveTennisModel";

export class TennisState {
    public tennisRankings: TennisRankingModel[] = [];
    public tennisPlayers: TennisPlayerModel[] = [];
    public liveScores : LiveTennisModel[] = [];

}

export enum TennisActionType {
    FetchRankings = "FetchRankings",
    AddTennisPlayer = "AddTennisPlayer",
    FetchLiveScores = "FetchLiveScores"
}

export interface TennisAction {
    type: TennisActionType;
    payload: any 
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
        case TennisActionType.FetchLiveScores:
            newState.liveScores = action.payload;
            break     
    }

    return newState;

}

export const TennisStore = createStore(TennisReducer);