import "./Football.css"
import rashford from "../../../../Assets/Images/Rashford.png"
import { useEffect, useRef } from "react"
import observerFunction from "../../../../Utils/Observer"



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

        // divRef.current.style.backgroundColor = "green"

        if (divRef.current) {
            divRef.current.forEach(l => observer.observe(l));
            console.log(divRef.current);

        }
        // console.log(divRef);




    }, [])



    return (
        <div className="Football">

            <div className="WrapperDiv Rash">
                <img src={rashford} className="rashford Hidden" ref={pushRef} />
            </div>


            <div className="WrapperDiv">
                <div className="FootballInfo Hidden" ref={pushRef}>
                    <h1 className="FootballText" >Football is Amazing</h1>
                    <p>ffsfds fsdfsdfs fsdfsdf fsdfsdf fsdfsd fsdfsd fdsfsd fsdf fdsfsd fsdf fdsfsd fdsfsd <br />
                        dsfdsf fsd dfs dsf sd <br />
                        fds sdfdsfsdf fsdfsdf sdf sdfsdfsdf sdf sdfdsfsdfsdf
                    </p>

                </div>
            </div>

        </div>
    )
}


export default Football;