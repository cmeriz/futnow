import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON }  from './helpers.js';


export const state = {
    league: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
};

export const searchLeagues = async function(query){
    try{
        const data = await getJSON(API_URL);
        const leagues = data.data.filter(league => league.name.toLowerCase().indexOf(query) >= 0);
        //console.log(leagues);

        state.search.query = query;
        state.search.results = leagues;
    }
    catch(error){
        console.error(error);
    }
}

export const getSearchResultsPage = function(page = state.search.page){

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);

};