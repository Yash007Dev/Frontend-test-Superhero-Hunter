// Define constants for API access
const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1; // Timestamp (you may want to use a dynamic timestamp)
const publicKey = "0a48b66c5a52e6794100099555521ded"; // Marvel API public key
const hash = "d6b07ef4cc9c9b4f38214d904294ed4b"; // Hash for authentication

// Initialize an empty array to store superhero data
var superheroArrayList = [];

// Get references to HTML elements
const superheroList = document.getElementById("superhero-list");
const searchKey = document.getElementById("search-key");

// Function to fetch all superheroes
async function fetchAllSuperhero() {
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

// Function to fetch superheroes with a specific name
async function fetchSuperheroWithName(name) {
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

// Function to add superheroes to the HTML list
function addToList(results) {
    superheroList.innerHTML = "";
    results.map((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="container">
                            <p> ${item.name} </p>
                            <img height="300" width="300" src=${item.thumbnail.path}.${item.thumbnail.extension} />
                            <a target="_blank" href="details.html?id=${item.id}"> <button> <u> Basic Details </u> </button> </a>
                        </div>`;

        superheroList.append(li);
    })
}

// Event listener for keyup in the search input
searchKey.addEventListener('keyup', () => {
    const searchKeyVal = searchKey.value.trim();

    // If the search input is empty, fetch all superheroes
    if (searchKeyVal == 0) {
        fetchAllSuperhero();
    }

    // If the search input length is less than 2 characters, return
    if (searchKeyVal.length < 2) {
        return;
    }

    // Fetch superheroes with the entered name
    fetchSuperheroWithName(searchKeyVal);
})

// Fetch all superheroes initially when the page loads
fetchAllSuperhero();
