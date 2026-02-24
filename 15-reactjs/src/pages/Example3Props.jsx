import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    //Data 
    const pokemons =[
        {id: 1, name: 'Pikachu', type: 'Electric', power: 'Thunderbold', legendary: false},
        {id: 2, name: 'Charizard', type: 'Fire/Flying', power: 'Flamethrower', legendary: false},
        {id: 3, name: 'Mewtwo', type: 'Psychic', power: 'Psychic', legendary: true},  
    ]

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function argments).</p>
        </div>
    )
}

export default Example3Props;