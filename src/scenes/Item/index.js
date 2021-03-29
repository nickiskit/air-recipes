import React, {useEffect, useState} from 'react';
import FetchData from '../../service/FetchData';
import { InlineIcon } from '@iconify/react';
import chefHat from '@iconify-icons/mdi/chef-hat';
import clockTimeFourOutline from '@iconify-icons/mdi/clock-time-four-outline';
import fireIcon from '@iconify-icons/mdi/fire';
import earthIcon from '@iconify-icons/mdi/earth';
import ImagesGallery from '../../components/ImagesGallery'

import './style.css';
import '@material/react-material-icon/dist/material-icon.css';

const fetchData = new FetchData();

const colors = {
	'easy': '#2FB65D',
	'medium': '#EB8A31',
	'hard': '#EB3C31'
};

const Item = (props) => {
	const [data, setData] = useState([]);

	const id = props.match.params.id;
	useEffect(() =>{
		fetchData.getItem(id)
			.then(data => setData(data.recipe))
	}, []);
	
	return (
		<>
		{data.length ??  <section className="recipe">
			<div className="recipe__content">
			<div className="recipe__info">
				<h2>{data.title}</h2>
				<p>{data.description}</p>
				<div className="recipe__icons-set">
					<p style={{color: colors[data.difficulty]}}><InlineIcon icon={chefHat} width={24} height={24} color={colors[data.difficulty]}/> {addSpace(capitalize(data.difficulty))} </p>
					<p><InlineIcon icon={clockTimeFourOutline} width={24} height={24} color={'#C8C8C8'}/>{addSpace(formatTime(data.cookTime))}</p>
					<p><InlineIcon icon={fireIcon} width={24} height={24} color={'#C8C8C8'}/>{addSpace(data.caloricity + ' cKal')}</p>
					<p><InlineIcon icon={earthIcon} width={24} height={24} color={'#C8C8C8'}/>{addSpace(data.cuisine.title)}</p>
				</div>
			</div>
			<div className="recipe__ingredients">
				<h3>Ingredients</h3>
				<ul>
					{data.ingredients.map((ingredient, key) => (
						 <li key={key}>{ingredient}</li>
					))}
				</ul>
			</div>
			<div className="recipe__instructions">
				<h3>Instructions</h3>
				 <ol>
					{data.instructions.map((instruction, key) => (
						 <li key={key}>{instruction}</li>
					))}
				</ol>
			</div>
			</div> 
			{data.images.length > 1 ? <ImagesGallery images={data.images} /> : 
			 <div className="recipe__images">
				<img className="selectedImage" src={data.images[0]} alt=""/>
			</div>}
			
		</section>}
		</>
	)
}

const formatTime = seconds => {
  const minutes = seconds / 60;

  return minutes < 60 ? minutes + ' min ' : roundHour(minutes) + ' hours ' 
};

const roundHour = minutes => {
  return Math.floor(minutes / 60 * 10) / 10;
};

const capitalize = s => {
  return s.charAt(0).toUpperCase() + s.slice(1)
};

const addSpace = s => {
	return ' ' + s + ' ';
}


export default Item;