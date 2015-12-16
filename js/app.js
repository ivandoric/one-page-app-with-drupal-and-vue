apiURL = "http://moviesapi.dev/api/movies"

new Vue({
    el: '#app',

    data: {
        hello: 'Hello World, Again!',
        names: [
            {firstname: 'John', lastname:'Doe'},
            {firstname: 'Jane', lastname:'Jones'},
            {firstname: 'Will ', lastname:'Smith'}
        ]
    },

    ready: function(){
        this.getMovies();
    },

    methods: {
        getMovies: function(){
            this.$http.get(apiURL, function(movies){
                this.$set('movies', movies);
                console.log(movies);
            });
        }
    }
})