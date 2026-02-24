import BtnBack from "../components/BtnBack";

//Component Charmander
function Charmander(){
    return(
        <div style={{border: '4px solid orange', padding: '1.4rem', borderRadius: '0.3rem', background: '#FFF0E6', width: '360px', color: '#000000'}}>
            <h2>🔥 Charmander</h2>
            <p>Type: Fire</p>
            <p>Ability: Blaze</p>
        </div>
    );
}

function Totodile(){
    return(
        <div style={{border: '4px solid #0099ff', padding: '1.4rem', borderRadius: '0.3rem', background: '#FFF0E6', width: '360px', color: '#000000'}}>
            <h2>💦 Totodile</h2>
            <p>Type: Water</p>
            <p>Ability: Torrent</p>
        </div>
    );
}

function ExampleComponents() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create independent a reusable UI pieces</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.4rem', gap: '1rem'}}>
                <Charmander />
                <Totodile />
            </div>
        </div>
    )
}

export default ExampleComponents;