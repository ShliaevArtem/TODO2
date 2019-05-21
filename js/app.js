// Import file
var popUp = document.createElement('script');
popUp.src = '/js/popUp.js';
document.head.appendChild(popUp);

var dragAndDrop = document.createElement('script');
dragAndDrop.src = '/js/dragAndDrop.js';
document.head.appendChild(dragAndDrop);

var data;
todos();
updateNumbs();

function todos() {
  var i, 
      list, 
      count = 0, 
      el, 
      prop;

  if (window.localStorage.mytodo) {
      data = JSON.parse(localStorage.getItem("mytodo"));
  } else {
    data = {
        todo: [],
        inProgress: [],
        done: []
    };
  }

  localStorage.setItem("mytodo", JSON.stringify(data));
  list = document.querySelectorAll('.todo-project__list');

  for (prop in data) {
    for (i = 0; i < data[prop].length; i++) {
      el = document.createElement('div');
      el.innerHTML = data[prop][i];
      el.className = 'todo-project__item';
      list[count].appendChild(el);
    }
    count++;
  }
}

// Task counting
function updateNumbs() {
  var total, 
      list, 
      proj, 
      i;

  total = document.querySelector('.todo__total-value').innerHTML = document.querySelectorAll('.todo-project__item').length;
  total === 1 ? document.querySelector('.todo__total-title').innerHTML = 'project' : document.querySelector('.todo__total-title').innerHTML = 'projects';
  list = document.querySelectorAll('.todo-project');

  for (i = 0; i < list.length; i++) {
    proj = list[i].querySelectorAll('.todo-project__item').length;
    list[i].querySelector('.todo-project__total-value').innerHTML = proj;

    switch (proj) {
      case 0 :  
        list[i].querySelector('.todo-project__total-title').innerHTML = 'not yet'; 
        break;

      case 1 : 
        list[i].querySelector('.todo-project__total-title').innerHTML = 'project'; 
        break;

      default: 
        list[i].querySelector('.todo-project__total-title').innerHTML = 'projects';
    }
  };
}

document.querySelector('.todo-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var input, 
      val, 
      allProj, 
      i, 
      proj, 
      err;

  // Validation Form
  input = document.querySelector('.todo-form__input');
  val = input.value.trim();

  if (!val.length) {
    return input.value = '';
  }
    
  allProj = document.querySelectorAll('.todo-project__item');
  for (i = allProj.length; i--;){
    if (val.toUpperCase() === allProj[i].firstChild.nodeValue.toUpperCase()) {
      input.value = '';
      err = document.querySelector('.todo-form__error');
      err.classList.add('visible');
      input.setAttribute('disabled', '');
      return setTimeout(function() {
        err.classList.remove('visible');
        input.removeAttribute('disabled', '');
        input.focus();
      }, 1000)
    } 
  }
  // Task creation
  proj = document.createElement('div');
  proj.className = 'todo-project__item';
  proj.innerHTML = val;
  document.querySelector('.todo-project__list').appendChild(proj);

  input.value = '';
  updateNumbs();
  data.todo.push(val);
  localStorage.setItem("mytodo", JSON.stringify(data));
});

