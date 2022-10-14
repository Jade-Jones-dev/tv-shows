//You can edit ALL of the code here
let allEpisodes = [];
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// for episode of allEpisodes
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

//fixing search element issue
const searchFunctionEl = document.querySelector(".search-functions")
const episodesList = document.getElementById("episodes");
rootElem.append(searchFunctionEl, episodesList)

let inputEl = document.getElementById("searchInput");
inputEl.addEventListener('input', searchForEpisodes)
let searchResults = document.createElement('p')


  let selectElement = document.createElement("select");
  selectElement.className = 'select'
	let optionElement = document.createElement("option");
  searchFunctionEl.append(selectElement);
  selectElement.innerHTML = "search for a show";
  //why is the text not showing up?? this suggests it is not working properly

  optionElement


//episodeList.forEach((episode) => {select.add(new Option(titleEl = `${episode.name} S${seasonNumber}E${episodeNumber}`))})

searchFunctionEl.append(searchResults)

// need to fix this so it clears after next input
searchResults.innerHTML = `Got ${episodeList.length} episode(s)`;

// creating initial elements for episodes
episodeList.forEach(episode => {
  let cardEl = document.createElement('div');
  let imageEl = document.createElement("img");
  let titleEl = document.createElement('h2');

  let summaryEl = document.createElement('div');
  let seasonNumber
  let episodeNumber

 //adding 0 to episode and season numbers

    if (episode.season < 10) {
      seasonNumber = `0${episode.season}`
      }
      else {
        seasonNumber = episode.season
      }
    
    if (episode.number < 10) {
					episodeNumber = `0${episode.number}`;
			} else {
					episodeNumber = episode.number;
			}
		
  cardEl.className = 'card';
  titleEl.className = 'title';
  imageEl.className = 'img';
  summaryEl.className = 'summary';

  titleEl.innerText = `${episode.name} S${seasonNumber}E${episodeNumber}`;
  imageEl.setAttribute("src" , episode.image.medium);
  summaryEl.innerHTML = episode.summary;

  // use append rather than append child so that you can do multiple elemnts t once
  cardEl.append(imageEl, titleEl, summaryEl);
  episodesList.append(cardEl);
}) 

}

function searchForEpisodes() {
	const searchInput = document.getElementById("searchInput").value;
	const allEpisodes = getAllEpisodes();
	const filteredEpisode = allEpisodes.filter((episode) => {
		return (
			episode.name.toLowerCase().includes(searchInput.toLowerCase()) ||
			episode.summary.toLowerCase().includes(searchInput.toLowerCase())
		);
	});
	const episodeResults = document.getElementById("episodes");
	episodeResults.innerHTML = "";
	makePageForEpisodes(filteredEpisode);
  searchResults.innerHTML = `Got ${episodeList.length} episode(s)`;
}

// create the function
// create an option
// set the text
// append the options



// next steps finding how to do the search function
// create a dynamic search feature





window.onload = setup;
