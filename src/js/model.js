import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON }  from './helpers.js';


export const state = {
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    league: {
        id: null,
        name: '',
        logos: {},
        seasons: [],
        curSeason: {},
        standings: [],    
    }
};

export const searchLeagues = async function(query){
    try{
        const data = await getJSON(API_URL);
        const leagues = data.data.filter(league => league.name.toLowerCase().indexOf(query) >= 0);

        state.search.query = query;
        state.search.results = leagues;
    }
    catch(error){
        throw error;
    }
}

export const getSearchResultsPage = function(page = state.search.page){

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);

};

export const searchStanding = async function(leagueCode, season){
    try{        
        const data = await getJSON(`${API_URL}/${leagueCode}/standings?season=${season.year}&sort=asc`);
        state.league.standings = data.data.standings;
        state.league.curSeason = season;
    }
    catch(error){
        throw error;
    }
}

export const searchLeague = async function(leagueCode){
    try {
        const data = await getJSON(`${API_URL}/${leagueCode}`);
        const league = data.data;
        state.league.id = league.id;
        state.league.name = league.name;
        state.league.logos = league.logos;
    } 
    catch (error) {
        throw error;
    }
}

export const searchSeasons = async function(leagueCode){
    try {
        const data = await getJSON(`${API_URL}/${leagueCode}/seasons`);
        state.league.seasons = data.data.seasons;
    } 
    catch (error) {
        throw error;
    }
}