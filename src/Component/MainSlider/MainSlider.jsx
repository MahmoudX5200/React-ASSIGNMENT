import React from 'react'
import img1 from '../../assets/images/images/slider-image-1.jpeg'
import img2 from '../../assets/images/images/slider-image-2.jpeg'
import img3 from '../../assets/images/images/slider-image-3.jpeg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSlider() {
    return (
        <div className='row g-0 my-5 '>
            <div className='col-md-9 '>
                <OwlCarousel className='owl-theme' autoplay autoplayTimeout={1000} items={1} loop  >
                    <div class='item'>
                        <img src={img1} className='w-100 img1' alt="" />
                    </div>
                    <div class='item'>
                        <img src={img2} className='w-100 img1' alt="" />
                    </div>
                    <div class='item'>
                        <img src={img3} className='w-100 img1' alt="" />
                    </div>

                </OwlCarousel>
            </div>
            <div className='col-md-3'>
                <img src={img1} className='w-100 smallImg' alt="" />
                <img src={img2} className='w-100 smallImg' alt="" />

            </div>
        </div>
    )
}
