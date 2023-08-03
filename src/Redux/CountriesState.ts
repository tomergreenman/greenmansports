import { createStore } from "redux";
import CountryModel from "../Models/CountryModel";

export class CountriesState {
    public countries: CountryModel[] = [];
}

export enum CountryActionType {
    FetchCountries = "FetchCountries",
}

export interface CountryAction {
    type: CountryActionType;
    payload: CountryModel[];
}

export function CountryReducer(currentState = new CountriesState(), action: CountryAction): CountriesState {
    const newState = { ...currentState }

    // using switch in case i add future actions
    switch (action.type) {
        case CountryActionType.FetchCountries:
            newState.countries = action.payload;
            break;
    }

    return newState;
}

export const CountryStore = createStore(CountryReducer);