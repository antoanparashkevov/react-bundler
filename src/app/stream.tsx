import { Suspense } from "react";
// @ts-ignore
// It is required to insert the extension (.tsx) in order to catch this file in our filter plugin (see the esbuild/stream/esbuild.config.js)
import Like from "./Like.tsx";

type Item = {
    id: number;
    name: string;
    age: string;
};

const getAll = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return JSON.stringify([
        {
            id: 1,
            name: "Antoan",
            age: 23,
        },
        {
            id: 2,
            name: "Ivan",
            age: 24
        }
    ])
}
const Albums = async (): Promise<JSX.Element> => {
    let data = JSON.parse(await getAll());

    return (
        <ul>
            {data.map((item: Item) => (
                <li key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.age}</p>
                    <Like />
                </li>
            ))}
        </ul>
    )
}

const StreamPage: React.FC = () => {

    return (
        <section style={{color: "white", fontWeight: "bold"}}>
            <h1>
                Welcome from React Streaming! :)
            </h1>
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-ignore */}
                <Albums />
            </Suspense>
        </section>
    )
}

export default StreamPage;