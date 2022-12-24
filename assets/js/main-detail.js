const pokemonDetail = document.getElementById('container')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokeId = urlParams.get('pokeId');

//-- Código baseado no projeto encontrado em
//-- https://github.com/Siphiwo/pokemon-codex-search

//-- API https://pokeapi.co/docs/v2#pokemon
const getPokemonData = async id => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)

    const pokemon = await response.json()

//-- Adiciona atributo a classe "container" de acordo com o principal tipo do pokemon
//-- para determinar a cor de fundo da parte superior do card.
    document.getElementById('container').classList.add(pokemon.types[0].type.name)
    
//-- Cria um array com os tipos do Pokemon
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

//-- Cria um array com as abilidades do Pokemon
    const abilities = pokemon.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability


//-- Busca o atributo Egg Group
    const url_species = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const resp_species = await fetch(url_species);
    const poke_species = await resp_species.json();

//-- Cria um array com os Egg Groups do Pokemon
    const eggGroups = poke_species.egg_groups.map((eggSlot) => eggSlot.name)
    const [eggGroup] = eggGroups
    poke_species.eggGroups = eggGroups
    poke_species.eggGroup = eggGroup


//-- Calcula o Gender Rate
//-- The chance of this Pokémon being female, in eighths; or -1 for genderless.
    const genderRate = poke_species.gender_rate;
    const femaleRate = (100 / 8) * genderRate;
    const maleRate = 100 - femaleRate;
    let gender;

    if (genderRate >= 1)
        gender = "Female " + femaleRate + "% - Male " + maleRate + "%";
    else
        gender = "Genderless";

       
//-- Monta o HTML do card com os detalhes do pokemon
    pokemonDetail.innerHTML = `
        <div class="superior">
            <div class="back-and-heart">
                <p><a id="return-link" href="index.html"><i class="arrow left"></i>back</a></p>
                <div class="heart"></div>
            </div>

            <div class="name-type-id">
                <h1 id="poke-name">${pokemon.name}</h1>
                <p id="poke-id" class="poke-id">#${pokemon.id}</p>
                <p id="poke-type">
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                </p>
            </div>
        </div>

        <div class="inferior">
            <div class="image">
                <img id="poke-img" src="${pokemon.sprites.other.dream_world.front_default}" alt="Imagem do pokemon">
            </div>

            <div class="headers">
                <h4 class="active">About</h4>
                <h4>Base Stats</h4>
                <h4>Evolution</h4>
                <h4>Moves</h4>
            </div>
            
            <div class="about">
                <p><span class="left-col">Species</span><span class="right-col">${pokemon.name}</span></p>
                <p><span class="left-col">Height</span><span class="right-col" id="poke-height">0.${pokemon.height}m</span></p>
                <p><span class="left-col">Weight</span><span class="right-col" id="poke-weight">${convertToKg(pokemon.weight)}kg</span></p>
                <p>
                    <span class="left-col">Abilities</span><span class="right-col" id="poke-ability">
                        ${pokemon.abilities.map((ability) => `${ability}`).join(', ')}
                    </span>
                </p>
            </div>

            <div class="about">
                <p><span class="left-col header">Breeding</span></p>
                <p><span class="left-col">Gender</span><span class="right-col">${gender}</span></p>
                <p>
                    <span class="left-col">Egg Groups</span><span class="right-col" id="poke-ability">
                        ${poke_species.eggGroups.map((eggGroup) => eggGroup).join(', ')}
                    </span>
                </p>
                <p><span class="left-col">Egg Cycle</span><span class="right-col">${poke_species.hatch_counter}</span></p>
            </div>
        </div>
    `
}

//-- Chama a função que busca as informações do Pokémon
getPokemonData(pokeId);


//-- Conversão Kg(weight) em decimal
function convertToKg(weight){
    var convertToArray = String(weight).split("").map((kg)=>{
        return Number(kg);  
    })

    let peso = 0;
    let i = 0;
    if (convertToArray.length <= 3) {
        peso = convertToArray[0] + '.';
        i = 1;
    } else {
        peso = convertToArray[0];
        peso += convertToArray[1] + '.';
        i = 2;
    }
    for ( i; i < convertToArray.length; i++) {
        peso += convertToArray[i];
    }
    return peso;
}