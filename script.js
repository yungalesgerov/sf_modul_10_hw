// task1
let btn = document.querySelector('.btn');
let div = btn.querySelector('.svg-area');

btn.onclick = () => {
 div.classList.toggle('active');
  
};

// task2
let btn = document.querySelector('.btn');
btn.onclick = () => {
  alert("width is "+ window.screen.width);
  alert('height is '+window.screen.height);
  
};