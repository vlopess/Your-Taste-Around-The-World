import {useEffect, useState} from "react";
import Arrow from "../../assets/back-arrow.svg";
import {ToolTip} from "../ToolTip/ToolTip.jsx";

export const ContentPais = ({data, pais, setPais}) =>{
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        data = data.filter(e => e.país == pais);
        data.forEach(e => e.origem = e.origem.replaceAll("_", " "))
        setArtistas(data)
    }, []);

    const back = () => {
        setPais("")
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img
                    style={{
                        padding: "0 15px",
                        cursor: "pointer"
                    }}
                    onClick={() => back()}
                    src={Arrow}
                    alt="Arrow"
                />
                <span style={{width: "100%"}}><h3>{pais}</h3></span>
                <ToolTip/>
            </div>
            <p>{artistas.length} artirtas</p>
            <div style={{height: "70%", overflowY: "auto", margin: "15px"}}>
                {
                    artistas.map(e =>
                        <p
                            style={{
                                textAlign: "start",
                                paddingLeft: "15px"
                            }}
                        >
                            {e.nome} <b>({e.origem})</b>
                        </p>
                    )
                }
            </div>
        </>
    )
}
