// 
const btn = document.querySelector('#btn');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');



btn.addEventListener('click', function(e){
    modal.classList.toggle('hidden-modal');
});

modal.addEventListener('click', function(e){

    const closeModal = e.target.closest('.close-modal');

    if(closeModal){
        this.classList.add('hidden-modal');
        body.classList.remove('no-scroll');
    }

});