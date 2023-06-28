import { createStore } from "redux";
import CountryModel from "../Models/CountryModel";

export class CountriesState {
    public countries: CountryModel[] = [];
}

export enum CountryActionType {
    FetchCountries = "FetchCountries",
    FetchCountryFlag = "FetchCountryFlag"
}

export interface CountryAction {
    type: CountryActionType;
    payload: CountryModel[];
}

export function CountryReducer(currentState = new CountriesState(), action: CountryAction): CountriesState {
    const newState = { ...currentState }

    switch (action.type) {
        case CountryActionType.FetchCountries:
            newState.countries = action.payload;
            break;

        // case CountryActionType.FetchCountryFlag
        //     newState.vacations.push(action.payload);
        //     newState.vacations.sort((vacation1, vacation2) => new Date(vacation2.startDate).getTime() - new Date(vacation1.startDate).getTime());
        //     break;

        
    }

    return newState;
}

export const CountryStore = createStore(CountryReducer);