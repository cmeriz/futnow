import * as model from './model.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';


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

        console.log(model.state.search);

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

const init = function(){
    searchView.addHandlerSearch(controlSearch);
};

init();