const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Index } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');


router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {

        spot.SpotImages.forEach(image => {
            if(image.preview === true) {
                // console.log('image ', image)
                spot.previewImage = image.url
            } else {
                spot.previewImage = 'No image URL found'
            }
        })

        let total = 0
        spot.Reviews.forEach(reviewy => {
            console.log(reviewy)
            total += reviewy.stars
        })
        spot.avgRating = total / spot.Reviews.length
        // console.log('spoty',spot)
        delete spot.Reviews
        delete spot.SpotImages

    })

    res.json(spotsList)
})

router.get('/current', requireAuth, async (req, res) => {

    const spot = await Spot.findOne({
        where: req.params.current,
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })
    let spotsList = [spot.toJSON()];

    spotsList.forEach(spot => {

        spot.SpotImages.forEach(image => {
            if(image.preview === true) {
                // console.log('image ', image)
                spot.previewImage = image.url
            } else {
                spot.previewImage = 'No image URL found'
            }
        })

        let total = 0
        spot.Reviews.forEach(reviewy => {
            console.log(reviewy)
            total += reviewy.stars
        })
        spot.avgRating = total / spot.Reviews.length
        // console.log('spoty',spot)
        delete spot.Reviews
        delete spot.SpotImages

    })
    const spotsListed = { Spots:  spotsList  }

    res.json(spotsListed)
})

router.get('/:spotId', async (req, res) => {
    // const spot = await Spot.findByPk(req.params.spotId)

    const spot = await Spot.findAll({
        where: {ownerId: req.params.spotId},
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            },
        ]
    })
    const spotOwner = await User.findByPk(req.params.spotId)
    console.log('owner: ',spotOwner.firstName)



    let spotsList = [];
    spot.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {

        if(spot.Owner) {
            spot.Owner = {
                id: spotOwner.id,
                firstName: spotOwner.firstName,
                lastName: spotOwner.lastName
            }
        } else {
            spot.Owner = "No Owner Found"
        }

        let total = 0
        spot.Reviews.forEach(reviewy => {
            // console.log(reviewy)
            total += reviewy.stars
        })
        spot.avgStarRating = total / spot.Reviews.length
        // console.log('spoty',spot)
        spot.numReviews = spot.Reviews.length

        spot.SpotImages.forEach(image => {
            delete image.spotId
            delete image.createdAt
            delete image.updatedAt
        })

        delete spot.Reviews
    })
    res.json(spotsList)
})


module.exports = router;
