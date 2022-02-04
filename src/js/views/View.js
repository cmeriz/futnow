export default class View {
    _parentElement;
    _data;
    _errorMessage;
    _message;

    render(data, selectParent = false){

        if(!data || (Array.isArray(data) && data.length === 0)){
            this._renderError();
            return;
        } 

        if(selectParent){
            this._selectParent();
        }

        if(!this._parentElement) return;

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();

        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderLoader(){
        const loader = `
            <div class="loader-container">
                <span class="loader"></span>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin', loader);
    }

    _clear(){
        if(!this._parentElement) return;
        this._parentElement.innerHTML = '';       
    }

    _clearInput(){
        this._searchForm.querySelector('.search').value = '';
    }

}