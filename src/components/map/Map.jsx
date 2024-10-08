import MapImage from "../../assets/MapChart_Map.svg";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {ContentArtistas} from "../ContentArtistas/ContentArtistas.jsx";
import {ContentPais} from "../ContentPais/ContentPais.jsx";


function Map() {
    const [pais, setPais] = useState("");
    const location = useLocation();
    const data = location.state;
    console.log(data)

    useEffect(() => {
        const objectElement = document.querySelector('object');

        objectElement.addEventListener('load', () => {
            const svgDoc = objectElement.contentDocument;

            if (svgDoc) {
                const paths = svgDoc.querySelectorAll('path');
                let blue = 60;
                data.forEach(data =>{
                    let id = `${data.origem}_${data.país}`;
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
                        let artists = data.filter(e => e.país === country);
                        console.log(artists);
                        artists??=[];
                        //let message = local + artists.map(a => a.nome);
                        alert(local);
                    });
                });
            }
        });
    }, [data]);

    return (
        <>
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
                    {!pais && (<ContentArtistas data={data} setPais={setPais}/>)}
                    {pais && (<ContentPais data={data} pais={pais} setPais={setPais}/>)}
                </div>
            </div>
        </>
    );
}

export default Map;






