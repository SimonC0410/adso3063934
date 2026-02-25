import { useState } from "react";
import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";



function Example4StateHooks() {

    //Data 
    const [pokemons, setPokemons] = useState([
        { id: 4, name: 'Charmeleon', type: 'Fire', power: 'Flamethrower', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", legendary: false, trapped: false },        { id: 25, name: 'Pikachu', type: 'Electric', power: 'Thunderbold', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", legendary: false, trapped: false },
        { id: 6, name: 'Charizard', type: 'Fire', power: 'Flamethrower', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", legendary: false, trapped: false },
        { id: 8, name: 'Tortuga', type: 'Water', power: 'pipi', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png", legendary: false, trapped: false },
        { id: 67, name: 'Machoque', type: 'normal', power: 'puño', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png", legendary: false, trapped: false },
        { id: 151, name: 'Mewtwo', type: 'Psychic', power: 'Psychic', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png", legendary: true, trapped: false },
    ])

    //Styles 
    const styles = {
        cards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        button: {
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    }

    const availablePokemons = pokemons.filter(p => !p.trapped);
    const buttonText = availablePokemons.length === 0 ? "No hay más Pokemones" : "Atrapar Pokemon";

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 4: State & Hooks</h2>
            <h3>(useState, useEffect)</h3>
            <p>Manage dynamic data and side effects.</p>
            <button style={styles.button} onClick={() => {
                const availablePokemons = pokemons.filter(p => !p.trapped);
                if (availablePokemons.length === 0) {
                    return;
                }
                const randomIndex = Math.floor(Math.random() * availablePokemons.length);
                const randomPokemon = availablePokemons[randomIndex];
                alert("Atrapando el pokemon con ID: " + randomPokemon.id);
                const updatedPokemons = pokemons.map(p => p.id === randomPokemon.id ? { ...p, trapped: true } : p);
                setPokemons(updatedPokemons);
            }}>

                {buttonText}
            </button>
            <div style={styles.cards}>
                {/* We pass different props to each card */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            image={pokemon.image}
                            legendary={pokemon.legendary}
                            status={pokemon.trapped}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Example4StateHooks;