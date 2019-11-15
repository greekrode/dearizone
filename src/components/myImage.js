import React from 'react';
import  LazyLoadImage  from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyImage = ({ image }) => (
    <div>
        <LazyLoadImage
            className={image.className}
            src={image.src} // use normal <img> attributes as props
            effect="blur" />
        <span>{image.caption}</span>
    </div>
);

export default MyImage;