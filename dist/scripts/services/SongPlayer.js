(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /** ----- PRIVATE ATTRIBUTES -----
        * @desc info for current album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /** ----- PRIVATE FUNCTIONS -----
        * @function setSong
        * @desc stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */      
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc     play a song
        * @param    {Object} song 
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function stopSong
        * @desc     stop a song
        * @param    {Object} song
        */
        var stopSong = function() {
            currentBuzzObject.stop()
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc     gets index from song from album
        * @param    {Object} song
        * @return   {Number}
        */  
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /** ----- PUBLIC ATTRIBUTES ----- 
        * @desc active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /* 
        * @desc current play time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /*
        * @desc volume used for songs
        * @type {Number}
        */
        SongPlayer.volume = 100;
        
        /** ----- PUBLIC METHODS -----
        * @function play
        * @desc play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
        };
        
        /**
        * @function pause
        * @desc pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /** public method
        * @function previous
        * @desc decrease song index by 1
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc set song to next song in album
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*
        * @function setCurrentTime
        * @desc     set current time (in seconds) of currently playing song
        * @type     {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /*
        * @function setCurrentVolume
        * @desc     set volume for songs
        * @type     {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();