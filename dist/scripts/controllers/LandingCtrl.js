(function() {
    function LandingCtrl() {
        this.heroTitle = "Pump up the jam";
    }
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();