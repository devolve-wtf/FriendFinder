const friends = require('../data/friends.js');

module.exports = function(app, path) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        let user = req.body;
        let match = {
            index: -1,
            score: -1
        }

        for(friend in friends) {
            let friendScores = friends[friend].scores;
            let difference = 0;

            for(score in friendScores) {
                difference += Math.abs(friendScores[score] - user.scores[score]);
            }

            if(match.score === -1) {
                match.index = friend;
                match.score = difference;
            }else if(difference < match.score) {
                match.index = friend;
                match.score = difference;
            }
        }

        res.json(friends[match.index]);
    });
}