import MapImage from "../../assets/MapChart_Map.svg";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ContentArtistas} from "../ContentArtistas/ContentArtistas.jsx";
import {ContentPais} from "../ContentPais/ContentPais.jsx";
import { ToastContainer, Zoom, toast } from "react-toastify";


function Map() {
    const navigate = useNavigate();
    const [artirta, setArtista] = useState();
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
                let blue = 60;
                data.forEach(data =>{
                    let id = `${data.origem}_${data.sigla}`;
                    let element = svgDoc.getElementById(id);
                    if(element) {
                        console.log(id);
                        element.style.setProperty("fill", `rgb(37, 60, ${blue})`, "important");
                        blue = blue + 5;
                    }
                });
                paths.forEach(path => {
                    path.addEventListener('click', (event) => {
                        let local = event.target.id;
                        let country = local.split("_");
                        country = country[country.length - 1];
                        let artists = data.filter(e => e.sigla === country);
                        console.log(artists);
                        artists??=[];
                        //local = local[local.length - ]
                        // toast(local, {
                        //     position: "top-center",
                        //     autoClose: 2000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        //     theme: "dark",
                        //     transition: Zoom,
                        // });
                    });
                });
            }
        });
    }, [data]);

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
                    {!artirta && (<ContentArtistas data={data} setArtista={setArtista}/>)}
                    {artirta && (<ContentPais data={data} setArtista={setArtista} artista={artirta}/>)}
                </div>
            </div>
        </>
    );
}

export default Map;






