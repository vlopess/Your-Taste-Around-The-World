import {BrowserRouter, Route, Routes,} from "react-router-dom";

import MapPage from "./components/map/Map.jsx";
import StartPage from "./components/start/Start.jsx";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<StartPage/>}  path="/"> </Route>
                <Route element={<MapPage/>}  path="/MapResult"> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;