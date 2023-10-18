export const GENRE = Object.freeze({
    ACTION:28,
    ADVENTURE:12,
    ANIMATION:16,
    COMEDY:35,
    CRIME:80,
    DOCUMENTARY:99,
    DRAMA:18,
    FAMILY:10751,
    FANTASY:14,
    HISTORY:36,
    HORROR:27,
    MUSIC:10402,
    MYSTERY:9648,
    ROMANCE:10749,
    SCIENCE_FICTION:878,
    TV_MOVIE:10770,
    THRILLER:53,
    WAR:10752,
    WESTERN:37
});

export const STATUS = Object.freeze({
    IDLE:0,
    FETCHING:1,
    LOADING:2,
    REFRESH:3,
});

export const MOVIE_STATUS = Object.freeze({
    IN_CART:0,
    PURCHASED:1,
    STARTED_WATCHING:2,
    FINISHED_WATCHING:3,
});


export function movieStatusToLabel(movie_status){
    switch(MOVIE_STATUS[movie_status]){
        case GENRE.IN_CART: return "Movie is in cart";
        case GENRE.PURCHASED: return "Movie is purchased";
        case GENRE.STARTED_WATCHING: return "Movie has run more then one second";
        case GENRE.FINISHED_WATCHING: return "Movie has reached its end";
        default:return "";
    }
}


export function genreToLabel(genre){
    switch(GENRE[genre]){
        case GENRE.ACTION: return "Action";
        case GENRE.ADVENTURE: return "Adventur";
        case GENRE.ANIMATION: return "Animation";
        case GENRE.COMEDY: return "Comedy";
        case GENRE.CRIME: return "Crime";
        case GENRE.DOCUMENTARY: return "Documentary";
        case GENRE.DRAMA: return "Drama";
        case GENRE.FAMILY: return "Family";
        case GENRE.FANTASY: return "Fantasy";
        case GENRE.HISTORY: return "History";
        case GENRE.HORROR: return "Horror";
        case GENRE.MUSIC: return "Music";
        case GENRE.MYSTERY: return "Mystery";
        case GENRE.ROMANCE: return "Romance";
        case GENRE.SCIENCE_FICTION: return "Science fiction";
        case GENRE.TV_MOVIE: return "Tv Movie";
        case GENRE.THRILLER: return "Thriller";
        case GENRE.WAR: return "War";
        case GENRE.WESTERN: return "Western";
        default:return "";
    }
}