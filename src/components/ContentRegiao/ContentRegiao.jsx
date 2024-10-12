import "./ContentRegiao.css";
import Arrow from "../../assets/back-arrow.svg";
import {useEffect, useState} from "react";

export const ContentRegiao = ({data, nome, setRegiao}) => {

    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        let nomeId = nome.split("(")[0].trimEnd();
        nomeId = nomeId.replaceAll(" ", "_").trimEnd();
        let artists = data.filter(e => e.origem === nomeId);
        if(artists.length === 0){
            let origem2 = nomeId.replaceAll("_", "-");
            artists = data.filter(e => e.origem === origem2);
        }
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
                <p
                    style={{
                        textAlign: "start",
                        paddingLeft: "15px"
                    }}
                >
                    <b>Artistas:</b>
                </p>
                {artistas.length === 0  &&(<p>Sem Artistas</p>)}
                {
                    artistas.map(e =>
                        <p
                            style={{
                                textAlign: "start",
                                paddingLeft: "15px"
                            }}
                        >
                            <b>{e.nome}</b>
                        </p>
                    )
                }
            </div>
        </>
    )
}