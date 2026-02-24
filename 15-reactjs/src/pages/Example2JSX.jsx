import BtnBack from '../components/BtnBack';

function Example2JSX() {

    //JS variables
    const pkName = "Bulbasaur";
    const pkType = "Grass/Poison";
    const pkLevel = "5";
    const pkAbilities = ['Overgrow', 'Chlorophyll'];
    const pkImgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

    //Style Object
    const styles ={
        container: {
            background: '#e8f5e8',
            color: '#143656',
            padding: '1.2rem',
            marginTop: '1rem',
            borderRadius: '10px',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            color: '#143656',
            fontSize: '2rem',
            textAlign: 'center'
        },
        img: {
            display: 'flex',
            margina: '1rem auto',
            width: '150px'
        },
        ul: {
            paddingLeft: '2rem',
            fontSize: '0.8rem'
        }
    }

    return(
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writing HTML-Like code whiting JavaScript using braces {} for JS expresions.</p>
            <div style={styles.container}>
                <h3 style={styles.title}>{pkName} (Lvl. {pkLevel})</h3>
                <img src={pkImgUrl} alt={pkName} style={styles.img} />
                <p>Type: {pkType}</p>
                <p>Upercase: {pkName.toUpperCase()}</p>
                <p>Abilities:</p>
                <ul style={styles.ul}>
                    {pkAbilities.map((ability, index) => (
                        <li key={index} >{ability}</li>
                    ))}
                </ul>
                <p>Is it a starter? {pkLevel === "5"? '✅yes' : '✖️no'}</p>
            </div>
        </div>
    );
}

export default Example2JSX;