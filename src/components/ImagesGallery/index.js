import React , { useState } from 'react';

import './style.css';

const ImageGallery = ({images}) => {
	const [selectedImage, setSelectedImage] = useState(images[0]);

	const changeImage = event => {
		setSelectedImage(event.target.src);
	}

	return (
		<div className="images-gallery">
			<img className="selected" src={selectedImage} alt=""/>
			<div className="images-set">
				{images.map((image, key) => {
					return <img key={key} className="image-icon" src={image} alt="" onClick={changeImage}/>
				})}
			</div>
		</div>
	)
}

export default ImageGallery;