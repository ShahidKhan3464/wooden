import React from 'react'
import { Box } from '@material-ui/core';
import woodenImg from '../img/wooden-img.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { useStyles } from '../woodenProperty/style';

const SwiperSlider = () => {
    const classes = useStyles()
    // const images = [woodenImg, woodenImg, woodenImg]

    return (
        <Swiper
            spaceBetween={15}
            slidesPerView={1.5}
        // centeredSlides={true}
        >
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            <SwiperSlide>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="wooden-img" src={woodenImg} component="img" />
                </Box>
            </SwiperSlide>
            {/* {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Box className={classes.imageBox}>
                        <Box className={classes.img} alt="wooden-img" src={image} component="img" />
                    </Box>
                </SwiperSlide>
            ))} */}
        </Swiper>
    )
}

export default SwiperSlider