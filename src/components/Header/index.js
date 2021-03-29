import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import TextField from '@material-ui/core/TextField';
import Popup from '../Popup';
import InputAdornment from '@material-ui/core/InputAdornment';

import './style.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-text-field/dist/text-field.css';

const Header = ({filterRecipes, cuisines, values, changeParams, resetFilter, serachRecipes}) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [value, setValue] = useState('');

  const handleKey = event => {
    const eventValue = event.target.value;
    if (event.key === 'Enter') {
      if (eventValue.length) setCancel(true);

      serachRecipes(eventValue);
    }
  };

  const click = () => {
    setCancel(false);
    setValue('');
    serachRecipes('');
  }

  return (
  <>
    <header id='header-id'>
      	<div className="header__content">
        		<h1>Air Recipes</h1>
        		<p>Best Recipes for Best People</p>
        		<div className="header__searchbar">
        		<TextField  className="inputRounded" placeholder="Search" onKeyPress={handleKey} 
            	InputLabelProps={{
              	shrink: true,
            	}}
            variant="outlined" value={value} onChange={(e) => {setValue(e.target.value)}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                 <MaterialIcon icon='search' style={{color: '#A9A9A9'}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                 {cancel && <IconButton style={{padding: 0, border: 'none', background: 'none', width: '15px', height: '15px'}}>
                 <MaterialIcon icon='cancel' onClick={click}/> </IconButton>}
                </InputAdornment>
              )
            }}
          	/>
  	      	<IconButton onClick={() => setPopupIsOpen(true)}>
  		    	<MaterialIcon icon='filter_list' />
  	        </IconButton>
  	        </div>
      </div>
    </header>
    {popupIsOpen && <Popup openClose={setPopupIsOpen} 
      filterRecipes={filterRecipes} cuisines={cuisines} values={values} changeParams={changeParams} resetFilter={resetFilter}/>} 
  </>
)};


export default Header;

