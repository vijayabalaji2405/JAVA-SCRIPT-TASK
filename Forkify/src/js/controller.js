import * as model from './model.js';
import recipieView from './views/recipieViews.js';
import SearchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipieViews from './views/recipieViews.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import Resultview from './views/resultsView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import addRecipieView from './views/addRecipieView.js';
import { MODAL_CLOSE_SEC } from './config.js';
// import recipieViews from './views/recipieViews.js';
// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipieView.renderSpinner();

    //updating result view to mark search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmark);

    //Loading recipe
    await model.loadRecipe(id);

    //rendering recipie
    recipieView.render(model.state.recipe);
  } catch (err) {
    recipieView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //get query
    const query = SearchView.getQuery();
    if (!query) return;
    Resultview.renderSpinner();

    //load search result
    await model.loadSearchResult(`${query}`);

    // resultsView.render(model.state.search.result);

    resultsView.render(model.getSearchResultPage(1));

    //render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlerPagination = function (gotoPage) {
  //render new reslt
  resultsView.render(model.getSearchResultPage(gotoPage));

  //render new pagination buttons
  paginationView.render(model.state.search);

  console.log(gotoPage);
};

const controlServings = function (newServings) {
  //update the recipe servings in (model.state)
  model.updateServings(newServings);
  //update the recipe view
  recipieView.update(model.state.recipe);
};

const controlAddbookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //update recipe view
  recipieView.update(model.state.recipe);
  //render bookmars
  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipieView.renderSpinner();
    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //rendering recipie
    recipieView.render(model.state.recipe);

    //sucess message
    addRecipieView.renderMessage();

    //render bookmark
    bookmarksView.render(model.state.bookmark);

    //change id in url
    //pushstate is used to change url without reloading the pafe
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      // addRecipieView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipieView.renderError(err);
  }
};

// controlRecipe();
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipieView.addHandlerRender(controlRecipe);
  recipieView.addHandlerUpdateServings(controlServings);
  recipieView.addHandlerAddbookmark(controlAddbookmark);
  SearchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlerPagination);
  addRecipieView._addHandlerUpload(controlAddRecipe);
};
init();

//we are using publisher-subscribe pattern with init and init is not neccessary
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipe)
// );
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
