const favoritesDropdown = document.querySelector('.navbar__favorites__dropdown');

document.addEventListener('click', function(e){
    btnFavorites = e.target.closest('.btn--favorites');

    if(btnFavorites){
        favoritesDropdown.classList.toggle('hidden');
    }else{
        favoritesDropdown.classList.add('hidden');
    }

});