apiURL = "http://moviesapi.dev/api/movies"

var App = Vue.extend({});

var register = Vue.extend({
    template: '#register',

    data: function(){
        return {
            name: '',
            email: '',
            password:'',
            message: '',
            success: '',
            error: ''
        }
    },

    http:{
        headers:{
            'Accept' : 'json',
            'Content-Type' : 'application/hal+json',
            'Authorization' : 'Basic aXZhbjpwYXNzd29yZA=='
        }
    },

    methods: {
        registerUser: function(event){
            event.preventDefault();
            var data = {
                '_links':{
                    'type' : {
                        'href' : 'http://moviesapi.dev/rest/type/user/user'
                    }
                },
                'name':[
                    {
                        'value' : this.name
                    }
                ],
                'mail':[
                    {
                        'value' : this.email
                    }
                ],
                'pass':[
                    {
                        'value' : this.password
                    }
                ],
                'status':[
                    {
                        'value' : '1'
                    }
                ],
                'roles':[
                    {
                        'target_id' : 'administrator'
                    }
                ]
            }

            this.$http.post('http://moviesapi.dev/entity/user', data, function(response){
                this.$set('message', 'You have registered! Yaaaay! :)');
                this.$set('success', true)
            }).error(function(response){
                this.$set('message', 'Something went wrong! Please check your info and try again.');
                this.$set('error', true);
            });
        }
    }
})

var editMovie = Vue.extend({
    template: '#edit-movie',

    data: function(){
        return {
            movie: '',
            title: '',
            body: ''
        }
    },

    ready: function(){
        this.getTheMovie();
    },

    methods: {
        getTheMovie: function(){
            this.$http.get(apiURL + '/' + this.$route.params.movieID, function(movie){
                this.$set('movie', movie);
            })
        },

        updateTheMovie: function(event){
            event.preventDefault();
            var data = {
                '_links':{
                    'type' : {
                        'href' : 'http://moviesapi.dev/rest/type/node/movies'
                    }
                },
                'title':[
                    {
                        'value' : this.title
                    }
                ],
                'body':[
                    {
                        'value' : this.body
                    }
                ]
            }

            this.$http.patch('http://moviesapi.dev/node/' + this.$route.params.movieID, data, function(response){
                this.$route.router.go('/');
            },{
                headers:{
                    'Accept' : 'json',
                    'Content-Type' : 'application/hal+json',
                    'Authorization' : 'Basic aXZhbjpwYXNzd29yZA=='
                }
            });
        }
    }
})

var deleteMovie = Vue.extend({
    template: '#delete-movie',
    http:{
        headers:{
            'Accept' : 'json',
            'Content-Type' : 'application/hal+json',
            'Authorization' : 'Basic aXZhbjpwYXNzd29yZA=='
        }
    },

    methods:{
        deleteTheMovie: function(){
            this.$http.delete('http://moviesapi.dev/node/' + this.$route.params.movieID, function(response){
                this.$route.router.go('/');
            })
        }
    }
});

var createMovie = Vue.extend({
    template: '#create-movie',

    data: function(){
        return {
            title: '',
            body: '',
            success:''
        }
    },

    http:{
        headers:{
            'Accept' : 'json',
            'Content-Type' : 'application/hal+json',
            'Authorization' : 'Basic aXZhbjpwYXNzd29yZA=='
        }
    },

    ready: function(){
        //this.createTheMovie();
    },

    methods: {
        createTheMovie: function(event){
            event.preventDefault();
            var data = {
                '_links':{
                    'type' : {
                        'href' : 'http://moviesapi.dev/rest/type/node/movies'
                    }
                },
                'title':[
                    {
                        'value' : this.title
                    }
                ],
                'body':[
                    {
                        'value' : this.body
                    }
                ]
            }

            this.$http.post('http://moviesapi.dev/entity/node', data, function(response){
                this.$set('success', 'ok');
                this.$set('title', '');
                this.$set('body', '');
            });
        }
    }
})

var movieList = Vue.extend({
    template: '#movie-list-template',

    data: function() {
        return {
            movies: '',
            liveFilter: '',
            genreFilter: '',
            genres: '',
            movie:'',
            loading: false
        }
    },

    ready: function(){
        this.getMovies();
    },

    methods: {
        getMovies: function(){
            this.$set('movie', '');
            this.$set('loading', true);
            
            this.$http.get(apiURL, function(movies){
                this.$set('loading', false);
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
            movie:'',
            loading: false
        }
    },

    ready: function(){
        this.getTheMovie();
    },

    methods: {
        getTheMovie: function(){
            this.$set('loading', true);
            this.$http.get(apiURL + '/' + this.$route.params.movieID, function(movie){
                this.$set('loading', false);
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
    'create':{
        component: createMovie
    },
    'movie/:movieID':{
        name: 'movie',
        component: singleMovie
    },
    'delete/:movieID':{
        name: 'delete',
        component: deleteMovie
    },
    'edit/:movieID':{
        name: 'edit',
        component: editMovie
    },
    'register':{
        component: register
    },
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