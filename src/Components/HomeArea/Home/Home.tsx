import "./Home.css";
import Football from "../Sports Area/Football/Football";
import Tennis from "../Sports Area/Tennis/Tennis";
import Welcome from "../Welcome/Welcome";
import Golf from "../Golf/Golf";


function Home(): JSX.Element {

    return (
        <div className="Home">

            <section className="About">
                <Welcome />
            </section>

            <section className="FootballSection">
                <Football />
            </section>


            <section className="TennisSection">
                <Tennis />
            </section>

            <section>
                <Golf />
            </section>

        </div>

    );
}

export default Home;
