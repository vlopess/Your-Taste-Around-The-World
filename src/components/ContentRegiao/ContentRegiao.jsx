import "./ContentRegiao.css";
import Arrow from "../../assets/back-arrow.svg";
import {useEffect, useState} from "react";

export const ContentRegiao = ({data, nome, setRegiao}) => {

    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        data = data.filter(e => e.origem === nome);
        data.forEach(e => e.origem = e.origem.replaceAll("_", " "))
        setArtistas(data)
    }, []);



    useEffect(() => {
        let artists = data.filter(e => e.origem === nome);
        setArtistas(artists);
    }, [data, nome]);

    const back = () => {
        setRegiao("");
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
                <span style={{width: "100%"}}><h3>{nome}</h3></span>
            </div>
            <div style={{height: "70%", overflowY: "auto", margin: "15px"}}>
                {
                    artistas.map(e =>
                        <p
                            style={{
                                textAlign: "start",
                                paddingLeft: "15px"
                            }}
                        >
                            <b>({e.nome})</b>
                        </p>
                    )
                }
            </div>
        </>
    )
}