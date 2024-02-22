import Pokemon from "@/pokemon.model";
import Image from "next/image";

export default function PokemonDetail({data}) {
    return (
        <>
            <h2 className="text-xl">{data.name}</h2>
            <Image src={data.image} width={100} height={100} alt={data.name} />
            <ul>
                {data.apiTypes.map(types => (
                    <><li>{types.name}</li></>
                ))}
            </ul>
        </>
    )
}

export async function getStaticPaths() {
    // Renvoyer une liste de chemins dynamiques à pré-rendre
    // const paths = [{params: {slug:'1'}}]

    let paths: any[] = [];

    for(let i = 1; i <= 10; i++) {
        paths.push({
            params: {
                slug: i.toString()
            }
        });
    }

    return {
        paths,
        fallback: false, // true indique que les pages non pré-rendues renverront une page de chargement en attendant les données
    };
}

export async function getStaticProps( {params}) {
    const baseUrl : string = 'https://pokebuildapi.fr/api/v1';

    const api= await fetch(`${baseUrl}/pokemon/${params.slug}`);

    const pokemon : Pokemon = await api.json();
    return { props: {
        data: pokemon
    }
    };
}