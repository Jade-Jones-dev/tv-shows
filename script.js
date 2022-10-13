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
const episodesList = document.querySelector(".episodes-page");
rootElem.append(searchFunctionEl, episodesList)


//search
let input = document.createElement("input");
input.type = "search";
input.className ="search-episodes";
input.placeholder = "search episodes";
let searchResults = document.createElement("p");
searchResults.id = "search-results";

searchFunctionEl.append(input, searchResults);




// need to add an event listener, can i add class list like on my card project??




// creating initial elements for episodes
episodeList.forEach(episode => {
  let cardEl = document.createElement('div');
  let titleEl = document.createElement('h2');
  let imageEl = document.createElement('img');
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
  cardEl.append(titleEl, imageEl, summaryEl);
  episodesList.append(cardEl);
}) 

}









// next steps finding how to do the search function
// create a dynamic search feature





window.onload = setup;
