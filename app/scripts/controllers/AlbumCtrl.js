(function() {
    function AlbumCtrl() {
        this.albumData = this.push(angular.copy(albumPicasso));
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();