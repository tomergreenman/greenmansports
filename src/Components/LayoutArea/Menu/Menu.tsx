import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

import franceFlag from ".././../../Assets/Images/france-flag.png"
import ukFlag from ".././../../Assets/Images/uk-flag.png"
import spainFlag from ".././../../Assets/Images/spain-flag.png"
import italyFlag from ".././../../Assets/Images/italy-flag.png"
import germanyFlag from ".././../../Assets/Images/germany-flag.png"
import israelFlag from ".././../../Assets/Images/israel-flag.png"
import { LeaguesIdCodes } from "../../../Utils/LeguesIdCodes";

function Menu(): JSX.Element {

    const footballLi = useRef<any>();
    const tennisLi = useRef<any>();
    const footballUl = useRef<any>();
    const tennisUl = useRef<any>();

    //change styles when opening and closing menus  
    function closeDropdownMenu(ulRef: any, liRef: any) {

        ulRef.current.style.visibility = 'hidden';
        ulRef.current.style.opacity = '0';
        ulRef.current.style.top = '54px'
        liRef.current.style.backgroundColor = '#122331'
    }

    function openDropdownMenu(ulRef: any, liRef: any) {

        ulRef.current.style.visibility = 'visible';
        ulRef.current.style.opacity = '1';
        ulRef.current.style.top = '34px'
        liRef.current.style.backgroundColor = 'rgb(21, 107, 94)'

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
    }

    const [englandDropdownStyle, setEnglandDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [spainDropdownStyle, setSpainDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [italyDropdownStyle, setItalyDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [franceDropdownStyle, setFranceDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [germanyDropdownStyle, setGermanyDropdownStyle] = useState<{}>(closedSubMenuStyle)
    const [israelDropdownStyle, setIsraelDropdownStyle] = useState<{}>(closedSubMenuStyle)


    const countrySetStyleMap = new Map<string, any>();
    countrySetStyleMap.set("England", setEnglandDropdownStyle)
    countrySetStyleMap.set("Spain", setSpainDropdownStyle)
    countrySetStyleMap.set("Italy", setItalyDropdownStyle)
    countrySetStyleMap.set("France", setFranceDropdownStyle)
    countrySetStyleMap.set("Germany", setGermanyDropdownStyle)
    countrySetStyleMap.set("Israel", setIsraelDropdownStyle)



    function closeSubDropdownMenu(country: string) {

        const countryToChangeStyle = countrySetStyleMap.get(country);
        countryToChangeStyle(closedSubMenuStyle)
    }

    function openSubDropdownMenu(country: string) {

        const countryToChangeStyle = countrySetStyleMap.get(country);
        countryToChangeStyle(openSubMenuStyle)
    }

    return (

        <nav className="Menu">

            <ul className="menu-items">
                <li className="MainLi">
                    <NavLink to="/greenmansports" className="menu-item">Home</NavLink>
                </li>

                {/* Football */}
                <li className="FootballLi" ref={footballLi}
                    onMouseEnter={() => openDropdownMenu(footballUl, footballLi)}
                    onMouseLeave={() => closeDropdownMenu(footballUl, footballLi)}
                >
                    <a href="#" className="menu-item"
                    // onClick={openDropdownMenu}
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.EnglishPremierLeague}
                                        onClick={() => {
                                            // closeDropdownMenu()
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("England")
                                        }}>
                                        Premier League</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.EnglandChampionShip}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("England")
                                        }}>
                                        Championship</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.WomensSuperLeague}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.LaLiga}
                                        onClick={() => {
                                            // closeDropdownMenu()

                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Spain")
                                        }}
                                    > LaLiga</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.PrimeraDivisionFemenina}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.SerieA}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Italy")
                                        }}
                                    > Serie A</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.SerieAFemminile}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Italy")
                                        }}
                                    >Seria A Femminile</NavLink>
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.LeagueOne}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("France")
                                        }}
                                    > League One</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.Division1Féminine}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("France")
                                        }}
                                    >Division 1 Féminine</NavLink>
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.Bundesliga}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Germany")
                                        }}
                                    > Bundesliga</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.BundesligaWomen}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Germany")
                                        }}
                                    >Bundesliga Women</NavLink>
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
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.IsraelPremierLeague}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Israel")
                                        }}
                                    > Israel Premier League</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"greenmansports/leagues/" + LeaguesIdCodes.IsraelPremierLeagueWomen}
                                        onClick={() => {
                                            closeDropdownMenu(footballUl, footballLi)
                                            closeSubDropdownMenu("Israel")
                                        }}
                                    >Israel Premier League Women</NavLink>
                                </li>
                            </ul>
                        </li>



                    </ul>
                </li>


                {/* Tennis */}
                <li className="MainLi TennisLi" ref={tennisLi}
                    onMouseLeave={() => closeDropdownMenu(tennisUl, tennisLi)}
                >
                    <NavLink to={"#"}
                        onMouseEnter={() => openDropdownMenu(tennisUl, tennisLi)}>Tennis</NavLink>
                    <ul className="TennisDropDown" ref={tennisUl}>
                        <li>
                            <NavLink className="menu-item" to={"greenmansports/tennis-rankings"}
                                onClick={() => closeDropdownMenu(tennisUl, tennisLi)}>Player Rankings</NavLink>
                        </li>
                        <li>
                            <NavLink className="menu-item" to={"greenmansports/tennis-liveScores"}
                                onClick={() => closeDropdownMenu(tennisUl, tennisLi)}>Live Scores</NavLink>
                        </li>
                    </ul>
                </li>

                <li className="MainLi">
                    <NavLink to={"greenmansports/golf"} >Golf</NavLink>
                </li>


            </ul>

        </nav>


    );
}

export default Menu;







