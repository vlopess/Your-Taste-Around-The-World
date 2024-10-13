import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ajaxSetup, getJSON} from "jquery";
import Seacher from "../../service/Searcher.jsx";

function ButtonSpotify({ setLoading}){
    const navigate = useNavigate();
    const CLIENT_ID = "007b8c32445c42e5b4c1d7523691fedb";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URI = "https://vlopess.github.io/Your-Taste-Around-The-World/";
    const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50";
    const SCOPE = "user-top-read";
    const URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?response_type=token&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;
    const service  = new Seacher();


    const getAcessToken = async (hash) => {
        setLoading(true);
        const subString = hash.substring(1);
        const params = subString.split("&");
        const credentials = {};

        params.forEach(param => {
            const [key, value] = param.split("=");
            credentials[key] = value;
        });

        localStorage.clear();
        localStorage.setItem("acessToken", credentials["access_token"]);
        localStorage.setItem("tokenType", credentials["token_type"]);
        ajaxSetup({
            headers : {
                'Authorization' : 'Bearer ' + credentials["access_token"],
            }
        });
        const artists = [];
        try {
            await getJSON(TOP_ARTISTS_ENDPOINT, function (json) {
                const items = json['items'];
                items.map((item) => {
                    artists.push({
                        name : `${item.name} (${item?.genres[0]})`,
                        image_url : item.images[0]?.url
                    });
                });
            });
        }catch (e) {
            setLoading(false);
        }
        const list = await service.fetchData(artists);
        navigate('/Your-Taste-Around-The-World/MapResult', { state : list });
    }

    useEffect(() => {
        if(window.location.hash) getAcessToken(window.location.hash).then(r => []);
    },[getAcessToken, navigate]);


    async function loadDataFromSpotify() {
        window.location = URL;
    }

    return (
        <button onClick={loadDataFromSpotify} className="buttonSpotify"><i className='fab fa-spotify'></i> Login with Spotify</button>
    );
}
export default ButtonSpotify