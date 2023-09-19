
const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;
const publicKey = "0a48b66c5a52e6794100099555521ded";
// const private1 = "a7367e6ad1ca43201b5984358e5df2823226e4ed";
const hash = "d6b07ef4cc9c9b4f38214d904294ed4b";

var superheroArrayList = [];

const superheroList = document.getElementById("superhero-list");
const searchKey = document.getElementById("search-key");

async function fetchAllSuperhero(){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);

}

async function fetchSuperheroWithName(name){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

function addToList(results){
    superheroList.innerHTML = "";
    const li = document.createElement('li');
    results.map((item)=>{
        const li = document.createElement('li');
        li.innerHTML = `<div class="container">
                            <p> ${item.name} </p>
                            <img height="300" width="300" src=${item.thumbnail.path}.${item.thumbnail.extension} />
                            <a target="_blank" href="details.html?id=${item.id}"> <button> <u> Basic Details </u> </button> </a>
                        </div>` ;

        superheroList.append(li);

    })}

searchKey.addEventListener('keyup', ()=>{
    const searchKeyVal = searchKey.value.trim();
    
    if (searchKeyVal ==0){
        fetchAllSuperhero();
    }

    if(searchKeyVal.length < 2){
        return;
    }
    fetchSuperheroWithName(searchKeyVal);
})

fetchAllSuperhero();