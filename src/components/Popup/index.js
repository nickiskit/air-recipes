import React , { useState } from 'react';
import Card from "@material/react-card";
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import { Link } from 'react-router-dom';

import './style.css';
import '@material/react-card/dist/card.css';
import "@material/react-checkbox/dist/checkbox.css";

const cuisinesList = ['Caribbean', 'Greek', 'French', 'Indian', 'Chinese'],
      cuisinesObject =  {
        'Caribbean': true,
        'Greek': true,
        'French': true,
        'Indian': true,
        'Chinese': true},
      caloricityValues = [100, 1200];

const Popup = ({openClose, filterRecipes, cuisines, values, changeParams, resetFilter}) => {
  const [checkedItems, setCheckedItems] = useState(cuisines);
  const [displayedButton, setDisplayedButton] = useState(resetFilter);
  const [sliderValues, setSliderValues] = useState(values);

  const handleChange = event => {
    const items = {...checkedItems,
      [event.target.value]: event.target.checked};
    setCheckedItems(items);
    showButton();
  };


  const handleSlider = name => (event, value) => {
    setSliderValues(value);
    showButton();
  };

  const showButton = () => {
    if (!resetFilter) {
      setDisplayedButton(true);
    }
  };

  const resetFilters = () => {
    setDisplayedButton(false);
    setSliderValues(caloricityValues);
    setCheckedItems(cuisinesObject);
  }

  const handleShowRecieps = () => {
    filterRecipes({cuisines: checkedItems, calories: sliderValues});
    changeParams(checkedItems, sliderValues, displayedButton);
    openClose(false);
  };
  
  return (
    <>
  <div className="popup__background" onClick={() => openClose(false)}>
  </div>
  <div className="popup__card">
      <Card outlined>
        <div className="card__content">
          <h3>Filter</h3>
          <IconButton style={{padding: 0, position: 'absolute', top: '21px', right: '21px'}} onClick={() => openClose(false)}>
          <MaterialIcon icon='close' />
          </IconButton>
          <ul>
            {cuisinesList.map((cuisine, key) => (
              <li key={key}>
              <span>{cuisine}</span>
              <Checkbox
              checked={checkedItems[cuisine] ?? true} value={cuisine}
              color="default" onChange={handleChange}/>                   
              </li>
            ))}
          </ul>
          <Slider 
          id='calories'
          name='calories'
          max={1200} min={100} value={sliderValues} 
          valueLabelDisplay="on" aria-labelledby="range-slider" 
          onChange={handleSlider('calories')}/>

          {displayedButton && <Button className="button-clear" onClick={resetFilters}>
          CLEAR
          </Button>}
          <Link to='/'>
          <Button  className="button-show"
          onClick={handleShowRecieps}>
          SHOW RECIPES
        </Button>
        </Link>
        </div>
      </Card>
    </div>
    </>
)};

export default Popup;