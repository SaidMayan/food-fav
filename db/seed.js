const user = require('../models/user');
const reviews = require('../models/reviews');

// (email, pw_digest, username)

const userSeeds = [
    {email: 'email4@ga.co', pw_digest: 'password4', username: 'emai4'},
    {email: 'email2@ga.co', pw_digest: 'password2', username: 'email2'}
];

// content TEXT,
// rating INTEGER,
// user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
// rest_id INTEGER REFERENCES rest(id)
const reviewSeeds = [
    {
        content: 'food is good',
        rating: 4,
        user_id: 1,
        rest_id: 1
    },
    {
        content: 'food sucks',
        rating: 3,
        user_id: 2,
        rest_id: 1
    }
]

Promise.all(userSeeds.map(user.register))
    .then(users => {
        return Promise.all(reviewSeeds.map((reviewSeed, indx) => review.createReview({
            ...reviewSeed,
            user_id: users[indx % 2].id
        })))
    })
    .then(reviews => console.log(reviews))