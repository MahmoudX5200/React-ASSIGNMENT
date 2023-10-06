import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Stores/CategorySlice';
export default function CategorySlider() {

    let { categoryList } = useSelector((selector) => selector.categoryData)
    let disp = useDispatch()
    useEffect(() => {
        disp(getAllCategory())

    }, [])
    return (
        <div>

            <OwlCarousel className='owl-theme' items={8} loop  >
                {categoryList.map((el) => {
                    return <div class='item'>
                        <img src={el.image} className='smallImg' alt="" />
                    </div>
                })}
            </OwlCarousel>


        </div>
    )
}
