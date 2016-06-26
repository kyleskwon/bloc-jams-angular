(function() {
    function LandingCtrl() {
        this.heroTitle = "Pump Up The Jam";
    }
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();