function shuffle(array) { // Fisher–Yates Shuffle
	var m = array.length, t, i;
	while(m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

Meteor.methods({
	"getAccessToken": function() {
		// encoded is base64 encoding of id:secret
		var data = HTTP.post("https://accounts.spotify.com/api/token", {
			"headers": {
				"Authorization": "Basic YzQ5OGQ1ZGJkNjM1NDk1YWJmYmQ1MmY0OGM0NWRhNTg6NzlhN2E2MDQzOGUzNDAwYzk5MzVmNWY4MGJkNWYxZmU"
			},
			"params": {"grant_type": "client_credentials"}
		});
		return data.data.access_token;
	},
	"listGenres": function(accessToken) {
		var data = HTTP.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data.data.genres;
	},
	"getTracksByGenre": function(accessToken, genre) {
		var data = HTTP.get("https://api.spotify.com/v1/search", {
			"params": {
				"q": "genre:\"" + genre + "\"",
				"type": "track"
			},
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data.data.tracks;
	},
	"getTracksByArtist": function(accessToken, artist) {
		var data = HTTP.get("https://api.spotify.com/v1/search", {
			"params": {
				"q": "artist:" + artist,
				"type": "track"
			},
			"headers": {
				"Authorization": "Bearer " + accessToken
			}
		});
		return data.data.tracks;
	},
	"getTracksWithinLength": function(tracks, length) {
		length *= 60000; // min to ms
		var packer = new Packer(length, 1);
		for (var i = 0; i < tracks.length; i++) {
			tracks[i].h = 1;
			tracks[i].w = tracks[i].duration_ms;
		}
		shuffle(tracks);
		packer.fit(tracks);

		console.log(tracks[0]);
		var resultTracks = [];
		for (var i = 0; i < tracks.length; i++) {
			if (tracks[i].fit) {
				resultTracks.push(tracks[i]);
			}
		}
		return resultTracks;
	}
});