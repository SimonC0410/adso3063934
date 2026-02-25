import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {
    const [chosenPokemon, setChosenPokemon] = useState(null);

    const handleChoice = (name, event) => { 
        setChosenPokemon(name);
    };

    const buttonStyle = {
        color: 'red',
        padding: '1rem',
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Eventos</h2>
            <p>Respond to user interactions (click, hover, input)</p>
            <div>
                <h3>Click Event</h3>
                <button
                    onClick={(e) => handleChoice("Bulbasaur", e)}
                    style={buttonStyle}
                >
                    Bulbasaur
                </button>
                <button
                    onClick={(e) => handleChoice("Charmander", e)}
                    style={buttonStyle}
                >
                    Charmander
                </button>
                <button
                    onClick={(e) => handleChoice("Squirtle", e)}
                    style={buttonStyle}
                >
                    Squirtle
                </button>
                {chosenPokemon  &&(
                    <div>You choose {chosenPokemon}</div>
                ) }
            </div>
        </div>
    );
}
export default Example5Eventos;