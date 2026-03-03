import { useState, useEffect } from 'react';
import BtnBack from '../components/BtnBack';
import './Example8DataFetching.css';

function Example8DataFetching() {

    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 20;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPokemonList();
    }, [page]);

    const fetchPokemonList = async () => {
        try {
            setLoading(true);
            setError(null);

            const offset = (page - 1) * limit;

            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            const data = await res.json();

            setTotalPages(Math.ceil(data.count / limit));
            setPokemonList(data.results);
            setSelectedPokemon(null); // limpiar selección al cambiar página

        } catch {
            setError("Error al cargar los Pokémon");
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemonDetail = async (url) => {
        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setSelectedPokemon(data);
        } catch {
            setError("Error al cargar el detalle");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!search) return;

        try {
            setLoading(true);
            setSearchError(null);

            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
            );

            if (!res.ok) throw new Error();

            const data = await res.json();

            // Mostramos solo ese Pokémon
            setPokemonList([
                {
                    name: data.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
                }
            ]);

            setSelectedPokemon(data);

        } catch {
            setSearchError("Pokémon no encontrado");
        } finally {
            setLoading(false);
        }
    };

    // Extraer número desde la URL
    const getPokemonId = (url) => {
        const parts = url.split("/").filter(Boolean);
        return parts[parts.length - 1];
    };


    return (
        <div className="pokedex-page">
            <div className="pokedex-container">
                <BtnBack />
                <h2 className="pokedex-title">Pokédex con Detalle</h2>

                {/* Barra de búsqueda */}
                <div className="search-section">
                    <div className="search-controls">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Buscar por nombre o número..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="search-btn" onClick={handleSearch}>
                            Buscar
                        </button>
                        <button className="clear-btn" onClick={() => {
                            setSearch("");
                            fetchPokemonList();
                        }}>
                            Limpiar
                        </button>
                    </div>
                    {searchError && (
                        <p className="search-error">{searchError}</p>
                    )}
                </div>

                {error && <p className="error-msg">{error}</p>}
                {loading && <p className="loading-msg">⏳ Cargando...</p>}

                {/* Lista como botones */}
                <div className="pokemon-grid">
                    {pokemonList.map((poke) => {
                        const id = getPokemonId(poke.url);

                        return (
                            <button
                                key={id}
                                className="pokemon-btn"
                                onClick={() => fetchPokemonDetail(poke.url)}
                            >
                                #{id} {poke.name.toUpperCase()}
                            </button>
                        );
                    })}
                </div>

                {/* Paginación */}
                {/* Paginación */}
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        ⬅ Anterior
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`pagination-number ${page === pageNumber ? "active" : ""}`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="pagination-btn"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Siguiente ➡
                    </button>
                </div>

                {/* Detalle */}
                {selectedPokemon && (
                    <div className="pokemon-detail">
                        <h3>
                            #{selectedPokemon.id} {selectedPokemon.name.toUpperCase()}
                        </h3>

                        <img
                            src={selectedPokemon.sprites.front_default}
                            alt={selectedPokemon.name}
                        />

                        <p><strong>Altura:</strong> {selectedPokemon.height / 10} m</p>
                        <p><strong>Peso:</strong> {selectedPokemon.weight / 10} kg</p>
                        <p>
                            <strong>Tipos:</strong>{" "}
                            {selectedPokemon.types.map(t => t.type.name).join(", ")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Example8DataFetching;