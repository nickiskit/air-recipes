/*{this.state.recipes && <Main {...this.state.recipes}/>}
<Item item={1}/>*/

resizeHeaderOnScroll() {
	    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
	      shrinkOn = 100,
	      headerEl = document.getElementById('header-id');

	    if (distanceY > shrinkOn) {
	      headerEl.classList.add("smaller");
	    } else {
	      headerEl.classList.remove("smaller");
	    }
	  }


	  background-position-y: top; 
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;