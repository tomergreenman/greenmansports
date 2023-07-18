import "./Tennis.css"
import federer from "../../../../Assets/Images/Federer.png"
import { useEffect, useRef } from "react";
import observerFunction from "../../../../Utils/Observer";
import info from "../../../../Assets/Images/info2.png"
import stats from "../../../../Assets/Images/stats.png"
import atp from "../../../../Assets/Images/atp.png"
import live from "../../../../Assets/Images/Live.png"
import money from "../../../../Assets/Images/money.png"
import tennisRacket from "../../../../Assets/Images/tennis-racket.png"


function Tennis(): JSX.Element {

    const divRef = useRef<any[]>([])

    const pushRef = (el: any) => divRef.current.push(el!) // using ! if you get an error 'object is possibly null'
    const observer = observerFunction;


    useEffect(() => {


        if (divRef.current) {
            divRef.current.forEach(el => observer.observe(el));

        }




    }, [])





    return (
        <div className="Tennis">

            {/* <div className="WrapperDiv">
                <div className="TennisInfo Hidden" ref={pushRef}>
                    <h1 className="TennisText" >The World of Tennis</h1>
                    <p>ffsfds fsdfsdfs fsdfsdf fsdfsdf fsdfsd fsdfsd fdsfsd fsdf fdsfsd fsdf fdsfsd fdsfsd <br />
                        dsfdsf fsd dfs dsf sd <br />
                        fds sdfdsfsdf fsdfsdf sdf sdfsdfsdf sdf sdfdsfsdfsdf
                    </p>

                </div>
            </div>

            <div className="WrapperDiv ">
                <img src={federer} className="federer Hidden" ref={pushRef} />
            </div> */}






            <div className="TennisInfoWrapperDiv">
                {/* <h1>Tennis</h1> */}

                <div className="TennisCards">
                    <div className="TennisCard Hidden" ref={pushRef}>
                        <span>Atp Players Rankings</span>
                        <img className="CardImage" src={atp} />

                    </div>

                    <div className="TennisCard Hidden" ref={pushRef}>
                        <span>Live Mach Statistics</span>
                        <img className="CardImage" src={stats} />

                    </div>

                    <div className="TennisCard Hidden" ref={pushRef}>
                        <span>Players Info</span>

                        <img className="CardImage" src={info} />
                    </div>

                    <div className="TennisCard Hidden" ref={pushRef}>
                        <span>Live Matches Scores</span>

                        <img className="CardImage" src={live} />
                    </div>

                    <div className="TennisCard Hidden" ref={pushRef}>
                        <span>Betting odds</span>

                        <img className="CardImage" src={money} />
                    </div>
                </div>
            </div>

            <div className="FedererWrapper">
                    <h1>Tennis</h1>
                    <img src={tennisRacket} />
                <div>

                    {/* <img src={federer} className="Federer Hidden" ref={pushRef} /> */}

                </div>
            </div>





        </div>
    )
}

export default Tennis;