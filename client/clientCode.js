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
		console.log(e.target.filterOption.value);
		if(e.target.filterOption.value === "artist") {
			console.log(e.target.artistName.value);
		}
		else {
			console.log(e.target.genreSelect.value);
		}
		console.log(parseInt(e.target.duration.value));
	}
});