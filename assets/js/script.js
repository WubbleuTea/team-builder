var submitBtn = document.getElementById("submitted-pokemon");
var formEl = document.getElementById("pokemon-form");
var submitNameEl  = document.getElementById("typed-name");
var pokemonContainerEl = document.getElementById("poke-container")
var pokemonName = "";

function fetchSelectedPokemon(){
  var searchName = pokemonName.replace(/\s/g, '-')
  fetch('https://pokeapi.co/api/v2/pokemon/' + searchName).then(function(response){
    if (response.ok) {
      pokemonContainerEl.innerHTML = '';
      response.json().then(function(selectedpokemon) {
      console.log(selectedpokemon)
      var chosenPokemon = document.createElement("div")
        chosenPokemon.innerHTML = "<h2>" + pokemonName.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + "</h2>" +
          "<img src='"+ selectedpokemon.sprites.front_default +"' ></img>" + 
          "<p>"+ selectedpokemon.types[0].type.name +"</p>" +
          "<p>"+ selectedpokemon.types[1].type.name +"</p>"
        pokemonContainerEl.appendChild(chosenPokemon)
      })
    } else {
      alert("Pokemon not found.\nPlease check your spelling and try again.")
      return
    }
  });
};       
// function fetchKantoPokemon(){
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=251')
//      .then(response => response.json())
//      .then(function(allpokemon){
//      allpokemon.results.forEach(function(pokemon){
//        fetchPokemonData(pokemon); 
//      })
//      function fetchPokemonData(pokemon){
//         let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
//           fetch(url)
//           .then(response => response.json())
//           .then(function(pokeData){
//           renderPokemon(pokeData)
//           })
//         }
//     })
//    }
//    function renderPokemon(pokeData){
//     let allPokemonContainer = document.getElementById('poke-container');
//     let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
//     let pokeName = document.createElement('h4')
//     pokeName.innerText = pokeData.name
//     let pokeNumber = document.createElement('p')
//     pokeNumber.innerText = `#${pokeData.id}`
//     let pokeTypes = document.createElement('ul') 
//     //ul list will hold the pokemon types
//     createTypes(pokeData.types, pokeTypes) 
//     // helper function to go through the types array and create li tags for each one
//     pokeContainer.append(pokeName, pokeNumber, pokeTypes);   
//     //appending all details to the pokeContainer div
//     allPokemonContainer.appendChild(pokeContainer);       
//     //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
//     }

//     function createTypes(types, ul){
//         types.forEach(function(type){
//         let typeLi = document.createElement('li');
//         typeLi.innerText = type['type']['name'];
//         ul.append(typeLi)
//         })
//       }
//       //this site for images does not work.
//       function createPokeImage(pokeID, containerDiv){
//         let pokeImage = document.createElement('img')
//         pokeImage.srcset =  `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
//         containerDiv.append(pokeImage);
//       }

// fetchKantoPokemon();
submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  pokemonName = submitNameEl.value.trim().toLowerCase();
  formEl.reset();
  fetchSelectedPokemon(pokemonName)
})