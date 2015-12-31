apiURL = "http://moviesapi.dev/api/movies"

var hello = Vue.extend({
    template: '#hello',

    data: function(){
        return {
            message: 'Hello World'
        }
    }
})

var aboutus = Vue.extend({
    template: '#about-us'
})

var App = Vue.extend({});
var router = new VueRouter();

router.map({
    '/hello':{
        component: hello
    },
    '/about-us':{
        component: aboutus
    }
});

router.start(App, '#app');



new Vue({
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
})