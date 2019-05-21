var popup = document.getElementById('ac-wrapper');

function PopUp(hideOrshow) {
  if (hideOrshow == 'hide') {
    popup.style.display = "none";
  } else {
    popup.removeAttribute('style');
  } 
}

//The first appearance of the starting window
window.onload = function () {
  setTimeout(function () {
      PopUp('show');
  }, 0);
}

function hideNow(e) {
  if (e.target.id == 'ac-wrapper') {
    popup.style.display = 'none';
  }
} 

if 