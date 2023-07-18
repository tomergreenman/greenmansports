import "./Welcome.css";

function Welcome(): JSX.Element {
    return (
        <div className="Welcome">
            <div className="TextWrapper">
                <h1>The <span className="Greenman">Greenman</span> Sport's World</h1>
                <p>Welcome to the place where you'll find all the sport's data you need </ p>
                <p> <span className="Greenman">Greenman </span>Sport's World uses a variety of API's in order to get the most up to date data of the most popular sports and top leagues</p>

            </div>

        </div>
    );
}

export default Welcome;
