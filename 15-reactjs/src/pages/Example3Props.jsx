import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    //Data 
    const pokemons =[
        {id: 25, name: 'Pikachu', type: 'Electric', power: 'Thunderbold',image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", legendary: false},
        {id: 6, name: 'Charizard', type: 'Fire', power: 'Flamethrower',image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", legendary: false},
        {id: 151, name: 'Mewtwo', type: 'Psychic', power: 'Psychic',image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png", legendary: true},  
    ]

    //Styles 
    const  styles ={
        cards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
    }
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function argments).</p>
            <div style={styles.cards}>
                {/* We pass different props to each card */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key       ={pokemon.id}
                            name      ={pokemon.name}
                            type      ={pokemon.type}
                            power     ={pokemon.power}
                            image     ={pokemon.image}
                            legendary ={pokemon.legendary}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Example3Props;