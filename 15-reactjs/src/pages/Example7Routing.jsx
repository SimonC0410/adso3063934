import { Routes, Route, NavLink, useLocation}  from 'react-router-dom';
import BtnBack from '../components/BtnBack';
import "./Example7Routing.css";

function GeneralInfo(){
    return(
        <div>
            <h2>General Info</h2>
            <p>Pokémon es una inmensa franquicia de entretenimiento nacida en 1996 en Japón, centrada en criaturas fantásticas que los humanos entrenan para combatir, explorar y convivir. Creada por Satoshi Tajiri y desarrollada principalmente por Game Freak para Nintendo, cuenta con más de 1000 especies, videojuegos RPG, series de anime y cartas coleccionables</p>
        </div>
    )
}

function PokemonList(){
    return(
        <div>
            <h2>Pokemon List</h2>
            <ul>
                <li>Pikachu</li>
                <li>Charmander</li>
                <li>Bulbasaur</li>
                <li>Squirtle</li>
                <li>Meowth</li>
            </ul>
        </div>
    )
}

function PokemonDetails(){
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');
    const images = {
        Pikachu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        Charmander: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
    };
    const img = name ? images[name] : null;

    return(
        <div>
            <h2>Detalles del Pokémon</h2>
            <p><strong>Seleccionado:</strong> {name || '—'}</p>
            {img ? (
                <div className='pokemon-image'>
                    <img src={img} alt={name} />
                </div>
            ) : (
                name && <p>No hay imagen disponible para {name}.</p>
            )}
        </div>
    )
}

function InternalNavigation(){
    return(
        <nav className="internal-nav">
            <NavLink to="/example7" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>🏠 Home</NavLink>
            <NavLink to="/example7/list" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>✅ Lista</NavLink>
            <NavLink to="/example7/details?name=Pikachu" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>⚡ Pikachu</NavLink>
            <NavLink to="/example7/details?name=Charmander" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>🔥 Charmander</NavLink>
        </nav>
    )
}

function Example7Routing(){
    const location = useLocation();
    return(
        <div className='route-page'>
            <div className='route-container'>
                <BtnBack />
                <h2 className='route-title'>Example 7: React Router</h2>
                <p className='route-description'>Navegación entre diferentes 'páginas' sin recargar el navegador.</p>
                <InternalNavigation />
                <div className='route-content'>
                    <Routes>
                        <Route path="/" element={<GeneralInfo />}></Route>
                        <Route path="/list" element={<PokemonList />}></Route>
                        <Route path="/details" element={<PokemonDetails />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Example7Routing;