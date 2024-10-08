export const ContentArtistas = ({data, setPais}) => {
    return (
        <>
            <h3>ARTISTAS MAIS OUVIDOS:</h3>
            <div style={{height: "80%", overflowY: "auto", margin: "15px"}}>
                {
                    data.map(e =>
                        <p
                            style={{
                                textAlign: "start",
                                paddingLeft: "15px"
                            }}
                        >
                            {e.nome} <span style={{cursor: "pointer"}}
                                           onClick={() => setPais(e.país)}><b>({e.país})</b></span>
                        </p>
                    )
                }
            </div>
        </>
    )
}