function locomotion() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotion();
function cursorEffect() {
  let cursor = document.querySelector(".cursor");
  let page1Content = document.querySelector(".page1-content");
  let page2 = document.querySelector(".page2");
  let page1 = document.querySelector(".page1");
  page1Content.addEventListener("mousemove", function (move) {
    console.log(move.x);
    gsap.to(cursor, {
      left: move.x,
      top: move.y,
    });
  });
  page2.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      duration: 0,
    });
  });
  page1.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });
}
cursorEffect();
function page2Animation() {
 
  gsap.from(".elem h1", {
    y: 120,
    opacity: 0, // Start with opacity 0 for a fade-in effect
    stagger: 0.5, // Reduce stagger for smoother transition between h1s
    duration: 1.2, // Increase duration for slower movement
    ease: "power3.out", // Smooth easing for a more natural motion
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
    },
  });

  // Animate h3 element in .page2-top
  gsap.from(".page2-top h3", {
    y: 50, // Increase the y offset for a more dramatic entrance
    opacity: 0, // Start with opacity 0
    duration: 0.8, // Slow down the animation a bit
    ease: "power2.out", // Add easing for smooth deceleration
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 75%",
      end: "top 67%",
      scrub: 2,
    },
  });

  // Animate h4 element in .page2-top
  gsap.from(".page2-top h4", {
    y: 50, // Similar y offset as h3
    opacity: 0, // Fade in effect
    duration: 0.8, // Match duration with h3
    ease: "power2.out", // Same easing for consistency
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 75%",
      end: "top 67%",
      scrub: 2,
    },
  });

  gsap.fromTo(
    ".border-line", 
    { scaleX: 0 }, // Start with invisible border
    { 
      scaleX: 1, // Animate to full width
      duration: 2, // Duration of the animation
      ease: "power2.out", // Smooth easing effect
      scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "top 70%", // Start animation when .page2 enters the viewport
        end: "top 30%", // End animation halfway through the section
        scrub: true, // Sync animation with scrolling
      }
    }

);
}
page2Animation();
function page4Animation()
{
    gsap.fromTo(
        ".border-line2", 
        { scaleX: 0 }, // Start with invisible border
        { 
          scaleX: 1, // Animate to full width
          duration: 2, // Duration of the animation
          ease: "power2.out", // Smooth easing effect
          scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 70%", // Start animation when .page2 enters the viewport
            end: "top 40%", // End animation halfway through the section
            scrub: true, // Sync animation with scrolling
          }
        }
    );
    gsap.from(".page4-top h3", {
        y: 40, // Similar y offset as h3
     // Fade in effect
        duration: 0.3, // Match duration with h3
        ease: "power2.out", // Same easing for consistency
        scrollTrigger: {
          trigger: ".page4",
          scroller: ".main",
          start: "top 75%",
          end: "top 67%",
          scrub: 2,
        },
      });
      gsap.from(".elem2 h1", {
        y: 120,
        opacity: 0, // Start with opacity 0 for a fade-in effect
        stagger: 0.5, // Reduce stagger for smoother transition between h1s
        duration: 1.2, // Increase duration for slower movement
        ease: "power3.out", // Smooth easing for a more natural motion
        scrollTrigger: {
          trigger: ".page4",
          scroller: ".main",
          start: "top 80%",
          end: "top 10%",
          scrub: 2,
        },
      });
    
}
page4Animation();

function play()
{
    document.querySelectorAll('.box').forEach(box => 
    {
        const img = box.querySelector('img');
        const video = box.querySelector('video');
    
            img.addEventListener('mouseover', () => {
                img.style.opacity = '0'; // Fade out the image
                
                    video.play(); // Play the video
                    video.style.opacity = '1'; // Ensure video is visible
                
            });
    
            img.addEventListener('mouseout', () => {
                img.style.opacity = '1'; // Show the image again
                
                    video.pause(); // Pause the video
                    video.currentTime = 0; // Optional: Reset the video to the beginning
                    video.style.opacity = '0'; // Hide the video
                
            });
        
    
        
            video.addEventListener('mouseover', () => {
                video.style.opacity = '1'; // Ensure video is visible
                
                    img.style.opacity = '0'; // Fade out the image
                
            });
    
            video.addEventListener('mouseout', () => {
                video.style.opacity = '0'; // Hide the video
                
                    img.style.opacity = '1'; // Show the image again
                
            });
        
    });
    
      
}
play();

function cursorEffect() {
    let cursor = document.querySelector(".cursor");
    let cursor2 = document.querySelector(".cursor2");
    let page1Content = document.querySelector(".page1-content");
    let page2 = document.querySelector(".page2");
    let page1 = document.querySelector(".page1");
    let page4 = document.querySelector(".page4");
  
    // Cursor movement for page1
    page1Content.addEventListener("mousemove", function (move) {
      gsap.to(cursor, {
        left: move.clientX,
        top: move.clientY,
      });
    });
  
    page2.addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        scale: 1,
        duration: 0,
      });
    });
  
    page1.addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        scale: 1,
      });
    });
  
    page1Content.addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        scale: 1,
      });
    });
  
    // Cursor movement for page4
    page4.addEventListener("mousemove", function (move) {
      gsap.to(cursor2, {
        left: move.clientX,
        top: move.clientY,
      });
    });
  
    page4.addEventListener("mouseenter", function () {
      gsap.to(cursor2, {
        scale: 1,
        duration: 0,
      });
    });
  
    page4.addEventListener("mouseleave", function () {
      gsap.to(cursor2, {
        scale: 0,
      });
    });
  }
  
  cursorEffect();
function swiper()
{

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        duration: 1,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
    
}
swiper();


var tl = gsap.timeline()
tl.to(".loader", {
    duration: 2,   // Loader stays for 2 seconds
    opacity: 1     // Ensure it's fully visible
});
tl.from(".loader h3",{

    x:40,
    opacity:0,
    duration:1,
    stagger:0.1,
    dealy:2
});
tl.to(".loader h3",{
    opacity:0,
    x:-40,
    
});
tl.to(".loader",{
    opacity:0,
    duration:1
})
tl.to(".loader",{
    display:"none"
})

tl.from(".page1-content h1 span",
    {
        y:200,
        opacity:0,
        stagger:0.2,
        duration:0.2
    });
console.log(document.querySelectorAll(".page1-content h1 span"));
