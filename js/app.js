apiURL = "http://moviesapi.dev/api/movies"

var App = Vue.extend({});

var movieList = Vue.extend({
    template: '#movie-list-template',

    data: function() {
        return {
            movies: '',
            liveFilter: '',
            genreFilter: '',
            genres: '',
            movie:''
        }
    },

    ready: function(){
        this.getMovies();
    },

    methods: {
        getMovies: function(){
            this.$set('movie', '');
            this.$http.get(apiURL, function(movies){
                this.$set('movies', movies);

                genresArr=[];

                jQuery.each(movies, function(index, movie){
                    jQuery.each(movie.field_genres, function(index, genre){
                        if(jQuery.inArray(genre.value, genresArr) === -1) {
                            genresArr.push(genre.value);
                        }
                    });
                });

                this.$set('genres', genresArr);
                //console.log(JSON.stringify(genresArr));
                
            });
        }
    }
})

var singleMovie = Vue.extend({
    template: '#single-movie-template',

    data: function(){
        return {
            movie:''
        }
    },

    ready: function(){
        this.getTheMovie();
    },

    methods: {
        getTheMovie: function(){
            this.$http.get(apiURL + '/' + this.$route.params.movieID, function(movie){
                this.$set('movie', movie);
                console.log(JSON.stringify(movie));
            })
        }
    }
})


var router = new VueRouter();

router.map({
    '/':{
        component: movieList
    },
    'movie/:movieID':{
        name: 'movie',
        component: singleMovie
    }
});

router.start(App, '#app');



/*new Vue({
    el: '#app',

    data: {
        movies: '',
        liveFilter: '',
        genreFilter: '',
        genres: '',
        movie:''
    },

    ready: function(){
        this.getMovies();
    },

    methods: {
        getMovies: function(){
            this.$set('movie', '');
            this.$http.get(apiURL, function(movies){
                this.$set('movies', movies);

                genresArr=[];

                jQuery.each(movies, function(index, movie){
                    jQuery.each(movie.field_genres, function(index, genre){
                        if(jQuery.inArray(genre.value, genresArr) === -1) {
                            genresArr.push(genre.value);
                        }
                    });
                });

                this.$set('genres', genresArr);
                //console.log(JSON.stringify(genresArr));
                
            });
        },

        getTheMovie: function(movieID){
            this.$http.get(apiURL + '/' + movieID, function(movie){
                this.$set('movie', movie);
                console.log(JSON.stringify(movie));
            })
        }
    }
})*/