import { csrfFetch } from "./csrf";

const GET_REVIEWS = "/spots/:spotId/reviews"
const CREATE_REVIEW = "/reviews/CREATE_REVIEW"

export const loadReviews = (reviews) => {
    console.log('loadReviews running: ')
    return {
        type: GET_REVIEWS,
        reviews,
    }
}

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const createSpotReview = (spot) => async (dispatch) => {
    console.log('spot : ', spot)
    const { spotId, review, stars } = spot
    const newReview = {review, stars}

    console.log('res **: ', spotId)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newReview)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(createReview(newReview));
        return newReview
    } else {
        const errors = await res.json();
        return errors
    }
}

export const getOneSpotsReviews = (spotId) => async (dispatch) => {
    console.log('getonespotsreviews running')
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    console.log('this is res from fetch reviews')

    if(res.ok) {
        console.log('res is .ok')
        const spotReviews = await res.json()
        console.log('spot reviews: ', spotReviews)
        dispatch(loadReviews(spotReviews.Reviews))
    } else {
        console.log('res is not ok')
        const errors = await res.json()
        return errors
    };
};

const initialState = {spot: {}};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS: {
            console.log('get reviews case runnign in Reducer')
            const newState = {...state, spot: {}};
            action.reviews.forEach(r => (newState.spot[r.id] = r))
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}}
            newState.spot[action.review.id] = action.review
            return newState
        }
        default:
            console.log('review reducer: default case')
            return state
    }
}

export default reviewReducer;
