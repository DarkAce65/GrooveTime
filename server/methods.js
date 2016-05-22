Meteor.methods({
	"listGenres": function() {
		this.unblock();
		try {
			// TODO: header
			var result = HTTP.get("https://api.spotify.com/v1/recommendations/available-genre-seeds");
			return true;
		} catch (e) {
			return false;
		}
	}
});