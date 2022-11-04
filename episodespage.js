const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
let allEpisodes ;
let seasonNumber;
let episodeNumber;


const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})
let value = params.id;


fetch("https://api.tvmaze.com/shows/" + value + "/episodes")
.then(data => {return data.json()
})
.then(episodes =>{
    makePageForEpisodes(episodes)
})
// initial functions
function setup() {
				
}




// creating the initial cards for episodes
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = ` ${episodeList.length} episode(s)`;
	episodeList.forEach((episode) => {
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let seasonEl = document.createElement("h3");
		let summaryEl = document.createElement("div");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		cardEl.className = "card";
        cardEl.setAttribute =("value", `E${episode.season}S${episode.number}`);
		titleEl.className = "title";
		seasonEl.className = "season";
		imageEl.className = "img";
		summaryEl.className = "summary";
		titleEl.innerText = `${episode.name}`;
		seasonEl.innerText = `S${seasonNumber}E${episodeNumber}`;
		imageEl.setAttribute("src", episode.image.original);
		summaryEl.innerHTML = episode.summary;
		//appending the cards to the the container
		cardEl.append(imageEl, titleEl, seasonEl, summaryEl);
		episodesList.append(cardEl);
	});
	// creating the episode list dropdown menu by calling the function
	dropDownMenu(episodeList);
}

//adding event listener to search box
search.addEventListener("keyup", searchShows);

// creating search function
function searchShows() {
	let search = document.getElementById("search").value;
	const filteredEpisodes = allEpisodes.filter((episode) => {
		return (
			episode.name.toLowerCase().includes(search.toLowerCase()) ||
			episode.summary.toLowerCase().includes(search.toLowerCase())
		);
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(filteredEpisodes);
}

// creating dropdown for episodes
function dropDownMenu(episodeList) {
	episodeList.forEach((episode) => {
		let optionEl = document.createElement("option");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		optionEl.innerHTML = `${episode.name} S${seasonNumber}E${episodeNumber} `;
		optionEl.value = `E${episode.season}S${episode.number}`;
		episodeDropdown.append(optionEl);
	});
}

// adding event listener to the episode dropdown
episodeDropdown.addEventListener("change", function (e) {
   
	let selectedEpisode = e.target.value;
	let matchedEpisode = allEpisodes.filter((episode) => {
		return selectedEpisode == `E${episode.season}S${episode.number}`;
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(matchedEpisode);
    
});

// 

/*
Level 500
Add a shows list and search
Complete all requirements from level 400
When your app starts, present a listing of all shows ("shows listing")
For each show, you must display at least name, image, summary, genres, status, rating, and runtime.
When a show name is clicked, your app should:
fetch and present episodes from that show (enabling episode search and selection as before)
hide the "shows listing" view.
Add a navigation link to enable the user to return to the "shows listing"
When this is clicked, the episodes listing should be hidden
Provide a free-text show search through show names, genres, and summary texts.
Ensure that your episode search and episode selector controls still work correctly when you switch from shows listing to episodes listing and back.
Continue to get the list of shows the same way you did in level 400. (You do not need to fetch it.)
*/

window.onload = setup;
