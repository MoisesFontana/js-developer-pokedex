const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokeId = urlParams.get('pokeId')

//-- Código baseado no projeto encontrado em
//-- https://github.com/Siphiwo/pokemon-codex-search

//-- API https://pokeapi.co/docs/v2#pokemon
const getPokemonData = async term => {

        
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`
    const response = await fetch(url)

    const pokemon = await response.json()

    // update ui with data 
    document.getElementById('poke-id').innerHTML = `#${pokemon.id}`
    document.getElementById('poke-img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('poke-name').innerHTML = pokemon.name
    document.getElementById('poke-weight').innerHTML = `${pokemon.weight}kg`
    document.getElementById('poke-height').innerHTML = `0.${pokemon.height}m`
    document.getElementById('poke-type').innerHTML = `<span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>`
    document.getElementById('container').classList.add(pokemon.types[0].type.name)
    document.getElementById('poke-type').classList.add(pokemon.types[0].type.name)
    document.getElementById('poke-ability').innerHTML = ` ${pokemon.abilities[0].ability.name}`
    document.getElementById('poke-ability').innerHTML += `, ${pokemon.abilities[1].ability.name}`
    document.getElementById('poke-type').innerHTML += `<span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>`

}

getPokemonData(pokeId)