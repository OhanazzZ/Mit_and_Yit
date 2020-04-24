// single element
// const form = document.getElementById('my-form');

// console.log(document.querySelector('.container'));

//multiple element
// console.log(document.querySelectorAll('.item'));
// console.log(document.getElementBy......);

// querySelector and querySelectorAll are preferred

// const items = document.querySelectorAll('.item');
// items.forEach((item) => console.log(item));

// const ul = document.querySelector('.items');
// //ul.remove();
// //ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'Hello';
// ul.children[1].innerText = 'yo'
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>';

// const btn = document.querySelector('.btn');
// btn.style.background = 'red';


// // 'click', 'mouseover', 'mouseout', etc
// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('#my-form').style.background = '#ccc';
//     document.querySelector('body').classList.add('bg-dark');
//     document.querySelector('.items').lastElementChild.innerHTML = '<h1>hello</h1>';

// });




//
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#username');
const cuisineInput = document.querySelector('#cuisine');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    // validation
    if (nameInput.value === '' || cuisineInput.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000)
    }else{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${cuisineInput.value}`))
        userList.appendChild(li);

        // Clear fields
        nameInput.value = '';
        cuisineInput.value = '';
    }

}