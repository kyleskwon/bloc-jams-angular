(function() {
    function LandingCtrl() {
        this.heroTitle = "Auditory";
    }
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();