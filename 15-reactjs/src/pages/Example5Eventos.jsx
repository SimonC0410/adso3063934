import BtnBack from "../components/BtnBack";
import { useState } from "react";

function Example5Eventos() {

    const [chosenPokemon, setChosenPokemon] = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange] = useState(0);

    // Event Click
    const handleChoice = (name) => {
        setChosenPokemon(name);
    }
    // Event Hover: MouseEnter || MouseOver
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name)
    }

    // Event MouseLeave
    const handleMouseLeave = () => {
        setHoveredPokemon(null)
    }
    
    // Event Input
    const handleInput = (e) => {
        setInputRange(e.target.value)
    }

    const eventContainer = {
        flex: '1',
        marginTop: '1.4rem',
        minWidth: '250px',
    }

    const btnsClick = {
        display: 'flex',
        gap: '10px',
        marginTop: '8px',
        marginBottom: '8px',
    }

    const titleH3 = {
        borderBottom: '2px dotted',
        marginBottom: '1rem',
        paddingBottom: '0.4rem'
    }

    const buttonStyle = {
        background: '#72c7ee',
        color: '#143656',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }

    const hoverStyle = {
        borderRadius: '5px',
        fontSize: '1.2rem',
        background: '#72c7ee',
        cursor: 'pointer',
        color: '#143656',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const chosePokemon = {
        padding: '6px 10px',
        background: '#0009',
        color: '#bae6fb',
        borderRadius: '5px',
    }

    const rangeStyle = {
        accentColor: '#72c7ee',
        padding: '1rem',
        width: '100%',
    }

    const outPut = {
        fontSize: '4rem',
        textAlign: 'center',
        marginBottom: '2rem',   
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input).</p>
            <div>
                <h3 style={titleH3} >Click Event</h3>
                <button onClick={(e) => handleChoice('Bullbasaur', e)} style={buttonStyle}>
                    <span style={{ zoom: 2.4 }}>🍃</span>Bullbasaur
                </button>
                <button onClick={(e) => handleChoice('Charmander', e)} style={buttonStyle}>
                    <span style={{ zoom: 2.4 }}>🔥</span>Charmander
                </button>
                <button onClick={(e) => handleChoice('Squirtle', e)} style={buttonStyle}>
                    <span style={{ zoom: 2.4 }}>💧</span> Squirtle
                </button>
                {chosenPokemon ? (
                    <p style={chosePokemon}>You chose: {chosenPokemon}</p>
                ) : (
                    <p>Please choose a Pokémon.</p>
                )}

                {/* mouseEvent */}
                <div style={eventContainer}>
                    <h3 style={titleH3}>MouseEnter / MouseLeaveEvents</h3>
                </div>
                <div style={btnsClick}>
                    <button onMouseEnter={(e) => handleMouseEnter('Pikachu')}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}
                    >Hover Style!
                        <img style={{ zoom: 0.4 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" />
                    </button>
                    <button onMouseEnter={(e) => handleMouseEnter('Evee')}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}
                    >Hover Here Too!
                        <img style={{ zoom: 0.4 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" alt="" />
                    </button>
                </div>
                {hoveredPokemon && (
                    <div style={chosePokemon}>You are viewing: {hoveredPokemon}!</div>
                    )
                }

                {/* input */}
                <h3 style={titleH3}>Input Event:</h3>
                <input 
                style={rangeStyle} 
                onInput={handleInput}
                type="range" 
                min="1" 
                max="100" 
                step="2"
                />
                <span style={{display: 'block', textAlign: 'center'}}>Power:</span>
                {inputRange && (
                    <div style={outPut}>{inputRange}</div>
                    )
                }
            </div>

        </div>
    )
}

export default Example5Eventos;