function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

Template.home.onRendered(function(){
	Meteor.call("getAccessToken", function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			Session.set("accessToken", data);
			Meteor.call("listGenres", data, function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					Session.set("genres", data);
				}
			});
		}
	});
});

Template.home.helpers({
	"genres": function() {
		var genres = Session.get("genres");
		if(genres) {
			for(var i = 0; i < genres.length; i++) {
				genres[i] = toTitleCase(genres[i]);
			}
			return genres;
		}
		return [];
	},
	"spotifySrc": function() {
		var spotifySrc = "https://embed.spotify.com/?uri=spotify:trackset:GrooveTime:";
		var tracks = Session.get("tracks");
		for (var i = 0; i < tracks.length; i++) {
			spotifySrc += tracks[i].id + ",";
		}
		spotifySrc = spotifySrc.slice(0, -1) + "&theme=white";
		return spotifySrc;
	}
});

Template.home.events({
	"submit form": function(e) {
		e.preventDefault();
		var duration = Math.max(parseInt(e.target.duration.value), 4);
		if(e.target.filterOption.value === "artist") {
			var artistName = e.target.artistName.value;
			Meteor.call("getTracksByArtist", Session.get("accessToken"), artistName, function(err, data){
				Meteor.call("getTracksWithinLength", data.items, duration, function(err, data){
					Session.set("tracks", data);
				});
			});
		}
		else {
			var genre = e.target.genreSelect.value;
			Meteor.call("getTracksByGenre", Session.get("accessToken"), genre, function(err, data){
				Meteor.call("getTracksWithinLength", data.items, duration, function(err, data){
					Session.set("tracks", data);
				});
			});
		}
	}
});