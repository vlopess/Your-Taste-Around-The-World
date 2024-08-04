import {getJSON} from "jquery";
import {useNavigate} from "react-router-dom";
import Seacher from "../../service/Searcher.jsx";

function ButtonLastFm({username, loading,setLoading}){
    const navigate = useNavigate();
    const service  = new Seacher();

    async function loadDataFromLastFm() {
        setLoading((loading) => !loading);
        let list = [];
        if (username !== "") {
            let url = "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + username + "&api_key=53ca750ff08680650a1aa431bf02a97a&limit=10&format=json&callback=?&period=overall&limit=100";
            try {
                const artists = [];
                await getJSON(url, function (json) {
                    let topartists = json['topartists'];
                    topartists = topartists['artist'];
                    topartists.map(artist => {
                        artists.push({
                            name: artist.name,
                            playcount: artist.playcount
                        });
                    })
                });
                list = await service.fetchData(artists);
            } catch (e) {
                alert("Not Found");
            }
        }
        setLoading((loading) => !loading);
        navigate('/MapResult', { state : list });
    }
    return (
        <button onClick={loadDataFromLastFm} disabled={loading}>
            {loading && <i className='fa fa-spinner fa-pulse fa-lg fa-fw'></i>}
            {!loading && 'GO'}
        </button>
    );
}
export default ButtonLastFm