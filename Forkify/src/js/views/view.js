import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  /**
   *Render the recieved object to the Dom
   * @param {object | object[]} data The data to be rendered (eg.recipe)
   * @param {boolean} [render = true] If false create markup string instead of rendering to the dom
   * @returns{undefined | string} A markup string is return if render is false
   * @this {object} view instance
   * @author vijayabalaji
   * @todo finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    //checking in search first:if there is no data or that data is not array and the data array should have some value

    this._data = data;
    const markup = this._generateMarkup();
    //all data going to html is should be in render
    // recipeContainer.innerHTML = '';
    if (!render) return markup;
    this._clear();
    // recipeContainer.insertAdjacentHTML('afterbegin', markup);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    //converting generatemarkup string to object so only we can compare
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //selecting all elements from dom
    const newElement = Array.from(newDom.querySelectorAll('*'));
    //Array from to make nodelist to array
    //creating the current element for compare
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    //looping over two element
    newElement.forEach(function (newEl, i) {
      const curEl = curElement[i];

      //updating changed text
      if (
        //equal node to compare
        !newEl.isEqualNode(curEl) &&
        //using first child we are seclecting only node ele which has text and node value is text
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //updating attribute for(data set prblm)
      //looping over the attribute to copy the new to cur el attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(function (att) {
          //setting attribute value to cur el from new el
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
  }

  _clear() {
    // creating a clear methdod to delete
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
