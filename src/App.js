import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import FetchData from './service/FetchData';
import Main from './scenes/Main';
import Header from './components/Header';
import Item from './scenes/Item';

class App extends React.Component {
	fetchData = new FetchData();

	state = {
		allRecipes: null,
		recipes: null,
		cuisines: {
  			'Caribbean': true,
	  		'Greek': true,
	  		'French': true,
	  		'Indian': true,
	  		'Chinese': true},
	  	caloricityValues: [100, 1200],
	  	resetFilter: false 
	};

	componentDidMount() {
		window.addEventListener("scroll", this.resizeHeaderOnScroll);
		this.fetchData.getList()
					.then(recipes => {
						this.setState({recipes: recipes, allRecipes:recipes});
					});
	};

	resizeHeaderOnScroll = () => {
	    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
	      shrinkOn = 10,
	      headerEl = document.getElementById('header-id');

	    if (distanceY > shrinkOn) {
	      headerEl.classList.add("smaller");
	    } else {
	      headerEl.classList.remove("smaller");
	    }
	  }

	filterRecipes = filter => {
		const filteredRecipes = this.state.allRecipes.recipes.filter(item => {
			return filter.cuisines[item.cuisine.title] && (item.caloricity >= filter.calories[0] && item.caloricity <= filter.calories[1])
		});

		const recipes = {recipes: filteredRecipes}
		this.setState({recipes: recipes});
	}

	changeFilterParams = (cuisines, caloricityValues, resetFilter) => {
		this.setState({cuisines, caloricityValues, resetFilter});
	}

	serachRecipes = search => {
		const searchRecipes = this.state.allRecipes.recipes.filter(item => {
			return item.title.toLowerCase().includes(search.toLowerCase());
		});

		const recipes = {recipes: searchRecipes}
		this.setState({recipes: recipes});
	}

	render () {
		return (
			<BrowserRouter>
			 <Header filterRecipes={this.filterRecipes}
			 	cuisines={this.state.cuisines} values={this.state.caloricityValues}
			 	 changeParams={this.changeFilterParams} resetFilter={this.state.resetFilter} 
			 	 serachRecipes={this.serachRecipes}/>
			  <Route exact path='/' >
			 	{this.state.recipes && <Main {...this.state.recipes}/>}
			 </Route>	
			 <Route  path='/recipes/:id' component={Item} />
    		</BrowserRouter>
  	);	
	}
}

export default App;
