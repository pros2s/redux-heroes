export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
};

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
};

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
};

export const fetchingFilters = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
};

export const fetchedFilters = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
};

export const fetchingErrorFilters = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
};

export const filterCharacters = (name) => {
    return {
        type: 'FILTER_CHARACTERS',
        payload: name
    }
};
