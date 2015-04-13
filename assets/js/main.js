(function() {
  "use strict";

  $(".js-toggle").on('click', function(event) {
    event.preventDefault();

    var target = $(event.target);
    var toggleId = target.data('toggle-id');
    $('#' + toggleId).toggle();
  });
})();