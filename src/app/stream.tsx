import { Suspense } from "react";

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