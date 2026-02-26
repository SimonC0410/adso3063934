import React, { useState } from "react";
import BtnBack from "../components/BtnBack";
import "./Example6CondicionalListas.css";

function Example6CondicionalListas() {
	// Datos completos de pokémon
	const POKEMONS = [
    { id: 1, name: "Bulbasaur", type: "grass/poison", power: "Latigazo", descripcion: "Un Pokémon planta/veneno que tiene una semilla en su espalda desde que nace.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", level: 5 },
    { id: 2, name: "Ivysaur", type: "grass/poison", power: "Drenadoras", descripcion: "La semilla en su espalda crece y florece a medida que evoluciona.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png", level: 16 },
    { id: 3, name: "Venusaur", type: "grass/poison", power: "Rayo Solar", descripcion: "La flor de su espalda libera un aroma que calma a quienes lo rodean.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png", level: 32 },
    { id: 4, name: "Charmander", type: "fire", power: "Ascuas", descripcion: "Un Pokémon de tipo fuego; la llama de su cola indica su estado de salud.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", level: 5 },
    { id: 5, name: "Charmeleon", type: "fire", power: "Garra Dragón", descripcion: "Su temperamento agresivo se refleja en la intensidad de la llama de su cola.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png", level: 16 },
    { id: 6, name: "Charizard", type: "fire/flying", power: "Lanzallamas", descripcion: "Escupe fuego tan caliente que puede derretir cualquier cosa.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", level: 36 },
    { id: 7, name: "Squirtle", type: "water", power: "Pistola Agua", descripcion: "Un Pokémon tortuga de tipo agua que dispara agua por la boca.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", level: 5 },
    { id: 8, name: "Wartortle", type: "water", power: "Hidrochorro", descripcion: "Sus orejas y cola peludas lo ayudan a nadar rápidamente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png", level: 16 },
    { id: 9, name: "Blastoise", type: "water", power: "Hidrocañón", descripcion: "Tiene cañones de agua en su caparazón que usa para atacar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png", level: 36 },
    { id: 10, name: "Caterpie", type: "bug", power: "Disparo Demora", descripcion: "Un Pokémon oruga que libera un olor desagradable para defenderse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png", level: 3 },
    { id: 11, name: "Metapod", type: "bug", power: "Fortaleza", descripcion: "Su cuerpo es duro como una armadura mientras se prepara para evolucionar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png", level: 7 },
    { id: 12, name: "Butterfree", type: "bug/flying", power: "Danza Aleteo", descripcion: "Sus alas están cubiertas de polvos venenosos que dispersa al volar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png", level: 10 },
    { id: 13, name: "Weedle", type: "bug/poison", power: "Picotazo Veneno", descripcion: "Un Pokémon gusano con un aguijón venenoso en la cabeza.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png", level: 3 },
    { id: 14, name: "Kakuna", type: "bug/poison", power: "Endurecer", descripcion: "Permanece inmóvil mientras se endurece antes de evolucionar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png", level: 7 },
    { id: 15, name: "Beedrill", type: "bug/poison", power: "Ataque Furia", descripcion: "Un Pokémon abeja con tres aguijones venenosos para atacar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png", level: 10 },
    { id: 16, name: "Pidgey", type: "normal/flying", power: "Ataque Arena", descripcion: "Un pájaro pequeño que utiliza ráfagas de arena para defenderse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png", level: 5 },
    { id: 17, name: "Pidgeotto", type: "normal/flying", power: "Tornado", descripcion: "Vuela a gran velocidad y protege su territorio ferozmente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png", level: 18 },
    { id: 18, name: "Pidgeot", type: "normal/flying", power: "Vendaval", descripcion: "Puede volar a velocidades de hasta 200 km/h y tiene una vista aguda.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png", level: 36 },
    { id: 19, name: "Rattata", type: "normal", power: "Ataque Rápido", descripcion: "Un roedor pequeño y veloz con dientes afilados que crecen constantemente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png", level: 5 },
    { id: 20, name: "Raticate", type: "normal", power: "Hipercolmillo", descripcion: "Sus grandes dientes pueden roer casi cualquier cosa.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png", level: 20 },
    { id: 21, name: "Spearow", type: "normal/flying", power: "Picotazo", descripcion: "Un Pokémon ave pequeño y muy territorial.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png", level: 5 },
    { id: 22, name: "Fearow", type: "normal/flying", power: "Pico Taladro", descripcion: "Vuela a gran velocidad usando sus largas alas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png", level: 30 },
    { id: 23, name: "Ekans", type: "poison", power: "Ácido", descripcion: "Se mueve silenciosamente y ataca con rapidez.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png", level: 5 },
    { id: 24, name: "Arbok", type: "poison", power: "Colmillo Veneno", descripcion: "Su patrón corporal intimida a sus enemigos.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png", level: 20 },
    { id: 25, name: "Pikachu", type: "electric", power: "Impactrueno", descripcion: "Almacena electricidad en sus mejillas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", level: 10 },
    { id: 26, name: "Raichu", type: "electric", power: "Rayo", descripcion: "Puede liberar descargas eléctricas muy potentes.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png", level: 30 },
    { id: 27, name: "Sandshrew", type: "ground", power: "Ataque Arena", descripcion: "Se enrolla en bola para protegerse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png", level: 5 },
    { id: 28, name: "Sandslash", type: "ground", power: "Garra Metal", descripcion: "Sus garras son afiladas como cuchillas.", img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png" , level : 15},
    { id : 29, name : 'Nidoran♀', type : 'poison', power : 'Doble Patada', descripcion : 'Es pequeña pero muy venenosa.', img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png', level : 5},
    { id : 30, name : 'Nidorina', type : 'poison', power : 'Colmillo Veneno', descripcion : 'Protege ferozmente a su cría.', img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png', level : 16},
    { id : 31, name : 'Nidoqueen', type : 'poison / ground', power :'Terremoto', descripcion :'Su cuerpo es extremadamente resistente.', img :'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png' , level : 36},
    { id: 32, name: "Nidoran♂", type: "poison", power: "Picotazo Veneno", descripcion: "Tiene cuernos venenosos muy peligrosos.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png", level: 5 },
    { id: 33, name: "Nidorino", type: "poison", power: "Cornada", descripcion: "Ataca usando su potente cuerno.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png", level: 16 },
    { id: 34, name: "Nidoking", type: "poison/ground", power: "Megacuerno", descripcion: "Su fuerza bruta es impresionante.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png", level: 36 },
    { id: 35, name: "Clefairy", type: "fairy", power: "Metrónomo", descripcion: "Se dice que proviene de la luna.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png", level : 10},
    { id: 36, name: "Clefable", type: "fairy", power: "Brillo Mágico", descripcion: "Rara vez se deja ver por humanos.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png" , level : 20},
    { id: 37, name: "Vulpix", type: "fire", power: "Ascuas", descripcion: "Controla pequeñas llamas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png", level: 5 },
    { id: 38, name: "Ninetales", type: "fire", power: "Lanzallamas", descripcion: "Se dice que puede vivir mil años.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png", level: 36 },
    { id: 39, name: "Jigglypuff", type: "normal/fairy", power: "Canto", descripcion: "Duerme a sus enemigos cantando.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png", level : 5},
    { id: 40, name: "Wigglytuff", type: "normal/fairy", power: "Hiperrayo", descripcion: "Su cuerpo es extremadamente elástico y resistente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png" , level : 20},
    { id: 41, name: "Zubat", type: "poison/flying", power: "Supersónico", descripcion: "No tiene ojos y usa ultrasonido para orientarse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png", level: 5 },
    { id: 42, name: "Golbat", type: "poison/flying", power: "Colmillo Veneno", descripcion: "Ataca chupando la sangre de sus presas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png", level: 20 },
    { id: 43, name: "Oddish", type: "grass/poison", power: "Absorber", descripcion: "Durante el día se entierra para evitar el sol.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png", level: 5 },
    { id: 44, name: "Gloom", type: "grass/poison", power: "Ácido", descripcion: "Libera un olor fuerte y desagradable.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png", level: 15 },
    { id: 45, name: "Vileplume", type: "grass/poison", power: "Petalodanza", descripcion: "Su flor produce polen altamente tóxico.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png", level : 30},
    { id: 46, name: "Paras", type: "bug/grass", power: "Espora", descripcion: "Hongos crecen en su espalda y controlan su cuerpo.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png", level: 5 },
    { id: 47, name: "Parasect", type: "bug/grass", power: "Corte", descripcion: "El hongo ha tomado completamente el control.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png", level: 20 },
    { id: 48, name: "Venonat", type: "bug/poison", power: "Confusión", descripcion: "Sus grandes ojos actúan como radar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png", level : 10},
    { id: 49, name: "Venomoth", type: "bug/poison", power: "Psíquico", descripcion: "Sus alas dispersan polvo venenoso.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png", level : 25},
    { id: 50, name: "Diglett", type: "ground", power: "Excavar", descripcion: "Vive bajo tierra y rara vez se deja ver.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png", level: 5 },
    { id: 51, name: "Dugtrio", type: "ground", power: "Terremoto", descripcion: "Tres Diglett actúan como uno solo.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png", level: 20 },
    { id: 52, name: "Meowth", type: "normal", power: "Día de Pago", descripcion: "Le encantan los objetos brillantes.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png", level : 10 },
    { id: 53, name: "Persian", type: "normal", power: "Garra Umbría", descripcion: "Elegante y muy veloz al atacar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png", level : 20 },
    { id: 54, name: "Psyduck", type: "water", power: "Confusión", descripcion: "Sufre constantes dolores de cabeza.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png", level: 5 },
    { id: 55, name: "Golduck", type: "water", power: "Hidrochorro", descripcion: "Nada con increíble velocidad.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png", level: 20 },
    { id: 56, name: "Mankey", type: "fighting", power: "Golpe Karate", descripcion: "Se enfurece fácilmente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png", level : 10 },
    { id: 57, name: "Primeape", type: "fighting", power: "Puño Dinámico", descripcion: "Cuando se enfada pierde el control.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png", level : 20 },
    { id: 58, name: "Growlithe", type: "fire", power: "Lanzallamas", descripcion: "Fiel y valiente, protege a su entrenador.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png", level: 10 },
    { id: 59, name: "Arcanine", type: "fire", power: "Envite Ígneo", descripcion: "Conocido por su gran velocidad y nobleza.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png", level: 30 },
    { id: 60, name: "Poliwag", type: "water", power: "Pistola Agua", descripcion: "Su vientre en espiral es visible a través de su piel.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png", level : 10 },
    { id: 61, name: "Poliwhirl", type: "water", power: "Burbuja", descripcion: "Puede vivir tanto en agua como en tierra.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png", level : 20 },
    { id: 62, name: "Poliwrath", type: "water/fighting", power: "Puño Incremento", descripcion: "Excelente nadador con gran fuerza.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png" , level : 30},
    { id: 63, name: "Abra", type: "psychic", power: "Teletransporte", descripcion: "Duerme 18 horas al día.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png" , level : 5},
    { id: 64, name: "Kadabra", type: "psychic", power: "Psíquico", descripcion: "Posee grandes poderes mentales.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png" , level : 20},
    { id: 65, name: "Alakazam", type:"psychic" , power:"Psíquico" , descripcion:"Su inteligencia supera a una supercomputadora.", img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png" , level : 30},
    { id: 68, name: "Machamp", type: "fighting", power: "Puño Dinámico", descripcion: "Puede lanzar cientos de golpes por segundo.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png", level: 30 },
    { id: 69, name: "Bellsprout", type: "grass/poison", power: "Látigo Cepa", descripcion: "Su cuerpo es delgado y flexible.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png", level: 5 },
    { id: 70, name: "Weepinbell", type: "grass/poison", power: "Ácido", descripcion: "Atrae presas con olor dulce.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png", level: 15 },
    { id: 71, name: "Victreebel", type: "grass/poison", power: "Hoja Afilada", descripcion: "Devora presas enteras.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png", level: 30 },
    { id: 72, name: "Tentacool", type: "water/poison", power: "Burbuja", descripcion: "Flota libremente en el mar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png", level : 5},
    { id: 73, name: "Tentacruel", type: "water/poison", power: "Hidrobomba", descripcion: "Tiene tentáculos altamente venenosos.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png", level : 20},
    { id: 74, name: "Geodude", type: "rock/ground", power: "Lanzarrocas", descripcion: "Su cuerpo está hecho de roca sólida.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png", level : 5 },
    { id: 75, name: "Graveler", type: "rock/ground", power: "Roca Afilada", descripcion: "Se mueve rodando cuesta abajo.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png", level : 15 },
    { id: 76, name: "Golem", type: "rock/ground", power: "Explosión", descripcion: "Su cuerpo es extremadamente duro.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png", level : 30 },
    { id: 77, name: "Ponyta", type: "fire", power: "Nitrocarga", descripcion: "Corre velozmente envuelto en llamas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png", level : 10 },
    { id: 78, name: "Rapidash", type: "fire", power: "Megacuerno", descripcion: "Puede alcanzar velocidades increíbles.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png", level : 20 },
    { id: 79, name: "Slowpoke", type: "water/psychic", power: "Confusión", descripcion: "Es lento y despreocupado.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png", level : 5 },
    { id: 80, name: "Slowbro", type: "water/psychic", power: "Psíquico", descripcion: "Un Shellder se aferra a su cola.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png", level : 20 },
    { id: 81, name: "Magnemite", type: "electric/steel", power: "Impactrueno", descripcion:"Flota usando magnetismo y genera electricidad.", img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png" , level : 5},
    { id : 82, name : 'Magneton', type : 'electric / steel', power : 'Rayo', descripcion : 'Tres Magnemite unidos por magnetismo.', img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png' , level : 20},
    { id : 83, name : 'Farfetch’d', type : 'normal / flying', power : 'Corte', descripcion : 'Lucha usando el puerro que siempre lleva.', img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png' , level : 15},
    { id: 84, name: "Doduo", type: "normal/flying", power: "Ataque Rápido", descripcion: "Tiene dos cabezas que actúan de forma independiente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png" , level : 5},
    { id: 85, name: "Dodrio", type: "normal/flying", power: "Pico Taladro", descripcion: "Sus tres cabezas coordinan ataques veloces.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png" , level : 20},
    { id: 86, name: "Seel", type: "water", power: "Aurora Beam", descripcion:"Nada con elegancia en aguas frías.", img:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png" , level : 5},
    { id: 87, name: "Dewgong", type: "water/ice", power: "Rayo Hielo", descripcion: "Habita en mares helados.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png", level : 20 },
    { id: 88, name: "Grimer", type: "poison", power: "Lodo", descripcion: "Se forma a partir de residuos tóxicos.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png", level : 5 },
    { id: 89, name: "Muk", type: "poison", power: "Bomba Lodo", descripcion: "Despide un olor extremadamente fuerte.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png", level : 20 },
    { id: 90, name: "Shellder", type: "water", power: "Carámbano", descripcion: "Se protege con su concha dura.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png", level : 5 },
    { id: 91, name: "Cloyster", type: "water/ice", power: "Ventisca", descripcion: "Su caparazón es casi impenetrable.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png", level : 20 },
    { id: 92, name: "Gastly", type: "ghost/poison", power: "Lengüetazo", descripcion: "Está compuesto casi totalmente de gas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png", level : 5 },
    { id: 93, name: "Haunter", type: "ghost/poison", power: "Bola Sombra", descripcion: "Puede atravesar paredes.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png", level : 15 },
];

	// Obtener tipos únicos
	const tiposUnicos = [
		"Todos",
		...Array.from(new Set(POKEMONS.flatMap(p => p.type.split("/")))).sort()
	];


    const [pokemons, setPokemons] = useState(POKEMONS);
    const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
    const [levelCap, setLevelCap] = useState(0);
    const [nuevoPokemon, setNuevoPokemon] = useState({ name: "", type: tiposUnicos[1] || "", power: "", descripcion: "", img: "" });

    // Filtro por tipo y levelcap
    const pokemonsFiltrados = pokemons.filter((p) => {
        const tipoOk = tipoSeleccionado === "Todos" || p.type.split("/").includes(tipoSeleccionado);
        const nivelOk = !levelCap || (p.level && p.level >= levelCap);
        return tipoOk && nivelOk;
    });

	const handleTipoChange = (e) => {
		setTipoSeleccionado(e.target.value);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNuevoPokemon({ ...nuevoPokemon, [name]: value });
	};
	const handleAgregar = () => {
		if (nuevoPokemon.name.trim() === "" || nuevoPokemon.type === "") return;
		setPokemons([
			...pokemons,
			{ ...nuevoPokemon, id: Date.now() },
		]);
		setNuevoPokemon({ name: "", type: tiposUnicos[1] || "", power: "", descripcion: "", img: "" });
	};

    return (
        <div className="page">
            <div className="container-inner">
                <BtnBack />
                <h2 className="title">Example 6: Condicionales y Listas</h2>
                <div className="content-card">
                    <div className="controls">
                        <label>
                            Tipo:
                            <select className="select" value={tipoSeleccionado} onChange={handleTipoChange} style={{ marginLeft: 8 }}>
                                {tiposUnicos.map((tipo) => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Nivel mínimo:
                            <input
                                className="number"
                                type="number"
                                min="0"
                                value={levelCap}
                                onChange={e => setLevelCap(Number(e.target.value))}
                                style={{ marginLeft: 8 }}
                            />
                        </label>
                    </div>
                    <ul className="pokemon-list">
                        {pokemonsFiltrados.length === 0 ? (
                            <li className="empty">No hay pokémon que coincidan.</li>
                        ) : (
                            pokemonsFiltrados.map((p) => (
                                <li key={p.id} className="pokemon-card">
                                    <img className="pokemon-img" src={p.img} alt={p.name} />
                                    <div className="pokemon-info">
                                        <b>{p.name}</b>
                                        <div className="meta">({p.type}) • Nivel: {p.level || '—'}</div>
                                        <div style={{ marginTop: 6 }}><b>Poder:</b> {p.power}</div>
                                        <div className="meta" style={{ marginTop: 6 }}>{p.descripcion}</div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="add-form">
                        <h3 style={{ width: '100%', margin: '0 0 8px 0' }}>Agregar Pokémon</h3>
                        <input
                            className="input large"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={nuevoPokemon.name}
                            onChange={handleInputChange}
                        />
                        <select className="select" name="type" value={nuevoPokemon.type} onChange={handleInputChange}>
                            {tiposUnicos.filter((t) => t !== "Todos").map((tipo) => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        <input
                            className="input small"
                            type="text"
                            name="power"
                            placeholder="Poder"
                            value={nuevoPokemon.power}
                            onChange={handleInputChange}
                        />
                        <input
                            className="input medium"
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={nuevoPokemon.descripcion}
                            onChange={handleInputChange}
                        />
                        <input
                            className="input medium"
                            type="text"
                            name="img"
                            placeholder="URL Imagen"
                            value={nuevoPokemon.img}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-primary" onClick={handleAgregar}>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example6CondicionalListas;