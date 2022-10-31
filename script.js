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
let allShows = getAllShows();



fetch(url)
.then((response) => response.json())//necessary to get json response 
.then((data) => (allEpisodes = data))//storing the data in the variable

// initial functions
function setup() {
	makePageForEpisodes(allEpisodes); 
	dropDownMenu2(allShows);
}

// creating the initial cards for episodes
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = ` ${episodeList.length} episode(s)`;
	episodeList.forEach((episode) => {
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
    	let seasonEl = document.createElement("h3")
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
function dropDownMenu(episodeList){
  episodeList.forEach((episode) =>{
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
		optionEl.value = `E${episode.season}S${episode.number}`
		episodeDropdown.append(optionEl);
	})
  
}

// adding event listener to the dropdown
episodeDropdown.addEventListener('change', function(e){

	let selectedEpisode = e.target.value
	let matchedEpisode = allEpisodes.filter((episode) => {
	return selectedEpisode == `E${episode.season}S${episode.number}`;
		 }	
	)
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(matchedEpisode);
})

// create a show selector
function dropDownMenu2(allShows) {
	allShows.forEach((show) => {
		let optionEl = document.createElement("option");
		optionEl.innerHTML = `${show.name}`;
		optionEl.value = `${show.id}`;
		searchDropdown.append(optionEl);
	});


}
//TODO sort the event listener out on dropdown
searchDropdown.addEventListener("change",function (e){
	let show = e.target.value;
	url = `https://api.tvmaze.com/shows/${show.id}/episodes`;
	let results = document.getElementById("episodes");
	results.innerHTML = " ";
	makePageForEpisodes(url);
	
});

//sorts the shows into alphabetical order

allShows.sort((a, b) => {
	if (a.name.toLowerCase() > b.name.toLowerCase()) {
		return 1;
	} else if (b.name.toLowerCase() > a.name.toLowerCase()) {
		return -1;
	} else {
		return 0;
	}
});


/*
Add a select input which allows you to choose which show you are interested in
When a show is selected, your app should display the episodes for that show as per the earlier levels of this challenge, except that it should first fetch the episode list from the API - see below
You can get the list of shows by loading shows.js in your index.html and using the provided function: getAllShows()
*/

//display the page

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
