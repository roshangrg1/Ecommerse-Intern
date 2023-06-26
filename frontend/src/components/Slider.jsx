import React, { useState } from 'react'
import './Slider.css'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { sliderItems } from '../data'

const Slider = () => {

    const [slideIndex , setSlideIndex]= useState(0);
    const handleClick= (direction) => {
        if (direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 3)
        }
        else {
            setSlideIndex(slideIndex < 3 ? slideIndex + 1 :0)
        }
    }
    return (
        <div className='slider'>
            <div className="left" onClick={()=>handleClick("left")}>
                <BsArrowLeftShort />
            </div>
            <div className="wrapper" slideIndex={slideIndex} style={{transform: `translateX(${(props) => props.slideIndex * -100}vw)`,background:`green`}} >
                {sliderItems.map(item =>(
                     <div className="slides">
                    <div className="image-container">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="description-container">
                        <h1>ok i am the future billionair</h1>
                        <p>ok Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates quod sapiente iste dolore?</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                ))}
               

               
            </div>



            <div className="right" onClick={()=>handleClick("right")} >
                <BsArrowRightShort />
            </div>
        </div>
    )
}

export default Slider