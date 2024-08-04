import globeLogo from "../../assets/globe.png";
import { useState} from "react";
import ButtonSpotify from "../ButtonSpotify/ButtonSpotify.jsx";
import ButtonLastFm from "../ButtonLastFm/ButtonLastFm.jsx";

function Start(){
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="container-login">
            <img src={globeLogo} className="logo" alt="React logo"/>
            <h2>Your Taste Around The World</h2>
            <div className="card">
                <input type="text" value={username} placeholder={"Enter Username LastFm"}
                       onChange={(e) => setUserName(e.target.value)}/>
                <ButtonLastFm setLoading={setLoading} loading={loading} username={username}/>
            </div>
            <div className="sectionSpotify">
                <div className="divider">Or</div>
                <ButtonSpotify setLoading={setLoading}/>
            </div>
            <a href=""><i className="fa fa-github"></i></a>
        </div>
    );

}

export default Start