const pokedex = document.getElementById("pokedex");

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
        <li class="card" onclick="select(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <div class="description">
            <p> N°${pokeman.id} </p>
            <h2 class="card-title"> ${pokeman.name}</h2>
            </div>
        </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const select = async (id) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      const res = await fetch(url);
      const pokeman = await res.json();
      displayPopUp(pokeman);
};

const displayPopUp = (pokeman) => {
  const {stats, types} = pokeman
  const type = pokeman.types.map( type => type.type.name).join (' - ');
  const htmlString = `
  <div class= "popup">
  <div class="card" >
  <div class="description">
  <button id= "closeBtn"onclick ="closePopup()">X</button>
  <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeman.id}.gif "/>
  <p> N°${pokeman.id} </p>
  <h2 class="card-title"> ${pokeman.name}</h2>
  <p><b>Height:</b> ${pokeman.height} mm - <b>Weight:</b> ${pokeman.weight} gr - <b>Type:</b> ${type}
  </div>
</div>
  </div>
  `;
  pokedex.innerHTML = htmlString  + pokedex.innerHTML;
  setCardColor(types);
}
const closePopup = () =>{
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup)
}
fetchPokemon();


const typeColors = {
  electric: '#fff4b8',
  normal: '#fff',
  fire: '#FF675C',
  water: '#2F9AFF',
  ice: '#78DEFF',
  rock: '#BCAC66',
  flying: '#669AFF',
  grass: '#5d8579',
  psychic: '#FFC6D9',
  ghost: '#362729',
  bug: '#ABBC1C',
  poison: '#AB549A',
  ground: '#DEBC54',
  dragon: '#7866EF',
  steel: '#313131',
  fairy: '#ec98b4',
  fighting: '#2F2F2F',
  default: '#ffffff',
};

const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`)
  .then (data =>data.json())
  .then(response => renderPokemonData(response))
  .catch(err => renderNotFound())
}


const renderNotFound = () => {
  const htmlString = `
  <div class= "popup">
  <div class="card" >
  <div class="description">
  <button id= "closeBtn"onclick ="closePopup()">X</button>
  <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif "/>
  <h2 class="card-title">Pokemon no encontrado</h2>
  <p> Probá con otro nombre o numero</p>
  </div>
</div>
  </div>
  `;
  pokedex.innerHTML = htmlString  + pokedex.innerHTML;
}

const renderPokemonData = data =>{
  const {stats, types} = data
  const type = data.types.map( type => type.type.name).join (' - ');
  const htmlString = `
  <div class= "popup">
  <div class="card" >
  <div class="description">
  <button id= "closeBtn"onclick ="closePopup()">X</button>
  <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif "/>
  <p> N°${data.id} </p>
  <h2 class="card-title"> ${data.name}</h2>
  <p><b>Height:</b> ${data.height} mm - <b>Weight:</b> ${data.weight} gr - <b>Type:</b> ${type}
  </div>
</div>
  </div>
  `;

  pokedex.innerHTML = htmlString  + pokedex.innerHTML;
  setCardColor(types);
}



const setCardColor = types => {
  const cardPokemon = document.querySelector('.card')
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
  cardPokemon.style.background =  `linear-gradient(120deg, ${colorOne} 50%, ${colorTwo} 100%)`;
}

