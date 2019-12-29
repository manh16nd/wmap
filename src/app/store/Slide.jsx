import React from 'react'
import {Slide as S} from 'react-slideshow-image'

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

const Slide = ({images}) => {

    return <div className="slide-container">
        <S {...properties}>
            {images.map((img, i) => <div className="each-slide" key={i}>
                <div style={{'backgroundImage': `url(${img})`, height: '10rem'}}>
                </div>
            </div>)}
        </S>
    </div>
}

export default Slide
