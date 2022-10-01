'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
})
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// ---------Smooth scorlling-----

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', () => {

  // const secViewPort=section1.getBoundingClientRect();
  // window.scrollTo(secViewPort.left+window.pageXOffset,secViewPort.top+window.pageYOffset)
  section1.scrollIntoView({ behavior: 'smooth' });
});

// --------Smooth scrolling on nav links------
document.querySelectorAll('.nav__links').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

});

//-------Showing Relevant Content-----------

document.querySelector('.operations__tab-container').addEventListener('click', function (e) {

  //----Active btn----
  const activeBtn = e.target.closest('.operations__tab');
  if (!activeBtn) return;
  document.querySelectorAll('.operations__tab').forEach(t => t.classList.remove('operations__tab--active'));
  activeBtn.classList.add('operations__tab--active');
  //------Active Content-----
  setTimeout(function () {
    document.querySelectorAll('.operations__content').forEach(el => el.classList.remove('operations__content--active'))
  }, 200)
  setTimeout(function () {
    document.querySelector(`.operations__content--${activeBtn.dataset.tab}`).classList.add('operations__content--active');
  }, 200)
})
//-----Transperency on nav links-------

const hovered = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const navLink = e.target;
    const siblings = document.querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== navLink) el.style.opacity = opacity;
    })
  }
}

document.querySelector('.nav').addEventListener('mouseover', e => {
  hovered(e, 0.5);
});

document.querySelector('.nav').addEventListener('mouseout', e => {
  hovered(e, 1);
});

// -----Sticky nav bar-------
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else
    nav.classList.remove('sticky');
}
const appearanceAt = {
  root: null,
  rootMargin: '-90px',
}
const observer = new IntersectionObserver(stickyNav, appearanceAt);
observer.observe(header);

//----------Revealing element on Scrolling------------
const sections = document.querySelectorAll('.section')
let previousSection;
const revealSection = function (entries, observer) {
  // sections.forEach(sec=>sec.classList.add('section--hidden'));
  const [entry] = entries;
  const targetSec = entry.target;
  if (!entry.isIntersecting) return;
  else
    targetSec.classList.remove('section--hidden');
  observer.unobserve(targetSec);
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15

})
sections.forEach(sec => sectionObserver.observe(sec));

// -----------Revealing Images--------

const blurrImgs = document.querySelectorAll('.features__img');
const revealImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.getAttribute('data-src');

  // ----Blurr will be removed when img is fully loaded-------
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0.1,
  rootMargin: '200px'
})
blurrImgs.forEach(img => imgObserver.observe(img));

// -------- Creating Slider----------
const slideImgs = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const silderBtnLeft = document.querySelector('.slider__btn--left');
const silderBtnRight = document.querySelector('.slider__btn--right');
const sliderDots = document.querySelectorAll('.dots__dot');
let curSlide = 0;
const maxSlides = slideImgs.length;

//-------Add active class to current slide---------
const addActive = function () {
  sliderDots.forEach(dot => dot.classList.remove('dots__dot--active'));
  sliderDots[curSlide].classList.add('dots__dot--active');
}

// ----------Make current slide at 0%------------
const moveSlides = function (curSlide) {
  slideImgs.forEach((img, i) => {
    img.style.transform = `translateX(${(i - curSlide) * 100}%)`
  })
  addActive();
}

//---------Slider Button ---------
const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  }
  else curSlide++;
  moveSlides(curSlide);
}
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  }
  else
    curSlide--;
  moveSlides(curSlide);

}

moveSlides(0);
silderBtnRight.addEventListener('click', nextSlide);
silderBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  (e.key === "ArrowRight") && nextSlide();
  (e.key === "ArrowLeft") && prevSlide();
})

// -------Slider Dots------

sliderDots.forEach((dot, i) => {
  dot.addEventListener('click', (e) => {
    curSlide = i;
    moveSlides(i);
  });
})
















// const operationTabBtn=document.querySelectorAll('.operations__tab')
// const operationContent=document.querySelectorAll('.operations__content');
// document.querySelector('.operations__tab-container').addEventListener('click',(e)=>{
//   const clickedBtn=e.target.closest('.operations__tab');
//   if(clickedBtn)
//   {
//   const clickedBtnNo=clickedBtn.dataset.tab;
//   operationContent.forEach(el=>el.classList.remove('operations__content--active'));
//   operationTabBtn.forEach(btn=>btn.classList.remove('operations__tab--active'));
//   setTimeout(function(){ clickedBtn.classList.add('operations__tab--active');
//   },100);
//   setTimeout(function(){ operationContent[clickedBtnNo-1].classList.add('operations__content--active');
//   },100);

//   }
// })

//-------- bubbling and capturing-----------
// const randNum=()=>{
//   return Math.floor(Math.random()*255 +1);
// }
// const navLink=document.querySelectorAll('.nav__link');
// const randColor=()=>`rgb(${randNum()} ,${randNum()}, ${randNum()})`;
// for (const x of navLink) {
//   console.log(x);
//   x.addEventListener('click',function(e){
//     this.style.backgroundColor=randColor();
//     });

// }
// document.querySelector('.nav ').addEventListener('click',function(e){
//   this.style.backgroundColor=randColor();

// })
