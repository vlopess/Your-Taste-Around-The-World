import {BrowserRouter, Route, Routes,} from "react-router-dom";

import MapPage from "./components/map/Map.jsx";
import StartPage from "./components/start/Start.jsx";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<StartPage/>}  path="/Your-Taste-Around-The-World"> </Route>
                <Route element={<MapPage/>}  path="/Your-Taste-Around-The-World/MapResult"> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;