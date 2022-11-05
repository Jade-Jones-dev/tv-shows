//You can edit ALL of the code here
// initial variables
const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
let allEpisodes;
let seasonNumber;
let episodeNumber;
let url = "https://api.tvmaze.com/shows/82/episodes";

fetch(url)
	.then((response) => response.json()) //necessary to get json response
	.then((data) => (allEpisodes = data)); //storing the data in the variable

// initial functions
function setup() {
	makePageForEpisodes(allEpisodes);
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

// creating dropdown
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

// adding event listener to the dropdown
episodeDropdown.addEventListener("change", function (e) {
	let selectedEpisode = e.target.value;
	let matchedEpisode = allEpisodes.filter((episode) => {
		return selectedEpisode == `E${episode.season}S${episode.number}`;
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(matchedEpisode);
});

window.onload = setup;
