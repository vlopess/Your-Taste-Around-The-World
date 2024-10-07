import MapImage from "../../assets/MapChart_Map.svg";
import $ from 'jquery';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";


function Map() {
    const location = useLocation();
    const data = location.state;
    console.log(data);

    useEffect(() => {
        const objectElement = document.querySelector('object');

        objectElement.addEventListener('load', () => {
            const svgDoc = objectElement.contentDocument;

            if (svgDoc) {
                const paths = svgDoc.querySelectorAll('path');
                data.forEach(data =>{
                    let id = `${data.origem}_${data.país}`;
                    let element = svgDoc.getElementById(id);
                    if(element) element.style.setProperty("fill", "rgb(37, 60, 60)", "important");
                    // $(id).css("fill", "rgb(37, 41, 60) !important;");
                });
                paths.forEach(path => {
                    path.addEventListener('click', (event) => {
                        let local = event.target.id;
                        let country = local.split("_");
                        country = country[country.length - 1];
                        let artists = data.filter(e => e.país === country);
                        console.log(artists);
                        artists??=[];
                        let message = local + artists.map(a => a.nome);
                        alert(message);
                    });
                });
            }
        });
    }, []);

    return (
        <>
            <object
                data={MapImage}
                type="image/svg+xml"
                style={{width: "100vw", height: "100vh"}}
                aria-label="Mapa"
            />
        </>
    );
}

export default Map;






