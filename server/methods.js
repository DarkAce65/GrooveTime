Meteor.methods({
	"getAccessToken": function() {
		// encoded is base64 encoding of id:secret
		var data = HTTP.post("https://accounts.spotify.com/api/token", {
			"headers": {
				"Authorization": "Basic YzQ5OGQ1ZGJkNjM1NDk1YWJmYmQ1MmY0OGM0NWRhNTg6NzlhN2E2MDQzOGUzNDAwYzk5MzVmNWY4MGJkNWYxZmU"
			},
			"params": {"grant_type": "client_credentials"}
			// "params": "grant_type=client_credentials"
		});
		return data.data.access_token;
	},
	"listGenres": function(accessToken) {
		var data = HTTP.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data;
	},
	"getTracksByGenre": function(accessToken, genre) {
		var data = HTTP.get("https://api.spotify.com/v1/search", {
			"content": "q=genre:" + genre,
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data;
	},
	"getTracksByArtist": function(accessToken, artist) {
		var data = HTTP.get("https://api.spotify.com/v1/search", {
			"content": "q=artist:" + artist,
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data;
	},
	"getTracksWithinLength": function(tracks, length) {
		var packer = new GrowingPacker();
	}

});