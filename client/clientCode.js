Template.home.onRendered(function(){
	Meteor.call("getAccessToken", function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(data);
			Session.set("accessToken", data);
			Meteor.call("listGenres", data, function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log(data);
					Session.set("genres", data.data.genres);
				}
			});
		}
	});
});

Template.home.helpers({
	"genres": function() {
		return Session.get("genres");
	},
	"spotifySrc": function() {
		return Session.get("spotifySrc");
	}
});

Template.home.events({
	"submit form": function(e) {
		e.preventDefault();
		console.log(e);
	},
	"click #searchTracks": function() {
		$.get("https://api.spotify.com/v1/search", {"q": "Muse", "type": "track"}, function(data) {
			var first = data.tracks.items[0].uri;
			Session.set("spotifySrc", "https://embed.spotify.com/?uri=" + first);
		});
	}
});