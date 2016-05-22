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
		if(Session.get("genres")) {
			return Session.get("genres");
		}
		return [];
	},
	"spotifySrc": function() {
		var spotifySrc = "https://embed.spotify.com/?uri=spotify:trackset:GrooveTime:";
		var tracks = Session.get("tracks");
		for (var i = 0; i < tracks.length; i++) {
			spotifySrc += tracks[i].id + ",";
		}
		return spotifySrc;
	}
});

Template.home.events({
	"submit form": function(e) {
		e.preventDefault();
		var duration = parseInt(e.target.duration.value);
		if(e.target.filterOption.value === "artist") {
			Meteor.call("getTracksByArtist", Session.get("accessToken"), e.target.artistName.value, function(err, data){
				Meteor.call("getTracksWithinLength", data.items, duration, function(err, data){
					Session.set("tracks", data);
				});
			});
		}
		else {
			Meteor.call("getTracksByGenre", Session.get("accessToken"), e.target.genres.value, function(err, data){
				Meteor.call("getTracksWithinLength", data.items, duration, function(err, data){
					Session.set("tracks", data);
				});
			});
		}
	}
});