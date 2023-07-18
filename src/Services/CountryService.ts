import axios from "axios";
import countriesConfig from "../Utils/CountrysConfig";
import CountryModel from "../Models/CountryModel";
import { CountryActionType, CountryStore } from "../Redux/CountriesState";
import noFlag from "../Assets/Images/no-image.png"

class CountryService {

    async getAllCountries(): Promise<CountryModel[]> {

        let countries = CountryStore.getState().countries;

        if (countries.length === 0) {

            const response = await axios.get(countriesConfig.allCountries);
            countries = response.data;
            CountryStore.dispatch({ type: CountryActionType.FetchCountries, payload: countries });
        }

        return countries;

    }

    async getOneCountry(countryName: string): Promise<CountryModel> {

        console.log("cName", countryName);
        

        const countries = await this.getAllCountries()
        let country = countries.find(country => country.name.common.toLocaleLowerCase() === countryName.toLocaleLowerCase());
        console.log("conyrty", country);
        

        // if (!country) {

        //     // const response = await axios.get(countriesConfig.countryByNameUrl + countryName)
        //     // country = response.data[0];
        //     country = new CountryModel()
        //     country.flags.png = "Fd"


        // }
        return country;

    }


}

const countryService = new CountryService();

export default countryService;