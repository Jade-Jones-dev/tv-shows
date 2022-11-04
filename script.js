//You can edit ALL of the code here
// initial variables
const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
const searchDropdownEl = document.getElementById('searchDropdown')
const showList = document.getElementById("shows");
let allEpisodes;
let seasonNumber;
let episodeNumber;
let url = "https://api.tvmaze.com/shows/82/episodes";
let showsUrl = "https://api.tvmaze.com/shows";
let allShows = getAllShows();
let showsList


// initial functions
function setup() {
	
	 fetch(showsUrl)
			.then((response) => response.json())
			.then((data) => {
				allShows = data;
				getAllShows();
			});
			// hides episode searches
			let search = document.getElementById("search-function");
			search.style.display = "none";
		makePageForShows(allShows);
		

}

function makePageForShows(showsList) {
  		showsList.sort((a, b) => {        let aShow = a.name.toLowerCase();
    	let bShow = b.name.toLowerCase();
    	return aShow < bShow ? -1 : 1})
        rootElem.textContent = ` ${showsList.length} shows(s)`;
		showsList.forEach((show) => {
		let aEl = document.createElement("a")
		let cardEl = document.createElement("div");
		let option = document.createElement('option')
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let optionA =document.createElement("a")
		// titleEl.id = show.id;
		option.className ='option'
		cardEl.className = "card";
		cardEl.id = show.id
		aEl.setAttribute('href', "episodes.html?id=" + show.id)
		titleEl.className = "title";
		option.setAttribute("href", "episodes.html?id=" + show.id);
		option.innerText =`${show.name}`;
		option.value = "episodes.html?id=" + show.id
		titleEl.innerText = `${show.name}`;
		imageEl.setAttribute("src", show.image.medium);
		imageEl.className = "img";
		cardEl.append(imageEl, titleEl,);
		aEl.append(cardEl)
		showList.append(aEl);
		searchDropdownEl.append(option);
	})
		
}


// creating the initial cards for episodes
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	
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

document.getElementById("s").onchange = function () {
	myFunction();
};

function myFunction() {
	var x = document.getElementById("fname");
	return 
}

window.onload = setup;
