import React from 'react';
import Card, {
  CardPrimaryContent,
  CardMedia
} from "@material/react-card";
import {ChipSet, Chip} from '@material/react-chips';
import { Link } from 'react-router-dom';

import './style.css';
import '@material/react-card/dist/card.css';
import "@material/react-chips/dist/chips.css";

const chipStyle = {backgroundColor: 'white'};

const Main = ({ recipes }) => (
  <>
  <section className="main">
  {
    recipes.map(item => (
      <div className="my-card" key={item.id}>
      <Card outlined>
      <Link to={`/recipes/${item.id}`}>
      <CardPrimaryContent>
        <CardMedia wide imageUrl={item.thumbnail}>
          <div className="icons">
            <ChipSet>
              <Chip id={formatTime(item.cookTime)} label={formatTime(item.cookTime)} style={chipStyle}/>
              <Chip id={item.caloricity + 'kCal'} label={item.caloricity + 'kCal'} style={chipStyle}/>
              <Chip id={item.cuisine.title} label={item.cuisine.title} style={chipStyle}/>
            </ChipSet>                
          </div>
        </CardMedia>
      </CardPrimaryContent>
      </Link>
        <div className="mdc-card__content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </Card>
      </div>
    ))
  }
  </section>
  </>
);

const formatTime = seconds => {
  const minutes = seconds / 60;

  return minutes < 60 ? minutes + ' min ' : roundHour(minutes) + ' hours ' 
};

const roundHour = minutes => {
  return Math.floor(minutes / 60 * 10) / 10;
}

export default Main;

