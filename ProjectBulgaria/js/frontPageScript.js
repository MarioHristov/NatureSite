const parallax_elems = document.querySelectorAll(".parallax");
    
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY * 0.5;
  parallax_elems.forEach((el) => {
    const speedFactor = parseFloat(el.dataset.speed); // Adjust speed for each layer
    el.style.transform = `translateY(${scrollPosition * speedFactor}px)`;
  });
});

const links = document.querySelectorAll('.link-url');

links.forEach(link =>{
    const div = link.previousElementSibling;
    link.addEventListener('mouseover', ()=>{
        div.classList.remove("inactive");
    });
    link.addEventListener('mouseout', ()=>{
        div.classList.add("inactive");
    });
});


//  window.addEventListener('scroll', () => {
//    console.log(`Scroll position: ${window.scrollY}`);
//    parallax_elems.forEach((el) => {
//      console.log(`Element updated:`, el);
//    });
//  });