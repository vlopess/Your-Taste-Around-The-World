import MapImage from "../../assets/MapChart_Map.svg";
import $ from 'jquery';
import {useLocation} from "react-router-dom";


function Map() {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
        <>
            <object type="image/svg+xml" data={MapImage}>
                Seu navegador não suporta SVG.
            </object>
        </>
    );
}

export default Map;

$(function () {
    $(document).on('click', '.parent', function () {
        console.log("Teste");
        $(this).find('object').contents().find('svg').attr("class", "selected");
    })
});






