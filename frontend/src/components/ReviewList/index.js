import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotsReviews } from '../../store/reviews';
import { useParams } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
// import PostReviewModal from '../PostReviewModal';
import ReviewForm from '../ReviewForm';
import PostReviewModal from '../PostReviewModal';


const ReviewList = () => {
    const { spotId, ownerId } = useParams()

    const user = useSelector((state) => (state.session.user))
    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews.spot)
    const reviews = Object.values(reviewsObj)

    console.log('list o reviews: ', reviews)

    useEffect(() => {
        console.log('useEffect, reviewList: ')
        dispatch(getOneSpotsReviews(spotId))
    }, [dispatch, spotId, reviews.length]);

    console.log('OwnerId : **',ownerId, 'spotId ** : ', spotId)
    // if(!reviewsObj) return null

    let reviewFound = false
    if(user) {
        reviews.forEach(r => {
            if(r.userId === user.id || ownerId === user.id) {
                reviewFound = true
            }
        })
    }
    if(!user) {
        reviewFound = true
    }
    function PostAReview() {
        if(reviewFound === false) {
            return (
                <OpenModalButton modalComponent={<PostReviewModal spotId={spotId} />} buttonText="Post a Review"/>
            )
        }
    }
    if(reviews.length) {
        reviews.forEach(r => console.log('user information: ',r.User))
    }

    // reviews.map(({review, User, createdAt}) => {
    //     if(!review || !User || !createdAt) return null
    // })
    for( let i = 0; i < reviews.length; i++) {
        let r = reviews[i]
        if(!r.review || !r.User || !r.createdAt) return null
    }
    return (
        <>
            <div className='spotReviews'>
                <PostAReview/>
                {reviews?.map(({ review, User, createdAt }) => (
                    <div className='reviewSection' key={review.id}>
                        <div className='userInfo'>
                            <h1>
                            {User.firstName}
                            </h1>
                            {createdAt}
                        </div>
                        <p>
                        {review}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewList
