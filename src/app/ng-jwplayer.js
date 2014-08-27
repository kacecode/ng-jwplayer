angular.module('ng-jwplayer', [])

.constant('jwplayer', jwplayer)


.controller('jw-video', ['$scope', function ($scope) {
  $scope.$on('playerAssert', function (source, input){
     $scope.$broadcast('playerAsserted', input['id']);
     console.log(input['id']);
  });
}])

.directive('jwplayer', function ($document, $interval, jwplayer) {
  // TODO: Optionally programmatically generate the player ID?
  return {
    restrict: 'E',
    template: '<div></div><div id="{{id}}">Loading...</div>',
  scope: {
    aspectratio: '@',
    autostart: '@',
    file: '@',
    id: '@playerId',
    image: '@',
    mute: '@',
    repeat: '@',
    //skin: '@',
    width: '@'
  },
    link: function (scope, elm, attrs) {
      // We do not know when the template will be built and added to the DOM to bind to
      // poll the DOM until we see the id we need.
      $interval(function () {
        // Check to see if we've polled successfully previously before running hte bootstrapping process.
        if (!scope.ready && $document.find(scope.id)) {
            scope.ready = true;

            // Responds to parent broadcast of player having snagged focus.
            scope.$on('playerAsserted', function (source, input) {
                // If playing and not the id given the right of way, pause.
                if (player.getState() == "PLAYING" && input != scope.id) {
                    player.pause();
                }
            });
            
            scope.$on('$destroy', function () {
              player.remove();
            })

            // Bootstrap JWPlayer
            var player = jwplayer(scope.id).setup({
                aspectratio: scope.aspectratio,
                autostart: scope.autostart,
                file: scope.file,
                mute: scope.mute,
                width: scope.width
            });

            // Notify parent when player is set to play so it can claim focus.
            player.onPlay(function (oldstate) {
               scope.$emit('playerAssert', {id: scope.id});
            });


            /* Programmatic functionality added as needed */
            scope.toggle = function () {
                //scope.$emit('playerAssert', {id: scope.id});
                player.play();
            };

            // unloads the video from the player to free up RAM
            scope.stop = function () {
                player.stop()
            };
        }
      }, 50, 20);  // Arbitrary times. TODO: Test for optimal repetitions to catch the element.
    }
  };
});

