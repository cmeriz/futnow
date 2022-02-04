const leaguesContainer = document.querySelector('.leagues');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');

/* leaguesContainer.addEventListener('click', function(e){
    const league = e.target.closest('.league');
    if(league){
        modal.classList.remove('hidden-modal');
    }
}); */




modal.addEventListener('click', function(e){

    const closeModal =e.target.closest('.close-modal');

    if(closeModal){
        this.classList.add('hidden-modal');
        body.classList.remove('no-scroll');
    }

});