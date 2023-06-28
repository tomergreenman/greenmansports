import { DOMElement, Dispatch, ReactElement, ReactNode, Ref, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import "./Menu.css";

// MUI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MuiMenu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeckIcon from '@mui/icons-material/Deck';
import MenuItemModel from "../../../Models/MenuItemModel";




import React from "react";
import franceFlag from ".././../../Assets/Images/france-flag.png"
import ukFlag from ".././../../Assets/Images/uk-flag.png"
import spainFlag from ".././../../Assets/Images/spain-flag.png"
import italyFlag from ".././../../Assets/Images/italy-flag.png"
import germanyFlag from ".././../../Assets/Images/germany-flag.png"
import israelFlag from ".././../../Assets/Images/israel-flag.png"
import { fontSize, margin } from "@mui/system";
import { LeaguesIdCodes } from "../../../Utils/SeasonsIdCodes";




function Menu(): JSX.Element {



    const closedMenuStyle = {
        visibility: 'hidden',
        opacity: '0',
        top: '54px',
    }

    const openMenuStyle = {

        visibility: 'visible',
        opacity: '1',
        top: '34.5px'
    }

    const sportsLi = useRef<any>();

    const footballUl = useRef<any>();
    const tennisUl = useRef<any>();

    const ulMap = new Map<string, any>();
    ulMap.set("football", footballUl);
    ulMap.set("tennis", tennisUl);


    function closeDropdownMenu() {

        setDropdownStyle(closedMenuStyle)
        sportsLi.current.style.backgroundColor = '#122331'



    }

    function openDropdownMenu() {

        setDropdownStyle(openMenuStyle)
        sportsLi.current.style.backgroundColor = '#ff652f'
    }

    function closeDropdownMenu2(ref: any) {
        // const ref = ulMap.get(ul)
        ref.current.style.visibility = 'hidden';
        ref.current.style.opacity = 0;
        ref.current.style.top = '54px'
        
        
        
    }
    
    function openDropdownMenu2(ref: any) {
        
        // const ref = ulMap.get(ul)
        ref.current.style.visibility = 'visible';
        ref.current.style.opacity = 1;
        ref.current.style.top = '34px'
    }

    const closedSubMenuStyle = {
        visibility: 'hidden',
        opacity: '0',
        top: '0px',
        left: '126px',
    }

    const openSubMenuStyle = {

        visibility: 'visible',
        opacity: '1',
        top: '0px',
        left: '116.5px'
    }


    // function setSubMenuToOpenFunction (country:string) {
    //     setSubMenuToOpen(country)

    // }

    const [dropdownStyle, setDropdownStyle] = useState<{}>(closedMenuStyle)
    const [TennisDropdownStyle, setTennisDropdownStyle] = useState<{}>(openMenuStyle)
    const [subDropdownStyle, setSubDropdownStyle] = useState<{}>(closedSubMenuStyle)
    // const [subMenuToOpen, setSubMenuToOpen] = useState<string>("")
    const [englandDropdownStyle, setEnglandDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [spainDropdownStyle, setSpainDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [italyDropdownStyle, setItalyDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [franceDropdownStyle, setFranceDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [germanyDropdownStyle, setGermanyDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [israelDropdownStyle, setIsraelDropdownStyle] = useState<{}>(closedSubMenuStyle)


    // const countrySetStyleMapObject = {
    //     "England" : setEnglandDropdownStyle,
    //     "Spain" : setSpainDropdownStyle,
    //     "Italy" : setItalyDropdownStyle,
    //     "France" : setFranceDropdownStyle,
    //     "Germany" : setGermanyDropdownStyle
    // }
    // const countrySetStyleMap2 = new Map<string, any>(Object.entries(countrySetStyleMapObject));


    const countrySetStyleMap = new Map<string, any>();
    countrySetStyleMap.set("England", setEnglandDropdownStyle)
    countrySetStyleMap.set("Spain", setSpainDropdownStyle)
    countrySetStyleMap.set("Italy", setItalyDropdownStyle)
    countrySetStyleMap.set("France", setFranceDropdownStyle)
    countrySetStyleMap.set("Germany", setGermanyDropdownStyle)
    countrySetStyleMap.set("Israel", setIsraelDropdownStyle)





    function closeSubDropdownMenu(country: string) {

        // switch (country) {
        //     case "England":
        //         setEnglandDropdownStyle(closedSubMenuStyle);
        //         break;
        //     case "Spain":
        //         setSpainDropdownStyle(closedSubMenuStyle);
        //         break;
        //     case "Italy":
        //         setItalyDropdownStyle(closedSubMenuStyle);
        //         break;
        //     case "France":
        //         setFranceDropdownStyle(closedSubMenuStyle);
        //         break;
        //     case "Germany":
        //         setGermanyDropdownStyle(closedSubMenuStyle);
        //         break;

        // }

        const countryToChangeStyle = countrySetStyleMap.get(country);
        countryToChangeStyle(closedSubMenuStyle)

        // const x = countrySetStyleMap2.get(country)
        // x(closedSubMenuStyle)



    }


    function openSubDropdownMenu(country: string) {

        // switch (country) {
        //     case "England":
        //         setEnglandDropdownStyle(openSubMenuStyle);
        //         break;
        //     case "Spain":
        //         setSpainDropdownStyle(openSubMenuStyle);
        //         break;
        //     case "Italy":
        //         setItalyDropdownStyle(openSubMenuStyle);
        //         break;
        //     case "France":
        //         setFranceDropdownStyle(openSubMenuStyle);
        //         break;
        //     case "Germany":
        //         setGermanyDropdownStyle(openSubMenuStyle);
        //         break;
        // }

        // setSubMenuToOpen(country)
        // setSubDropdownStyle(openSubMenuStyle)
        // sportsLi.current.style.backgroundColor = '#ff652f'

        const countryToChangeStyle = countrySetStyleMap.get(country);
        countryToChangeStyle(openSubMenuStyle)

        // const x = countrySetStyleMap2.get(country)
        // x(openSubMenuStyle)

    }









    return (

        <nav className="Menu">

            <ul className="menu-items">
                <li className="MainLi">
                    <NavLink to="/home" className="menu-item">Home</NavLink>
                </li>

                {/* Football */}
                <li className="FootballLi" ref={sportsLi}
                    onMouseEnter={() => openDropdownMenu2(footballUl)}
                    onMouseLeave={() => closeDropdownMenu2(footballUl)}
                >
                    <a href="#" className="menu-item"
                        onClick={openDropdownMenu}
                    >Football</a>

                    <ul className="FootballDropdownMenu" ref={footballUl} >

                        {/* England */}
                        <li className="CountryLi"
                            onMouseEnter={() => {
                                openSubDropdownMenu("England")
                            }}
                            onMouseLeave={() => closeSubDropdownMenu("England")}>
                            <a href="#" className="menu-item"> <img src={ukFlag} className="Icons" /> England</a>

                            <ul className="SubDropDownMenu" style={englandDropdownStyle} >
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.EnglishPremierLeague}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("England")
                                        }}>
                                        Premier League</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.EnglandChampionShip}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("England")
                                        }}>
                                        Championship</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.WomensSuperLeague}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("England")
                                        }}>
                                        Women's Super League</NavLink>
                                </li>
                            </ul>


                        </li>

                        {/* Spain */}
                        <li className="CountryLi"
                            onMouseEnter={() => openSubDropdownMenu("Spain")}
                            onMouseLeave={() => closeSubDropdownMenu("Spain")}>
                            <a href="#" className="menu-item"> <img src={spainFlag} className="Icons" />  Spain</a>

                            <ul className="SubDropDownMenu" style={spainDropdownStyle}>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.LaLiga}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Spain")
                                        }}
                                    > LaLiga</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.PrimeraDivisionFemenina}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Spain")
                                        }}
                                    >Primera Division Femenina</NavLink>
                                </li>
                            </ul>
                        </li>

                        {/*Italy  */}
                        <li className="CountryLi"
                            onMouseEnter={() => openSubDropdownMenu("Italy")}
                            onMouseLeave={() => closeSubDropdownMenu("Italy")}>
                            <a href="#" className="menu-item"> <img src={italyFlag} className="Icons" /> Italy</a>

                            <ul className="SubDropDownMenu" style={italyDropdownStyle}>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.SerieA}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Italy")
                                        }}
                                    > Serie A</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/home"}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Italy")
                                        }}
                                    >Italy2</NavLink>
                                </li>
                            </ul>
                        </li>

                        {/*France  */}
                        <li className="CountryLi"
                            onMouseEnter={() => openSubDropdownMenu("France")}
                            onMouseLeave={() => closeSubDropdownMenu("France")}>
                            <a href="#" className="menu-item"> <img src={franceFlag} className="Icons" /> France</a>

                            <ul className="SubDropDownMenu" style={franceDropdownStyle}>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.LeagueOne}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("France")
                                        }}
                                    > League One</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/home"}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("France")
                                        }}
                                    >France2</NavLink>
                                </li>
                            </ul>
                        </li>

                        {/*Germany */}
                        <li className="CountryLi"
                            onMouseEnter={() => openSubDropdownMenu("Germany")}
                            onMouseLeave={() => closeSubDropdownMenu("Germany")}>
                            <a href="#" className="menu-item"> <img src={germanyFlag} className="Icons" /> Germany</a>

                            <ul className="SubDropDownMenu" style={germanyDropdownStyle}>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.Bundesliga}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Germany")
                                        }}
                                    > Bundesliga</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/home"}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Germany")
                                        }}
                                    >Germany2</NavLink>
                                </li>
                            </ul>
                        </li>

                        {/*Israel */}
                        <li className="CountryLi"
                            onMouseEnter={() => openSubDropdownMenu("Israel")}
                            onMouseLeave={() => closeSubDropdownMenu("Israel")}>
                            <a href="#" className="menu-item"> <img src={israelFlag} className="Icons" /> Israel</a>

                            <ul className="SubDropDownMenu" style={israelDropdownStyle}>
                                <li>
                                    <NavLink to={"/leagues/" + LeaguesIdCodes.IsraelPremierLeague}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Israel")
                                        }}
                                    > Israel Premier League</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/home"}
                                        onClick={() => {
                                            closeDropdownMenu()
                                            closeSubDropdownMenu("Israel")
                                        }}
                                    >Israel2</NavLink>
                                </li>
                            </ul>
                        </li>



                    </ul>
                </li>

                <li className="MainLi TennisLi"
                    onMouseEnter={() => openDropdownMenu2(tennisUl)}
                    onMouseLeave={() => closeDropdownMenu2(tennisUl)}>
                    <NavLink to={""} >Tennis</NavLink>
                    <ul className="TennisDropDown" ref={tennisUl}>
                        <li>
                            <NavLink className="menu-item" to={"/tennis-rankings"}>Player Rankings</NavLink>
                        </li>
                        <li>
                            <NavLink className="menu-item" to={"/tennis-liveScores"}>Live Scores</NavLink>
                        </li>
                    </ul>
                </li>

                <li className="MainLi">
                    <NavLink to={""} >Golf</NavLink>
                </li>


            </ul>

        </nav>



    );
}

export default Menu;







