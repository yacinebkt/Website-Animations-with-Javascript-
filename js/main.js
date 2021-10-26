function initiale(){
    const pages = document.querySelectorAll(".page");
    const sections = document.querySelectorAll(".section");
    const bgs = [`radial-gradient(#107386, #9E3559)`,`radial-gradient(#7E6E6D, #2D2B36)`,`radial-gradient(#6BBEE4, #062B4D)`];

    
    pages.forEach((page, i) =>{
        page.addEventListener("click", function(){
            updateState(this);
            next(i);
            currentSection = i;
        });

      

    });

   function updateState(x) {
        pages.forEach((page) =>{
            page.classList.remove("active")
        });
       x.classList.add("active")
   }

   
    // the trucker Mister x (variable not const)
    let misterx = 0;

    function next(i){
       const nSection = sections[i];
       const thisSection = sections [misterx];
       const nextImageLeft = nSection.querySelector(".section-image .image-left");
       const nextImageRight = nSection.querySelector(".section-image .image-right");
       const thisImageLeft = thisSection.querySelector(".section-image .image-left");
       const thisImageRight = thisSection.querySelector(".section-image .image-right");
       const nextText = nSection.querySelectorAll(".main-content .section-details");
       const thisText = thisSection.querySelectorAll(".main-content .section-details");

       const main = document.querySelectorAll("div.main");
        
       /* const tl = new TimelineMax ();*/

       
       const tl = new TimelineMax ();

        tl.fromTo(thisImageLeft, .3, { y:"-10%" }, { y:"-100%" })
        .fromTo(thisImageRight, .3, { y:"-10%" }, { y:"100%"}, "-=.2")

        .to(main, 0.3, {backgroundImage: bgs[i] })

        .fromTo(thisSection, .3, { opacity: 1, pointerEvents: 'all' }, {opacity: 0, pointerEvents: 'none'})

        .fromTo(nSection, .3, { opacity:0 , pointerEvents: 'none' }, {opacity:1, pointerEvents:'all'}, "-=.3")

        .fromTo(nextImageLeft, .3, {y:"-100%"}, {y:"-10%"}, "-=.2")

        .fromTo(nextImageRight, .3, {y:"100%"}, {y:"10%"}, "-=.3")
        .fromTo(nextText, .3, { opacity:0, x:-80 }, {opacity:1, x:0})

        .set(nextImageLeft, {clearProps:"all"})
        
        .set(nextImageRight, {clearProps:"all"})



        console.log(misterx)
        misterx = i ;
   }



   /* add event after scrolling*/
   let currentSection = 0;
   
  document.addEventListener("wheel", throttle(newScroll, 1850)); /* wheel --> when csrolling */
  // init the prop deltaX: 0 and deltaY: 0 (in wheel)

  
  document.addEventListener("touchmove", throttle(newScroll, 1850)); /* for small device -mobile- */

  function newScroll (event) {
     // console.log(event);
     if (event.deltaY > 0 ){
        currentSection = currentSection + 1;
     }else{
        currentSection = currentSection - 1;
     }

    // console.log(currentSection);

     
     if (currentSection > 2){
        currentSection = 0;
     }

     if (currentSection < 0){
        currentSection = 2;
     }

     next(currentSection);
     updateDotes(currentSection)
     
  }


  function updateDotes(i){
      const activeDote = document.querySelectorAll(".navigation-right .page")[i];
      pages.forEach((page) =>{
        page.classList.remove("active")
      });
      activeDote.classList.add("active")
    };

    const menu = document.querySelector('.hamburger');
    /*
    const svgHamburgerLine1 = document.querySelector('.hamburger .line1');
    const svgHamburgerLine2 = document.querySelector('.hamburger .line2');
    const svgHamburgerLine3 = document.querySelector('.hamburger .line3');
    */


    const hamburgerClick = document.querySelector('.hamburger-click');
    const contact = document.querySelector('.hamburger-click .contact');
    const media = document.querySelector('.hamburger-click .media');
    const logo = document.querySelector('nav .logo');

    const logo1 = document.querySelector('nav .logo .img1');
    const logo2 = document.querySelector('nav .logo .img2');

    const timenew = new TimelineMax({paused: true, reversed:true});
    TweenLite.defaultEase = Linear.easeNone;

  /*  timenew.to(hamburgerClick, .6,{y:0});*/
    timenew.to(hamburgerClick, 0.6,{y:0, width:"100%", height:"100%", borderRadius:"0%"});

    timenew.fromTo(contact, .6,{opacity:0, y:10},{opacity:1, y:0});

    timenew.fromTo(media, .6,{opacity:0, y:10},{opacity:1, y:0} , "-=.2");

    timenew.fromTo(logo, .3,{opacity:1, x:0, y:0, color:'white'},{opacity:1, x:8, y:8, color:'black'} , "-=.2");

/*
    timenew.fromTo(svgHamburgerLine1, .1, {stroke: "white"}, {stroke:"black"} , "+=.1");
    timenew.fromTo(svgHamburgerLine2, .1, {stroke: "white"}, {stroke:"black"} , "+=.2");
    timenew.fromTo(svgHamburgerLine3, .1, {stroke: "white"}, {stroke:"black"} , "+=.3");
*/
let va = 0 ;

    menu.addEventListener("click", () =>{
        
        timenew.reversed() ? timenew.play() : timenew.reverse();
        /*logo1.classList.toggle('dnone1')*/
       /* logo2.classList.toggle('dnone')*/

        const t2 = new TimelineMax();
        
        const t3 = new TimelineMax();

        

        if (va === 0 ) {

          t2.fromTo(logo1, .3,{opacity:1, display:"block",},{opacity:0, display:"none"} );

          t2.fromTo(logo2, .3,{opacity:0, display:"none",},{opacity:1, display:"block"} );

          va = va + 1;  
                  
        } else{
         /* t2.fromTo(logo1, .3,{opacity:0, display:"none",},{opacity:1, display:"block"} );*/

          t3.fromTo(logo2, 1.5,{opacity:0, display:"block",},{opacity:1, display:"none"} );
          t3.fromTo(logo1, .8,{opacity:0, display:"none",},{opacity:1, display:"block"} )

          va = va - 1;          

        }

       



        
    });

  

    /* Get in touche */
    const sideBar = document.querySelector('.side-bar');
    const sideForm = document.querySelector('.side-form');
    
    

    sideBar.addEventListener("click", () =>{
      sideForm.classList.toggle('display-sideForm')
  });

  /* MENU BAR */

}



function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
}
  

initiale();