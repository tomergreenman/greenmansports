import "./Tennis.css"
import federer from "../../../../Assets/Images/Federer.png"
import { useEffect, useRef } from "react";
import observerFunction from "../../../../Utils/Observer";

function Tennis(): JSX.Element {

    const divRef = useRef<any[]>([])

    const pushRef = (el: any) => divRef.current.push(el!) // using ! if you get an error 'object is possibly null'
    const observer = observerFunction;


    useEffect(() => {


        if (divRef.current) {
            divRef.current.forEach(el => observer.observe(el));

        }




    }, [divRef])





    return (
        <div className="Tennis">

            <div className="WrapperDiv">
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
            </div>




        </div>
    )
}

export default Tennis;