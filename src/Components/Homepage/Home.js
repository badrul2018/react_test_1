import React, { useEffect, useState } from 'react'
import {getFoodlistOfCanadian} from "../../API/api"
import "./home.css"
import GridList from "@material-ui/core/GridList";
import { Container, GridListTile, GridListTileBar } from '@material-ui/core';
import { Link } from 'react-router-dom';



const Home = (props) => {
    const [foodList,setFoodList]=useState("")
    const featchFoodList=async()=>{
        try{
            let result= await getFoodlistOfCanadian()
            if (result.status === 200 && result.data) {
                setFoodList(result.data.meals)
            }    
        }catch(e)
        {
            console.log(e)
        }
    }
    useEffect(()=>{
        featchFoodList()
    },[])

    const handleFood = (e,id) => {
        props.history.push(`/food/${id}`);
      };
    return (
        <div style={{marginTop:"50px"}}>
        <Container>
            <GridList cellHeight={400} cols={3}>
            {
                foodList && foodList.map((ele,index)=>(
                    
                   <GridListTile
                   style={{flexGrow:'1'}}
                   cols={((Math.random() * 10000)/1249/3).toFixed(0) || 1.389}
                   >
                    <img src={ele.strMealThumb} alt={"backgroungImg"} 
                    onClick={(e)=>handleFood(e,ele.idMeal)}
                    />
                    <GridListTileBar title={ele.strMeal} style={{textAlign:"center"}}/>
                   </GridListTile> 
                   
                ))
            }
            </GridList>
            </Container>
            
        </div>
    )
}

export default Home
