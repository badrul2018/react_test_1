import React, { useEffect, useState } from 'react'
import "./foodDetail.css"
import { useParams } from "react-router-dom";
import { getFoodDetailsById } from '../../API/api';
import { CircularProgress } from '@material-ui/core';
import {FaYoutubeSquare,FaLocationArrow} from "react-icons/fa"
import {ImLocation} from "react-icons/im"
const FoodDetail = (props) => {
    let { id } = useParams();
    const [foodDetails, setFoodDetails] = useState("");
    const [loader, setLoader] = useState(true);
    const [seeMore, setSeeMore] = useState(true)

    const fetchDetails = async (id) => {
        try {
            const result = await getFoodDetailsById(id);
            if (result.status === 200 && result.data) {

                setFoodDetails(result.data.meals[0]);
                setLoader(false);

            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchDetails(id);
    }, []);
    const handlBack = (e) => {
        props.history.push(`/`);
      };

    if (loader) return <div className='loader'>
        <CircularProgress size={130} />
    </div>

    return (
        <div className="app">


            <div className="details" >
                <div className="big-img">
                    <img src={foodDetails.strMealThumb} alt="" />
                </div>

                <div className="box">
                    <div className="row">
                        <h2>{foodDetails.strMeal}</h2>
                        <span><ImLocation size={'0.8em'} /><span className='loc'>{foodDetails.strArea}</span></span>
                        <span
                        style={{cursor:"pointer"}}
                        onClick={() => window.open(`${foodDetails.strYoutube}`, "_blank")}
                        ><FaYoutubeSquare className="youtube" /></span>
                        
                    </div>


                    <p>
                        {foodDetails.strInstructions.length > 250 ? (
                            seeMore ? (
                                <>
                                    {" "}
                                    {foodDetails.strInstructions.substr(0, 250)}
                                    <span
                                        onClick={() => setSeeMore(false)}
                                        style={{ cursor: "pointer", color: "#E5278d" }}
                                    >
                                        ...SeeMore
                                    </span>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {foodDetails.strInstructions}
                                    <span
                                        onClick={() => setSeeMore(true)}
                                        style={{ cursor: "pointer", color: "#E5278d" }}
                                    >
                                        ...SeeLess
                                    </span>
                                </>
                            )
                        ) : (
                            foodDetails.strInstructions
                        )}
                    </p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {foodDetails.strTags.split(',').map((ele, index) => (
                            ele && <div className="tag" key={index}>{ele}</div>
                        ))}
                    </div>
                    <div>
                        <h2>Ingredient</h2>
                        <ul>
                            {[1, 2, 3, 4].map((ele, index) => (
                                <li key={index} >{foodDetails[`strIngredient${ele}`]} <span style={{ marginLeft: "10px" }}>{foodDetails[`strMeasure${ele}`]}</span></li>
                            ))}
                        </ul>
                    </div>


                    <button className="cart" onClick={(e)=>handlBack(e)}>Back to Home</button>

                </div>
            </div>


        </div>
    )
}

export default FoodDetail
