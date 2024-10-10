import "./CarouselText.css";
import {useEffect, useState} from "react";

export const CarouselText = () => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            let newIndex = (index + 1);
            if(newIndex >= 4) newIndex = 0;
            setIndex(newIndex);
        }, 3000);
    }, [index]);


    return (
        <>
            <div style={{width: "50%"}}>
                <div className={`${index === 0 ? "txt" : "show"}`} hidden={index !== 0}>
                    <p>Welcome to the Your Taste Around The World</p>
                </div>
                <div className={`${index === 1 ? "txt" : "show"}`} hidden={index !== 1}>
                    <p>Tu já se perguntou de onde vem os artista que mais ouve?</p>
                </div>
                <div className={`${index === 2 ? "txt" : "show"}`} hidden={index !== 2}>
                    <p>Aqui você vai encontrar de onde é os seus artistas prediletos!</p>
                </div>
                <div className={`${index === 3 ? "txt" : "show"}`} hidden={index !== 3}>
                <p>Apenas com sua conta no LastFm ou Spotify você pode descobrir isso!</p>
                </div>
            </div>
        </>
    )
}