import "./Football.css"
import rashford from "../../../../Assets/Images/Rashford.png"
import { useEffect, useRef } from "react"
import observerFunction from "../../../../Utils/Observer"
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import rankingsImage from "../../../../Assets/Images/ranknigs-image.png"
import girlPower from "../../../../Assets/Images/women-power.png"
import info from "../../../../Assets/Images/info.png"
import football from "../../../../Assets/Images/football.jpeg"



function Football(): JSX.Element {


    const divRef = useRef<any[]>([])

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //         console.log(entry);
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('Show');
    //         } else {
    //             entry.target.classList.remove('Show')
    //         }
    //     })
    // });

    const pushRef = (el: any) => divRef.current.push(el!) // using ! if you get an error 'object is possibly null'
    const observer = observerFunction;


    useEffect(() => {


        if (divRef.current) {
            divRef.current.forEach(l => observer.observe(l));
            console.log(divRef.current);

        }

    }, [])



    return (
        <div className="Football">

            <div className="RashfordWrapper">

                <div className="Rash">
                    <h1>Football</h1>

                    {/* <img src={rashford} className="rashford Hidden" ref={pushRef} /> */}
                </div>
                <img src={football} />

            </div>



            <div className="CardsWrapper">
                {/* <h1>Football</h1> */}

                <div className="FootballCards">
                    <div className="FootballCard Hidden" ref={pushRef}>
                        <span>Tables of the leading leagues in the world</span>
                        {/* <FormatListNumberedIcon  /> */}
                        <img className="CardImage" src={rankingsImage} />

                    </div>

                    <div className="FootballCard Hidden" ref={pushRef}>
                        <span>Women Leagues Included!</span>
                        {/* <FormatListNumberedIcon  /> */}
                        <img className="CardImage" src={girlPower} />

                    </div>

                    <div className="FootballCard Hidden" ref={pushRef}>
                        <span>Teams and Players Info</span>
                        {/* <FormatListNumberedIcon  /> */}
                        <img className="CardImage" src={info} />

                    </div>
                </div>
            </div>

        </div>
    )
}


export default Football;