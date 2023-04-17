import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './Spots.css'
import { Link } from "react-router-dom";
// import Tooltip from "./Tooltip";

const SpotList = () => {
    const dispatch = useDispatch();
    const spotList = useSelector((state) => Object.values(state.spots));

    if(spotList) {
        spotList.forEach(s => {if(s.avgRating === "NaN") s.avgRating = "New"})
    }

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    // console.log('preview', spotList[0])
    return (
        <div className='spotList'>


            {spotList?.map(({ id, city, state, previewImage, name, avgRating, price }) => (

                <Link to={`/spots/${id}`} key={id} className='price' >
                    <div className='spotTile' title={name}>
                    {/* <Tooltip> */}
                        <div data-role='tile' key={id}>
                            <div className='imageBox'>
                            <img alt='' src={previewImage} className='previewImg'></img>

                            </div>
                            <div className='spotInfo'>
                                <div className='localPrice'>
                                    <div className='price'>
                                    {city}, {state}
                                    </div>
                                    <div className='price'>
                                    ${price} per night
                                    </div>
                                </div>
                                <div className='rating'>
                                <img className='icon' alt='' src='https://cdn-icons-png.flaticon.com/128/929/929495.png'></img>
                                {avgRating}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    )
}
export default SpotList
