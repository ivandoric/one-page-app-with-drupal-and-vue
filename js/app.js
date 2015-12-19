apiURL = "http://moviesapi.dev/api/movies"

new Vue({
    el: '#app',

    data: {
        hello: 'Hello World, Again!',
        names: [
            {firstname: 'John', lastname:'Doe'},
            {firstname: 'Jane', lastname:'Jones'},
            {firstname: 'Will ', lastname:'Smith'}
        ],
        movies: '',
        liveFilter: '',
        genreFilter: '',
        genres: ''
    },

    ready: function(){
        this.getMovies();
    },

    methods: {
        getMovies: function(){
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