// Show/Hide Navigation Menu for mobile

// Define some variables
const menu = document.querySelector(".nav-menu-mobile");
const menuItems = document.querySelectorAll(".nav-item");
const hamburger= document.querySelector(".icon");
const closeIcon= document.querySelector(".close");
const menuIcon = document.querySelector(".burger");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

// Close menu when header links are clicked
menuItems.forEach( 
  function(menuItem) { 
    if (menu.classList.contains("showMenu")) {
      menuItem.addEventListener("click", toggleMenu);
    }
  }
);

// Turn off mobile navigation menu styling when at a large enough screen size
// Regular menu requires no additional CSS
function navBarMobile (){
  var screenWidthBig = window.matchMedia("(min-width: 907px)");
  var screenWidthSmall = window.matchMedia("(max-width: 908px)");
  if (screenWidthBig.matches) {
    $("ul").removeClass("nav-menu-mobile");
  }
  else if (screenWidthSmall.matches) {
    $(".nav-menu").addClass("nav-menu-mobile")
  }
}

// Check screen width when page first loads
$(document).ready(function () {
  navBarMobile();
});

// Check screen width when browser is resized
$(window).resize(function () {
  navBarMobile();
});