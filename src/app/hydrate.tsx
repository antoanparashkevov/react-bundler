import React, { useState } from "react";

const HydratePage: React.FC = (): React.ReactNode => {
    const [counter, setCounter] = useState<number>(0);

    return (
        <section>
            <h1 style={{color: "white"}}>
                Welcome from React Hydration! :)
            </h1>
            <button 
                onClick={() => setCounter(counter + 1)}
                style={{color: "white", padding: "1rem", backgroundColor: "red", borderRadius: "0.5rem", cursor: "pointer"}}
            >
                Clicked {counter} times
            </button>
        </section>
    )
}

export default HydratePage;