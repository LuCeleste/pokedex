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
  const type = pokeman.types.map( type => type.type.name).join (' - ');
  const image = pokeman.sprites['front_default'];
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
}
const closePopup = () =>{
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup)
}
fetchPokemon();
