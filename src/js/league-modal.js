const leaguesList = document.querySelectorAll('.leagues__list');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');

leaguesList.forEach(function(leagueList){
    leagueList.addEventListener('click', function(e){
        const league = e.target.closest('.league');
        modal.classList.remove('hidden-modal');
        body.classList.add('no-scroll');
    });
});

modal.addEventListener('click', function(e){

    const closeModal =e.target.closest('.close-modal');

    if(closeModal){
        this.classList.add('hidden-modal');
        body.classList.remove('no-scroll');
    }

});