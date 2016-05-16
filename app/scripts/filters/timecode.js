(function() {
    function timecode() {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            
            if (Number.isNaN(seconds)) {
                return '-:--';
            }
            
            var output = buzz.toTimer(seconds);
            return output;

//            ----- Custom code -----
//            
//            var wholeSeconds = Math.floor(seconds);
//            var minutes = Math.floor(wholeSeconds / 60);
//            var remainingSeconds = wholeSeconds % 60;
//            
//            var output = minutes + ':';
//            
//            if (remainingSeconds < 10) {
//                output += '0';
//            }
//            
//            output += remainingSeconds;
        };
    }
    
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();