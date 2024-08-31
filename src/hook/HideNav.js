
function HideNav() {
  let prevScrollPos = scrollY; 
 
  window.onscroll = function() { 
    var currentScrollPos = scrollY; 

    if (prevScrollPos < currentScrollPos) { 
      document.querySelector(".top-nav").classList.add("header-hidden"); 
      document.querySelector(".top-nav").classList.remove("header-visible"); 
    }  
    else { 
      document.querySelector(".top-nav").classList.add("header-visible"); 
      document.querySelector(".top-nav").classList.remove("header-hidden"); 
    } 
    prevScrollPos = currentScrollPos; 
  }; 
}

export default HideNav;