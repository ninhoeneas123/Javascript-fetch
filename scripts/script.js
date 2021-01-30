const types = [
    'fire',
    'grass',
    'eletric',
    'water',
    'ground',
    'rock',
    'fairy',
    'poison',
    'bug',
    'dragon',
    'psychic',
    'flying',
    'fighting',
    'normal', 
];

const cardHTML = `
    
    <div class="card" id="card-{id}">
        <div class="title ">
            <h2>{name}</h2>
            <small># {id}</small>
        </div>
        <div class="img bg{type}">
            <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="" />
        </div>
        <div class="type {type}">
            <p>Type:{type}</p>
            <p class="divider"></p>
            <p class="abilite">Abilities:{abilite}</p>
        </div>
        <button class="favorite" data-id={id}></button>
        <div class="heart">
        </div>
    </div>
   
   `

const cards = document.querySelector('.cards')



const POKEMOM_COUNT = 24;

const getType = (data) => {
    const apiTypes = data.map((type) => type.type.name);
    const type = types.find(type => apiTypes.indexOf(type)> -1);
    return type;
}

const getAbilities = (data) =>{
    const apiAbilities = data.map((abilities) => abilities.ability.name);
        return apiAbilities; 
}
const fetchPokemon = async (number) => {
    if(number === undefined) return
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`
    const response = await fetch(url).then((response) => response.json());
    const {id, name, types, abilities} = response;
    const type = getType(types);
    const abilite = getAbilities(abilities);
     return { id, name, type, abilite } ;
};

const replacer = (text, source, destination) =>{
    const regex = new RegExp(source, 'gi')
    return text.replace(regex, destination);
}

const createPokemonCard = (pokemon) => {
    const {id, name, type, abilite} = pokemon;
    let newCard =replacer(cardHTML, `\{id\}`, id);
        newCard =replacer(newCard, `\{name\}`, name);
        newCard = replacer(newCard, `\{type\}`,type );
        newCard = replacer(newCard, `\{abilite\}`,abilite );


cards.innerHTML += newCard;
}

const fetchPokemons = async () => {
    for( let i  = 1 ; i <= POKEMOM_COUNT; i++ ){
        const pokemon = await fetchPokemon(i);
        createPokemonCard(pokemon);
    }
};
fetchPokemons();