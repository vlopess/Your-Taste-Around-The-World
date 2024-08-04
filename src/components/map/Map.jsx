import MapImage from "../../assets/world.svg";
import $ from 'jquery';
import {useLocation} from "react-router-dom";


function Map() {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
        <>
            <img src={MapImage} alt={'Logo'}/>
        </>
    );
}
export default Map;

$(function() {
    $(document).on('click', '.parent', function () {
        console.log("Teste");
        $(this).find('object').contents().find('svg').attr("class", "selected");
    })
});






