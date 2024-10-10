import "./CarouselText.css";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export const CarouselText = () => {

    const [index, setIndex] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            let newIndex = (index + 1);
            if(newIndex >= 4) newIndex = 1;
            setIndex(newIndex);
        }, 3000);
    }, [index]);


    return (
        <>
            <div style={{width: "50%"}}>
                <AnimatePresence>
                    {index === 1 && (
                        <motion.div
                            className={"txt"}
                            initial={{x: 100, opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{y: "-10vw", x: 100, opacity: 0, transition: {duration: 0.7}}}
                        >
                            <p>Bem-vindo ao <i>Your Taste Around The World</i></p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {index === 2 && (
                        <motion.div
                            className={"txt"}
                            initial={{x: 100, opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{y: "-10vw", x: 100, opacity: 0, transition: {duration: 0.7}}}
                        >
                            <p>Você já se perguntou de onde vêm os artistas que você mais escuta?</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {index === 3 && (
                        <motion.div
                            className={"txt"}
                            initial={{x: 100, opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{y: "-10vw", x: 100, opacity: 0, transition: {duration: 0.7}}}
                        >
                            <p>Aqui, você vai descobrir a origem dos seus artistas favoritos!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {index === 4 && (
                        <motion.div
                            className={"txt"}
                            initial={{x: 100, opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{y: "-10vw", x: 100, opacity: 0, transition: {duration: 0.7}}}
                        >
                            <p>Com sua conta do LastFm ou Spotify, você pode descobrir tudo isso!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}