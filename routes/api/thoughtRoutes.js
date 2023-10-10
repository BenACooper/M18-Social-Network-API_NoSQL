const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

// /api/users
router.route('/').get(getThoughts).post(createThought)

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

// /api/thoughts/:thoughtId/reactions
router.route('/api/thoughts/:thoughtId/reactions').post(addReaction).delete(deleteReaction)


module.exports = router;