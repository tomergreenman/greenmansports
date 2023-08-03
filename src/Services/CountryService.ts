import axios from "axios";
import countriesConfig from "../Utils/CountrysConfig";
import CountryModel from "../Models/CountryModel";
import { CountryActionType, CountryStore } from "../Redux/CountriesState";

class CountryService {

    async getAllCountries(): Promise<CountryModel[]> {
    
        //Get al countries from redux
        let countries = CountryStore.getState().countries;

        // if no countries than get from API
        if (countries.length === 0) {

            const response = await axios.get(countriesConfig.allCountries);
            countries = response.data;
        
            // send all countries to redux
            CountryStore.dispatch({ type: CountryActionType.FetchCountries, payload: countries });
        }

        return countries;

    }

    async getOneCountry(countryName: string): Promise<CountryModel> {

        const countries = await this.getAllCountries();
        let country = countries.find(country => country.name.common.toLocaleLowerCase() === countryName.toLocaleLowerCase());
        return country;

    }


}

const countryService = new CountryService();

export default countryService;