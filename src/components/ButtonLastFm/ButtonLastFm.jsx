import {getJSON} from "jquery";
import {useNavigate} from "react-router-dom";
import Seacher from "../../service/Searcher.jsx";
import { Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styleToastError } from "../../../styles.js";

function ButtonLastFm({username, loading,setLoading}){
    const navigate = useNavigate();
    const service  = new Seacher();

    async function loadDataFromLastFm() {
        setLoading((loading) => !loading);
        let list = [];
        if (username !== "") {
            let url = "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + username + "&api_key=53ca750ff08680650a1aa431bf02a97a&limit=10&format=json&callback=?&period=overall&limit=150";
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
                navigate('/Your-Taste-Around-The-World/MapResult', { state : list });
            } catch (e) {
                toast.error('Usuário não encontrado!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Zoom,
                });
            }
        }else{
            toast.warn('Digite o username!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
        }
        setLoading((loading) => !loading);
    }
    return (
        <button onClick={loadDataFromLastFm} disabled={loading}>
            {loading && <i className='fa fa-spinner fa-pulse fa-lg fa-fw'></i>}
            {!loading && 'GO'}
        </button>
    );
}
export default ButtonLastFm