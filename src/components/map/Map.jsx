import MapImage from "../../assets/MapChart_Map.svg";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ContentArtistas} from "../ContentArtistas/ContentArtistas.jsx";
import {ContentPais} from "../ContentPais/ContentPais.jsx";
import { ToastContainer, Zoom, toast } from "react-toastify";
import {ContentRegiao} from "../ContentRegiao/ContentRegiao.jsx";


function Map() {
    const navigate = useNavigate();
    const [artista, setArtista] = useState();
    const [regiao, setRegiao] = useState("");
    const location = useLocation();
    const data = location.state;
    console.log(data)

    useEffect(() => {
        if(data == null){
            toast.error('Erro ao buscar os dados! Tente Novamente.', {
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
            navigate('/');
        }

        const objectElement = document.querySelector('object');

        objectElement.addEventListener('load', () => {
            const svgDoc = objectElement.contentDocument;

            if (svgDoc) {
                const paths = svgDoc.querySelectorAll('path');
                data.forEach(data => {
                    let blue = Math.floor(Math.random() * 100) + 1;
                    let id = `${data.origem}_${data.sigla}`;
                    console.log(`${id}`);
                    let element = svgDoc.getElementById(id);
                    if(element) {
                        element.style.setProperty("fill", `rgb(15, 30, ${blue})`, "important");
                    }
                });
                paths.forEach(path => {
                    path.addEventListener('click', (event) => {
                        let localID = event.target.id; //Bahia_BRA
                        let local = localID.substring(0, localID.length - 3).replaceAll("_", " ").replaceAll("-", " ").trimEnd();
                        let country = localID.substring(localID.length - 3).replaceAll("_", "");
                        local = `${local} (${country})`;
                        setRegiao(local);
                        setArtista(undefined);
                    });
                });
            }
        });
    }, [data, navigate]);

    return (
        <>
            <ToastContainer />
            <div
                style={{
                    overflow: "auto"
                }}
            >
                <object
                    data={MapImage}
                    type="image/svg+xml"
                    style={{width: "100vw", height: "100vh"}}
                    aria-label="Mapa"
                />
                <div
                    style={{
                        backgroundColor: "#4088D1FF",
                        position: "absolute",
                        height: "500px",
                        width: "20%",
                        borderRadius: "0 15px",
                        left: 0,
                        bottom: 0
                    }}
                >
                    {!artista && !regiao && (<ContentArtistas data={data} setArtista={setArtista}/>)}
                    {artista && !regiao &&(<ContentPais data={data} setArtista={setArtista} artista={artista}/>)}
                    {regiao && !artista &&(<ContentRegiao nome={regiao} data={data} setRegiao={setRegiao}/>)}
                </div>
            </div>
        </>
    );
}

export default Map;






