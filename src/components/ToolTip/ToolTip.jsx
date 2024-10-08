import "./ToolTip.css";

export const ToolTip = () => {
    return (
        <>
            <div className="tooltip-container">
              <span className="tooltip">
                Todas as informações sobre a localização dos artistas foram obtidas através de uma IA, portanto, estão sujeitas a erros.
              </span>
              <span className="text">?</span>
            </div>
        </>
    )
}