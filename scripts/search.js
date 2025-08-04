// Thank you to the minisearch library for this capability. It wasn't terribly difficult to implement, espeically given I have VERY little experience with JS. 
// Code here was copy-paste-modified from the code used to make https://lucaong.github.io/minisearch/demo/
// Starting with search index 22 and onwards, the teams field is in logical order (home team in the second slot)

const $searchInput = document.querySelector('.search input')
const $search = document.querySelector('.search')
const $cardList = document.querySelector('.results .results_list')
const $suggestionList = document.querySelector('.suggestion_list')
const $main = document.querySelector('.search-wrap')
const $options = document.querySelector('.filters form')
const $resultsHeader = document.querySelector('.results_header')

const miniSearch = new MiniSearch({
  fields: ['brand', 'series', 'player', 'card_number', 'player_team', 'print_year', 'play_month', 'teams', 'inning_topbot', 'inning', 'play_keywords'],
  storeFields: ['brand', 'print_year', 'series', 'player', 'card_number', 'player_team', 'url'],
  processTerm: (term) => term.toLowerCase()
})


fetch('/cards/search_index.json')
.then(response => response.json())
.then((index) => {
  return miniSearch.addAll(index)
})


// Typing into search bar updates search results and suggestions
$searchInput.addEventListener('input', (event) => {
  const query = $searchInput.value

  const results = (query.length > 1) ? getSearchResults(query) : []
  console.log(results)
  
  if (results.length >= 1) $resultsHeader.style.display = "block"
  renderSearchResults(results)

  
  

})




// Changing any advanced option triggers a new search with the updated options
// $options.addEventListener('change', (event) => {
//   const query = $searchInput.value
//   const results = getSearchResults(query)
//   renderSearchResults(results)
// })

// Define functions and support variables
// Change this with other default search options
const searchOptions = {
  fields: ['brand', 'series', 'player', 'card_number', 'player_team', 'print_year', 'play_month', 'teams', 'inning_topbot', 'inning', 'play_keywords'],
  combineWith: 'OR',
  fuzzy: 0.2,
  boost: {
    player: 3,
    player_team: 2,
    teams: 3,
    play_keywords: 2
  }
}

const getSearchResults = (query) => {
  // const searchOptions = getSearchOptions()
  
  return miniSearch.search(query, searchOptions)
}




const renderSearchResults = (results) => {
  
  $cardList.innerHTML = results.map(({ brand, print_year, series, player, card_number, player_team, url }) => {
    return `<li class="card">
      <h3>${capitalize(brand) + " " + print_year + " " + capitalize(series)}</h3>
      <h3>${capitalize(player)}</h3>
      <dl>
        <dt>Card Number:</dt> <dd>${card_number}</dd>
        <dt>Team:</dt> <dd>${capitalize(player_team)}</dd>
        <dt><a href="${url}">View Card Page</a></dt><dd></dd>
      </dl>
    </li>`
  }).join('\n')

}


// const getSearchOptions = () => {
//   const formData = new FormData($options)
//   const searchOptions = {}

//   const team_filter = formData.get('team_filter')
//   const brand_filter = formData.get('brand_filter')
//   const play_year_filter = parseInt(formData.get('play_year_filter'), 10)
//   const play_month_filter = formData.get('play_month_filter')
//   const play_inning_filter = parseInt(formData.get('play_inning_filter'), 10)

//   if (team_filter == "all") team_filter = null
//   if (brand_filter == "all") brand_filter = null
//   if (play_year_filter == "all") play_year_filter = null
//   if (play_month_filter == "all") play_month_filter = null
//   if (play_inning_filter == "all") play_inning_filter = null


//   searchOptions.filter = ({ player_team, brand, play_year, play_month, inning}) => {
//     play_year = parseInt(play_year, 10)
//     inning = parseInt(inning, 10)
//     return capitalize(player_team) == team_filter && capitalize(brand) == brand_filter && play_year == play_year_filter && capitalize(play_month) == play_month_filter && inning == play_inning_filter
//   }

//   return searchOptions
// }


const capitalize = (input) => {
  if(!input) return

  if (Array.isArray(input)) {
    const splitItems = input.map((item) => item.split(" "))

    const capitalizeItems = splitItems.map(item => item.map((word) => word.charAt(0).toUpperCase() + word.slice(1)))

    const joinedCapitalizedItems = capitalizeItems.map((items) => items.join(" "))

    return joinedCapitalizedItems.join(", ")
  }

  if (typeof input == "string") {
    return input.replace(/(\b\w)/gi, (char) => char.toUpperCase())
  }
}








