// Get reference to the HTML element with id 'list'
var list = document.getElementById('list');

// Define a constant for the key used to store data in local storage
const SUPERHERO_KEY = 'superhero';

// Function to get an array of favorite superheroes from local storage
function getItemFromLS() {
    var favSuperHeroArray = JSON.parse(localStorage.getItem(SUPERHERO_KEY));

    // If no data is found in local storage, initialize an empty array
    if (!favSuperHeroArray) {
        favSuperHeroArray = [];
    }

    return favSuperHeroArray;
}

// Function to remove an item (superhero) from the local storage
function removeItemFromLS(item) {
    var favSuperHeroArray = getItemFromLS();
    
    // Filter out the item to be removed from the array
    favSuperHeroArray = favSuperHeroArray.filter((tempItem) => {
        return item != tempItem;
    });
    
    // Update the local storage with the filtered array
    localStorage.setItem(SUPERHERO_KEY, JSON.stringify(favSuperHeroArray));
}

// Function to fetch and display all favorite superheroes
async function getAllSuperhero() {
    var favouriteSuperHeroArray = getItemFromLS();
    
    // Iterate through the favorite superhero IDs and fetch details for each
    favouriteSuperHeroArray.map(async (item) => {
        let resp = await fetch(`https://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=0a48b66c5a52e6794100099555521ded&hash=d6b07ef4cc9c9b4f38214d904294ed4b`);
        let data = await resp.json();
        data = data.data.results[0];
        var li = document.createElement('li');
        console.log(data);
        
        // Populate the list item with superhero data and a remove button
        li.innerHTML = `<div class="container">
                            <p data-id=${data.id}>${data.name}</p>
                            <img height="250" width="250" src=${data.thumbnail.path}.${data.thumbnail.extension}>
                            <button class='removeFromFav'><u>Remove from Favourites</u></button>
                        </div>`;
        list.append(li);

        // Add a click event listener to the remove button to remove the superhero
        li.getElementsByClassName('removeFromFav')[0].addEventListener('click', function () {
            removeItemFromLS(data.id);
            // Reload the page to reflect the updated list of favorite superheroes
            location.reload();
        });
    })
}

// Call the function to fetch and display all favorite superheroes when the page loads
getAllSuperhero();
