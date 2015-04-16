(function(window, $) {
  "use strict";

  responsiveNav('.nav-collapse');

  var truncate = function(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  var showAlbums = function(albums) {
    var albumData = _.map(albums.feed.entry, function(album) {
      var title = truncate(album.title.$t, 20);
      var thumbnail = album.media$group.media$thumbnail[0].url;
      var url = _.find(album.link, function(link) { return link.rel === 'alternate'; }).href;

      return {title: title, thumbnail: thumbnail, url: url};
    });

    var template = _.template($('#albums-template').html());
    var albumHtml = template({albums: albumData});
    $('#albums').html(albumHtml);
  };

  if (window.albums) {
    showAlbums(window.albums);
  } else {
    window.storeAlbums = showAlbums;
  }
})(window, $);