// let currentScroll = 0;
// const totalImages = document.querySelectorAll('.anotherImage .images img').length;
// let animationFrameId = null;
let paragraph = [document.querySelector('.msg p')]
let spans = [];
let rightArrow = document.querySelector('.absoluteDiv');
let leftArrow = document.querySelector('.goey');
let bicycleGallery = document.querySelector('.bicycle-gallery');
const navLinks = document.querySelectorAll('nav ul li a');



let ok
function firstPageAnim(){
  ok = gsap.timeline();

  ok.to('nav', {
    y: '-10',
    // opacity : 0,
    duration:1.5,
    ease: Expo.easeInOut
},'na').to(".boundigelem",{
    y:0,
    opacity: 1,
    ease:Expo.easeInOut,
    duration: .9,
    delay:0,
    stagger: .2,

  },'na').to('.aryan_h3 h2',{
    // opacity:0,
    opacity:1,
    x:'0'
  },'sath').to('.aryan_h3 h3',{
    y:0,
    ease:Expo.easeInOut,
    duration: 1,
    delay:0,
    stagger: .2,
    opacity:1
  },'sath')
}

// firstPageAnim();

let loader = document.querySelector('.loader')
let percent = document.querySelector('.newdiv');
let id;
let width = 1;
let animationsCompleted = 0;
function move() {
    id = setInterval(frame, 40);
}
function frame() {
    if (width === 100) {
      loader.style.backgroundColor = 'transparent';
      percent.style.opacity = 0;
      clearInterval(id);
      gsap.to('.left', {
        duration: 1,
        left:'-50%',
        ease: 'power1.inOut',
        onComplete: checkCompletion
      });
      
      gsap.to('.right', {
        duration: 1,
        right : '-50%',
        ease: 'power1.inOut',
        onComplete: checkCompletion
      });

    

  }
  else {
    // console.log('okay');
      ++width;
      document.querySelector(".newdiv").innerHTML = width + "%";
  }
  

}

function checkCompletion() {
  animationsCompleted++;
  if (animationsCompleted === 2) {
    loader.style.display = 'none';
    firstPageAnim()
  }
  
}


document.addEventListener('DOMContentLoaded', () => {

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

  //Text Reveal animation
  // console.log(paragraph);
  paragraph.forEach(paragraph => {
    let htmlString = "";
    let pArray = paragraph.textContent.split('');
    // console.log(pArray);
    for (let i = 0; i < pArray.length; i++) {
      htmlString += `<span>${pArray[i]}</span>`;
    }
    paragraph.innerHTML = htmlString;
  })

  spans = document.querySelectorAll('.msg p span')
  // console.log(spans);
  function Revealspan() {
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].parentElement.getBoundingClientRect().top < window.innerHeight / 2) {
        let { left, top } = spans[i].getBoundingClientRect();
        top = top - (window.innerHeight * 0.4);
        let opacityValue = 1 - ((top * 0.01) + (left * 0.001)) < 0.1 ? 0.1 : 1 - ((top * 0.01) + (left * 0.001)).toFixed(3);
        opacityValue > 1 ? 1 : opacityValue.toFixed(3);
        spans[i].style.opacity = opacityValue;
      }
    }
  }

  window.addEventListener('scroll', () => {
    Revealspan();
  })


  //Minimap Animation

  const ImageContainer = document.querySelector('.mainImages');
  const preview = document.querySelector('.preview');
  const minimap = document.querySelector('.minimap');


  function getElementTop(elem) {
    let top = 0;
    while (elem) {
      top += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return top;
  }


  const ImageStart = getElementTop(ImageContainer);
  const ImageEnd = ImageStart + ImageContainer.offsetHeight;
  const viewPortHeight = window.innerHeight;
  const previewHeight = preview.offsetHeight;
  const previewMaxTranslate = (minimap.offsetHeight - previewHeight) * 1.71;


  function handleScroll() {

    // console.log("in");   
    const scrollPosition = window.scrollY;
    // const scrollPoition = event.scroll.y;
    const scrollRange = ImageEnd - ImageStart - viewPortHeight;
    const previewScrollRange = Math.min(previewMaxTranslate, scrollRange);

    if (
      scrollPosition >= ImageStart &&
      scrollPosition <= ImageEnd - viewPortHeight
    ) {
      let scrollFraction = (scrollPosition - ImageStart) / scrollRange;
      let previewTranslateY = scrollFraction * previewScrollRange;

      preview.style.transform = `translateX(-50%) translateY(${previewTranslateY}px)`;
    } else if (scrollPosition < ImageStart) {
      preview.style.transform = `translateX(-50%) translateY(0%)`;
    } else {
      preview.style.transform = `translateX(-50%) translateY(${previewMaxTranslate}px)`
    }
  }


  window.addEventListener('scroll', handleScroll);

  // scroll.on('scroll', handleScroll);

  const togglePart = window.innerHeight * 3;

  const main = document.querySelector('#NewWrapper');

  function checkScroll() {
    if (window.scrollY >= togglePart) {
      // if(event.scroll.y >= togglePart){
      main.classList.add('light-theme');
    } else {
      main.classList.remove('light-theme');
    }
  }

  window.addEventListener('scroll', checkScroll);

  // scroll.on('scroll', checkScroll);
})

// Test Animation

let imgBx = document.querySelectorAll('.imgBx');
let contentBx = document.querySelectorAll('.contentBx');

for(let i=0; i<imgBx.length;i++){
    imgBx[i].addEventListener('mouseover',function(){
        for(let i=0;i<contentBx.length;i++){
            contentBx[i].className='contentBx';
        }
        document.getElementById(this.dataset.id).
        className = 'contentBx active';

       for(let i=0; i<imgBx.length;i++){
        imgBx[i].className = 'imgBx' ;
       }
       this.className = 'imgBx active';
        
    })
}

//product

rightArrow.addEventListener('click', () => {
  bicycleGallery.scrollBy({
      left: 600, // Adjust this value according to the width of your bicycle card
      behavior: 'smooth'
  });
});

leftArrow.addEventListener('click', () => {
  bicycleGallery.scrollBy({
      left: -600, // Adjust this value according to the width of your bicycle card
      behavior: 'smooth'
  });
});



//Horizontal Scroll

var hori = gsap.timeline({
  scrollTrigger: {
    // markers:true,
    trigger: '.slides',
    start: "20% 20%",
    end: '400% 100%',
    scrub: 2,
    pin: true
  }
});

hori.to('.H-item', {
  x: '-300%',
  duration: 2.5,
  ease: Expo.easeInOut,
  stagger: 0
});

