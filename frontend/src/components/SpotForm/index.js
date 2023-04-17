import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createSpot, updateSpot } from "../../store/spots"
import './SpotForm.css'


const SpotForm = ({ spot, formType }) => {
    console.log('SpotForm hit ***')
    const history = useHistory();
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description)
    const [url, setUrl] = useState(spot?.url)
    const [url1, setUrl1] = useState(spot?.url1)
    const [url2, setUrl2] = useState(spot?.url2)
    const [url3, setUrl3] = useState(spot?.url3)
    const [url4, setUrl4] = useState(spot?.url4)
    const [preview, setPreview] = useState(true)
    const [price, setPrice] = useState(spot?.price)

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    useEffect(() => {
        const errorsObj = {}
        if(country === "") errorsObj.country = "Country is required"
        if(state === "") errorsObj.state = "State is required"
        if(city === "") errorsObj.city = "City is required"
        if(address === "") errorsObj.address = "Address is required"
        if(name === "") errorsObj.name = "Name is required"
        if(price === "") errorsObj.price = "Price per night is required"
        if(description.length < 30) errorsObj.description = "Description needs to be 30 or more characters"
        if(url === "") errorsObj.url = "Preview Image Url is reqiured"

        setErrors(errorsObj)
    }, [address, city, state, country, name, description, price, url, url1, url2, url3, url4, preview])

    const handleSubmit = async (e) => {
        console.log('SpotForm handle submit hit ***')
        e.preventDefault();

        spot = { ...spot, address, city, state, country, name, description, price, url, url1, url2, url3, url4, preview };

        let images = [ {url, preview}, {url:url1, preview}, {url:url2, preview}, {url:url3, preview}, {url:url4, preview} ]

        if(Object.values(errors).length) {
            return
        }

        if(formType === "Update Spot") {
            const editedSpot = await dispatch(updateSpot(spot))
            spot = editedSpot
            history.push(`/spots/${spot.id}`)
        } else if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot, images))
            spot = newSpot;
            history.push(`/spots/${spot.id}`)
        }
        console.log('country input ? : =============>', spot.country)


    };
    if(!formType) return
    const classForImgs = "spotImageForm" + (formType === "Update Spot" ? " hidden": "")
    console.log('errors: ** : ', errors)
    return (
        <form onSubmit={handleSubmit} id="spotForm">
            <div></div>
            <div id="centerColumn">
            <h1>{formType}</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            {/* {formType} */}
            {/* <div className="errors">{errors.address}</div> */}
            <div className="locationInfo">
                <div>
                    <label>
                    Country <div className="errors">
                    {errors.country && <p>{errors.country}</p>}
                        </div>
                    <input className="inputBox"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Street Address <div className="errors">{errors.address}</div>
                    <input className="inputBox"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    </label>
                </div>
                <div className="cityState">
                    <label>
                    City <div className="errors">{errors.city}</div>
                    <input className="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    </label>
                    <label>
                    State <div className="errors">{errors.state}</div>
                    <input className="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</p>
                <label>
                  <div className="errors">{errors.description}</div>
                  <textarea className="textArea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
            </div>
            <div className="spotName">
                <label>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div className="errors">{errors.name}</div>
                <input className="inputBox"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </label>
            </div>
            <div className="spotPrice">
                <label>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="errors">{errors.price}</div>
                $ <input className="moneyInput"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </label>
            </div>

            <div className={classForImgs}>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div>
                    <label className="inputs">
                     <div className="errors">{errors.url}</div>
                       <input className="urlInput"
                           type="text"
                           value={url}
                           onChange={(e) => setUrl(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label className="inputs">
                     <div className="errors">{errors.url1}</div>
                       <input className="urlInput"
                           type="text"
                           value={url1}
                           onChange={(e) => setUrl1(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label className="inputs">
                     <div className="errors">{errors.url2}</div>
                       <input className="urlInput"
                           type="text"
                           value={url2}
                           onChange={(e) => setUrl2(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label className="inputs">
                     <div className="errors">{errors.url3}</div>
                       <input className="urlInput"
                           type="text"
                           value={url3}
                           onChange={(e) => setUrl3(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label className="inputs">
                     <div className="errors">{errors.url4}</div>
                       <input className="urlInput"
                           type="text"
                           value={url4}
                           onChange={(e) => setUrl4(e.target.value)}
                       />
                    </label>
                </div>
            </div>
                <div className="submitButton">
                 <button type="submit">{formType}</button>
                </div>
            </div>
            <div></div>
        </form>
    )
}

export default SpotForm
