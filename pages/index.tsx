import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Pokemon from "@/pokemon.model";

const inter = Inter({ subsets: ["latin"] });

export default function Home({data}) {
  return (
      <main>
          <p>Voici la liste des dix premiers pokémons</p>
          <ul>
              {data && data.map((pokemon) => (
                  <li key={pokemon.name}><Link href={'/pokemon/' + pokemon.id}>{pokemon.name}</Link></li>
              ))}
          </ul>
      </main>
  );
}

export async function getStaticProps({pokemon}) {

    const api = 'https://pokebuildapi.fr/api/v1/pokemon'
    const res = await fetch(api + '/limit/10', {cache: 'force-cache'});
    const pokemons : Pokemon[] = await res.json();

    return {
            props: {
                data: pokemons
            }
    }
}