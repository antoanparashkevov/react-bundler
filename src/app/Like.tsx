'use client';

import React, { useState } from "react";

const Like: React.FC = () => {
    const [counter, setCounter] = useState<number>(0);

    return (
        <button onClick={() => setCounter(counter + 1)}>Like ({counter})</button>
    )
}

export default Like;