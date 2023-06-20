import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import '../Spots/Spots.css'
import './SpotDetails.css'
import ReviewList from "../ReviewList";
import { getOneSpotsReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import BookingModal from "../BookingModal";

const SpotDetails = () => {
    const { spotId } = useParams()


    let ownerFirstName = ""
    let ownerLastName = ""
    const dispatch = useDispatch();

    const details = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
    );
    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getOneSpotsReviews(spotId))
    }, [dispatch, spotId, details?.numReviews, details?.avgStarRating]);


    if(details && details.Owner) {
        ownerFirstName = details.Owner.firstName
        ownerLastName = details.Owner.lastName
    }
    if(details && details.avgStarRating) {
        if(details.avgStarRating === "NaN") details.avgStarRating = "New"
    }
    const spotImgs = []
    if(details && details.SpotImages) {
        details.SpotImages.forEach(i => {
            spotImgs.push(i)
        });
    }


    let reviewText = 'Reviews'
    let reviewNum;
    if(details ) {
        reviewNum = details.numReviews

    }
    let dot = <img className="dot" alt="" src="https://cdn-icons-png.flaticon.com/512/7500/7500224.png"></img>

    if(details && details.numReviews) {
        if(details.numReviews === 1) reviewText = 'Review'
    }
    if(details) {
        if(!details.numReviews) {
            reviewText = ""
            reviewNum = ""
            dot = ""
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
        alert("Feature coming soon");
    };

    if(!details) return
    const OwnerId = details.ownerId

    if(details) { return (
        <div className="extraSp">
         <div className="userSpots3">
            <h1>{details.name}</h1>
            <h4>{details.city}, {details.state}, {details.country}</h4>
            <div className="spotImages">
                {spotImgs?.map(({ url, id }, i) => (
                    <img alt="" className={"previewImg" + i} src={url} key={id}></img>
                    ))}
            </div>
            <div className="information">
                <div className="infoLeft">
                    <h1>Hosted by {ownerFirstName} {ownerLastName}</h1>
                    <p>{details.description}</p>
                </div>
                <div className="infoBox">
                    <div className="topInfoBox">
                        <div className="topInfoLeft">
                        ${details.price} per night
                        </div>
                        <div className="topInfoRight">
                        <img className='icon' alt='' src='https://cdn-icons-png.flaticon.com/128/929/929495.png'></img>
                        {details.avgStarRating} {dot} {reviewNum} {reviewText}
                        </div>
                    </div>
                    <div className="bottomInfoBox">
                        <OpenModalButton
                            className="reserve"
                            modalComponent={<BookingModal spotId={spotId} spot={details}/>} />
                    </div>
                </div>
            </div>
            <div className="reviewDiv">
                <div className="infoBar">
                    <img className='icon' alt='' src='https://cdn-icons-png.flaticon.com/128/929/929495.png'></img>
                    {details.avgStarRating} {dot} {reviewNum} {reviewText}
                </div>
                <div className="orderedReviews">
                    <div>
                    <ReviewList OwnerId={OwnerId}/>
                    </div>
                </div>
            </div>
         </div>
        </div>

    )}
}

export default SpotDetails;
