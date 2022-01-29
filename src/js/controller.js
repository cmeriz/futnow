import * as model from './model.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import leagueView from './views/leagueView.js';


const controlSearch = async function(){
    try{
        // 0) Get Query
        const query = searchView.getQuery();
        if(!query) return;

        // 1) Render Loader
        searchView.renderLoader();

        // 2) Loading Leagues
        await model.searchLeagues(query);

        // 3) Rendering Leagues
        searchView.render(model.getSearchResultsPage());

        // 4) Render Pagination
        paginationView.render(model.state.search, true);
        paginationView.addHandlerClick(controlPagination);
    }
    catch(error){
        alert(error);
    }
}

const controlPagination = function(goToPage){
    // 1) Rendering New Results
    searchView.render(model.getSearchResultsPage(goToPage));

    // 4) Render Pagination
    paginationView.render(model.state.search, true);
    paginationView.addHandlerClick(controlPagination);
};


const controlLeague = async function(leagueCode){
    try{
        // 1) Render Loader
        leagueView.renderLoader();

        // 2) Search League
        await model.searchLeague(leagueCode);

        // 3) Search Seasons
        await model.searchSeasons(leagueCode);

        // 4) Search Standing
        await model.searchStanding(leagueCode, model.state.league.seasons[0]);

        // 4) Render League
        leagueView.render(model.state.league);

        // 5) Add Season Handler
        leagueView.addHandlerSeason(controlSeason);
    }
    catch(error){
        console.log(error);
    }
}

const controlSeason = async function(seasonYear){
    try {
        // 0) Render Loader
        leagueView.renderLoaderStanding();

        // 1) Set Season
        const season = model.state.league.seasons.filter(season => season.year === +seasonYear)[0];
        model.state.league.curSeason = season;

        // 2) Search Standing
        await model.searchStanding(model.state.league.id, season);

        // 3) Render Legue
        leagueView.updateStanding(model.state.league);
    } 
    catch (error) {
        leagueView.renderErrorStanding();
    }
}

const init = function(){
    searchView.addHandlerSearch(controlSearch);
    leagueView.addHandlerLeague(controlLeague);
};

init();