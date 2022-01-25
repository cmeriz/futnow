import View from "./View.js";

class PaginationView extends View {

    _selectParent(){
        this._parentElement = document.querySelector('.leagues__pagination');
    }

    addHandlerClick(handler){

        if(!this._parentElement) return;

        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--pagination');
            if(!btn) return;

            const goToPage = +btn.dataset.goTo;
            handler(goToPage);
        });
    }

    _generateMarkup(){
        
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, there are other pages
        if(curPage === 1 && numPages > 1){
            return `
                ${ this._generateMarkupButtons(
                    {disabled: true, page: curPage},
                    {disabled: false, page: curPage + 1}
                ) }
            `;
        }

        // Last page
        if(curPage === numPages && numPages > 1){
            return `
                ${ this._generateMarkupButtons(
                    {disabled: false, page: curPage - 1},
                    {disabled: true, page: curPage}
                )}
            `;
        }

        // Other page
        if(curPage < numPages){

            return `
                ${ this._generateMarkupButtons(
                    {disabled: false, page: curPage - 1},
                    {disabled: true, page: curPage},
                    {disabled: false, page: curPage + 1}
                )}
            `;
        }

        // Page 1, there are NO other pages
        return 'Showing all results';
    }

    _generateMarkupButtons(...buttons){
        
        const markup = buttons.map(button => `
            <button class="btn--pagination" ${button.disabled ? 'disabled' : 'data-go-to="' + button.page + '"'}>${button.page}</button>
        `).join('');

        return markup;
    }

}

export default new PaginationView();