Template.home.helpers({
	"spotifySrc": function() {
		return Session.get("spotifySrc");
	}
});

Template.home.events({
	"click #searchTracks": function() {
		$.get("https://api.spotify.com/v1/search", {"q": "Muse", "type": "track"}, function(data) {
			var first = data.tracks.items[0].uri;
			Session.set("spotifySrc", "https://embed.spotify.com/?uri=" + first);
		});
	}
});

Template.home.onRendered(function(){
	Meteor.call("listGenres", function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(data);
		}
	});
});