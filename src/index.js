/*!
 * face-cursor.js (github.com/matthias-vogt/face-cursor.js)
 * Copyright (c) 2016 Matthias Vogt (ISC License)
 */

import {TimelineMax,TweenLite} from "gsap";
!function(t,e,n,s){"use strict";var o="faceCursor",a={avertCursor:!1,perspective:"6rem",cacheElementData:!0},i=function(e,n){e===s&&(e={});var o=function(){this.destroy=r.destroy,this.init()};t.extend(r,{options:e,$elements:n}),t.extend(o.prototype,r);var a=new o;return a},r={get settings(){return delete this.settings,this.settings=t.extend(!0,{},a,this.options)},destroy:function(){this.$elements.off("."+o)},init:function(){var e=this;this.options.cacheElementData&&this.cacheElementData(),this.animFrameLoop(e),t(n).on("mousemove."+o,function(t){e.lastMouseCoords={x:t.pageX,y:t.pageY}})},lastMouseCoords:null,getElementData:function(e){var n=this;this.$elements.each(function(s,a){n.settings.cacheElementData&&t(a).data("."+o)?e(t(a).data("cachedData."+o),t(a)):e({w:t(a).outerWidth(),h:t(a).outerHeight(),offset:t(a).offset()},t(a))})},cacheElementData:function(){this.getElementData(function(t,e){e.data("cachedData."+o,t)})},animFrameLoop:function(t){e.requestAnimationFrame(function(){t.frame(),t.animFrameLoop(t)})},frame:function(){if(this.lastMouseCoords){var t=this;this.getElementData(function(e,n){var s=t.lastMouseCoords.x-(e.offset.left+e.w/2),o=t.lastMouseCoords.y-(e.offset.top+e.h/2),a=s/(e.w/2),i=o/(e.h/2);n.css("transform","perspective("+t.settings.perspective+")rotate3d("+(i*(t.settings.avertCursor?1:-1)).toFixed(2)+", "+(a*(t.settings.avertCursor?-1:1)).toFixed(2)+", 0, 1deg)")})}}};t.fn[o]=function(e){return this.each(function(){t(this).data("plugin_"+o)&&t(this).data("plugin_pluginName").destroy(),t(this).data("plugin_"+o,i(e,t(this)))})}}(jQuery,window,document);

$(document).ready(()=>{
    // screen width
    let screenWidth = $(window).width();

    // navigation response
    $(".nav__menu-icon__container").click(function(){
        $(".nav__list--navigation").toggleClass("sheet");
        $(this).toggleClass("burger");
    })

    // sheet hover effect
    $(".nav__item").hover(function(){
        $(this).children().addClass("bold");
    },function(){
        $(this).children().removeClass("bold");
    })

    // remove the sheet
    $(".nav__link").click(function(){
        $(".nav__list--navigation").removeClass("sheet");
        $(".nav__menu-icon__container").removeClass("burger");
    })

    // left part hover effect
    $(".left__item").hover(function(){
        if(screenWidth <991) return;
        TweenLite.to(".left",0.5,{width:"8vw",backgroundColor:"rgba(0,0,0,.3)"});
        TweenLite.to(".left__behind",0.5,{x:"8.5vw",opacity:1});
    },function(){
        if(screenWidth <991) return;
        TweenLite.to(".left",0.5,{width:"6vw",backgroundColor:"rgba(0,0,0,.2)"});
        TweenLite.to(".left__behind",0.5,{x:0,opacity:0});
    })

    // side-bar stripes
    $(".left__item").click(function(){
        $(this).parent(".left__list").siblings().children().removeClass("string");
        $(this).parent(".left__list").siblings().children().removeClass("active-sideBar");
        $(this).parent().children().addClass("string");
        $(this).parent().children().addClass("active-sideBar");
    })

    // side bar hover effect
    $(".left__item").hover(function(){
        $(this).parent().children().addClass("active-sideBar-hover");
    },function(){
        $(this).parent().children().removeClass("active-sideBar-hover");
    })


    // landing page animation
    // different part of first card
    // should be displayed when page loads up
    let firstCard  = $(".card")[0];
    let firstStripe = $(firstCard).children(".card__vertical").first();
    let cardTexts = $(firstCard).children(".card__text");
    let lastStripe = $(firstCard).children(".card__vertical").last();
    let cardButton = $(firstCard).children().last();
    let timeEngine = new TimelineMax();
    timeEngine
    .staggerTo(".left__item",0,{className: "+=cannotclick"})
    .to("#home",1,{backgroundColor : "rgba(0,0,0,0.5)"})
    .to(firstStripe,1,{scaleY : 1})
    .staggerTo(cardTexts,0.5,{opacity:1},0.5)
    .to(lastStripe,1,{scaleY : 1})
    .to(cardButton,0.5,{opacity : 1})
    .staggerTo(".left__item",0,{className: "-=cannotclick"});
    $(firstCard).addClass("card-is-shown");
    $(firstCard).faceCursor({
        perspective: "12rem",
        cacheElementData: false
    });


    // a generic function for other cards and home backgrounds
    $(".left__item").click(function(){
        var index = $(this).parent(".left__list").index();
        let cardWithSameIndex = $(".card")[index];
        let ThisCardIsShown = $(".card-is-shown");
        if($(cardWithSameIndex).hasClass("card-is-shown")){
            return;
        }else{
            let shownFirstStripe = $(ThisCardIsShown).children(".card__vertical").first();
            let shownCardTexts = $(ThisCardIsShown).children(".card__text");
            let shownLastStripe = $(ThisCardIsShown).children(".card__vertical").last();
            let shownCardButton = $(ThisCardIsShown).children().last();
            let showFirstStripe = $(cardWithSameIndex).children(".card__vertical").first();
            let showCardTexts = $(cardWithSameIndex).children(".card__text");
            let showLastStripe = $(cardWithSameIndex).children(".card__vertical").last();
            let showCardButton = $(cardWithSameIndex).children().last();
            let cardTimeEngine = new TimelineMax();
            cardTimeEngine
            .staggerTo(".left__item",0,{className: "+=cannotclick"})
            .to(shownCardButton,0.2,{opacity:0})
            .to(shownLastStripe,0.5,{scaleY:0})
            .staggerTo(shownCardTexts,0.5,{opacity:0},0.2)
            .to(shownFirstStripe,0.5,{scaleY:0})
            .to("#home",0.5,{backgroundColor : "rgba(0,0,0,1)"})
            .to("#home",0.1,{className : "class"+index+""})
            .to("#home",0.5,{backgroundColor : "rgba(0,0,0,0.5)"})
            .to(showFirstStripe,1,{scaleY:1})
            .staggerTo(showCardTexts,0.5,{opacity:1},0.5)
            .to(showLastStripe,1,{scaleY:1})
            .to(showCardButton,0.5,{opacity:1})
            .staggerTo(".left__item",0,{className: "-=cannotclick"})
            $(ThisCardIsShown).removeClass("card-is-shown");
            $(cardWithSameIndex).addClass("card-is-shown"); 
            $(cardWithSameIndex).faceCursor({
                perspective: "12rem",
                cacheElementData: false
            });
        }
    })


    // flip card hover
    $(".flip-card").hover(function(){
        let cardChild = $(this).children(".flip-card__content");
        TweenLite.to(cardChild,2,{rotationY : "180deg"})
    },function(){
        let cardChild = $(this).children(".flip-card__content");
        TweenLite.to(cardChild,2,{rotationY : 0})
    })

    // carousel setting
    const slide = $(".slide");
    const slideWidth = $(slide).height();
    let turn = 1;
    TweenLite.to(".carousel__slider",0,{y : -slideWidth * turn})

    // $(".btnNext").click(function(){
    //     if(turn >= slide.length -1) return;
    //     turn++;
    //     TweenLite.to(".carousel__slider",1,{y :-slideWidth * turn})
    // })

    // $(".btnPrev").click(function(){
    //     if(turn <= 0) return;
    //     turn--;
    //     TweenLite.to(".carousel__slider",1,{y :-slideWidth * turn})
    // })

    $(".btnNext").click(function(){
        if(turn >= slide.length -1){
            $(this).addClass("btn-hide");
        }
        else{
            if($(".btnPrev").hasClass("btn-hide")){
                $(".btnPrev").addClass("btn-show");
            }
            turn++;
            TweenLite.to(".carousel__slider",1,{y :-slideWidth * turn})
        }
    })

    $(".btnPrev").click(function(){
        if(turn <= 0){
            $(this).addClass("btn-hide");
        }
        else{
            if($(".btnNext").hasClass("btn-hide")){
                $(".btnNext").addClass("btn-show");
            }
            turn--;
            TweenLite.to(".carousel__slider",1,{y :-slideWidth * turn})
        }
    })

   


    // input animations
    $(".input").focusin(function(){
        $(this).siblings().addClass("label-focus-in");
    });
    $(".input").focusout(function(){
        if($(this).val().trim() == ""){
            $(this).siblings().removeClass("label-focus-in");
        }
    });

    // input validations and responses
    // this validations are just for demonstration purposes
    // need to be adjusted
    $(".input").change(function(){
        let value = $(this).val().trim();
        if(value === ""){
            $(this).parent().removeClass("correct");
            $(this).parent().removeClass("wrong");
            $(this).siblings().removeClass("label-correct");
            $(this).siblings().removeClass("label-wrong");
        }
        else if(value.length > 0 && value.length < 6 || value.length > 12) {
            $(this).parent().removeClass("correct");
            $(this).parent().addClass("wrong");
            $(this).siblings().removeClass("label-correct");
            $(this).siblings().addClass("label-wrong");
        }
        else{
            $(this).parent().addClass("correct");
            $(this).siblings().addClass("label-correct");
        }
    });

    // gallery animations
    $(".work--first__item:eq(0)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"700vh",gridTemplateRows : "repeat(14,1fr)",gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS''Audi-S4_Avant''Bentley-Flying_Spur''Porsche-Panamera''Lamborghini-Urus''Porsche-718_Spyder''Mercedes-Benz-GLC63_S''BMW-M8_Competition_Coupe''Porsche-Cayenne_Turbo_Coupe''Mercedes-Benz-CLA45_S''BMW-745Le''Audi-TT_RS_Roadster''Bentley-Continental_GT''BMW-X3_M_Competition'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"325vh",gridTemplateRows : "repeat(13,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS Audi-S4_Avant''Bentley-Flying_Spur Bentley-Flying_Spur''Bentley-Flying_Spur Bentley-Flying_Spur''Porsche-Panamera Lamborghini-Urus''Porsche-718_Spyder Porsche-718_Spyder''Porsche-718_Spyder Porsche-718_Spyder''Mercedes-Benz-GLC63_S BMW-M8_Competition_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Mercedes-Benz-CLA45_S BMW-745Le''Bentley-Continental_GT Bentley-Continental_GT''Bentley-Continental_GT Bentley-Continental_GT''BMW-X3_M_Competition Audi-TT_RS_Roadster'"})
            $(".work--second--14").removeClass("big");
            $(".work--second--8").removeClass("big");
            $(".work--second--9").removeClass("big");
            $(".work--second--10").removeClass("big");
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"520vh",gridTemplateRows : "repeat(13,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS Audi-S4_Avant''Bentley-Flying_Spur Bentley-Flying_Spur''Bentley-Flying_Spur Bentley-Flying_Spur''Porsche-Panamera Lamborghini-Urus''Porsche-718_Spyder Porsche-718_Spyder''Porsche-718_Spyder Porsche-718_Spyder''Mercedes-Benz-GLC63_S BMW-M8_Competition_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Mercedes-Benz-CLA45_S BMW-745Le''Bentley-Continental_GT Bentley-Continental_GT''Bentley-Continental_GT Bentley-Continental_GT''BMW-X3_M_Competition Audi-TT_RS_Roadster'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"300vh",gridTemplateRows : "repeat(12,1fr)",gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS Aston_Martin-DBS Audi-S4_Avant''Aston_Martin-DBS Aston_Martin-DBS Audi-S4_Avant''Bentley-Flying_Spur Bentley-Flying_Spur Porsche-Panamera''Bentley-Flying_Spur Bentley-Flying_Spur Porsche-Panamera''Lamborghini-Urus Porsche-718_Spyder Mercedes-Benz-GLC63_S''Lamborghini-Urus Porsche-718_Spyder Mercedes-Benz-GLC63_S''BMW-M8_Competition_Coupe Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''BMW-M8_Competition_Coupe Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Mercedes-Benz-CLA45_S BMW-745Le Audi-TT_RS_Roadster''Mercedes-Benz-CLA45_S BMW-745Le Audi-TT_RS_Roadster''Bentley-Continental_GT Bentley-Continental_GT BMW-X3_M_Competition''Bentley-Continental_GT Bentley-Continental_GT BMW-X3_M_Competition'"})
            $(".grand-tourer").first().css({backgroundPositionY : "470px"});
        }
    })
    $(".work--first__item:eq(1)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"150vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS''Bentley-Continental_GT''BMW-M8_Competition_Coupe'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"75vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS BMW-M8_Competition_Coupe''Bentley-Continental_GT Bentley-Continental_GT''Bentley-Continental_GT Bentley-Continental_GT'"})
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"120vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS BMW-M8_Competition_Coupe''Bentley-Continental_GT Bentley-Continental_GT''Bentley-Continental_GT Bentley-Continental_GT'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"50vh",gridTemplateRows : "repeat(2,1fr)", gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateAreas :"'Aston_Martin-DBS Bentley-Continental_GT BMW-M8_Competition_Coupe''Aston_Martin-DBS Bentley-Continental_GT BMW-M8_Competition_Coupe'"})
            $(".grand-tourer").first().css({backgroundPosition : "center"});
        }
    })
    $(".work--first__item:eq(2)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"200vh",gridTemplateRows : "repeat(4,1fr)", gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'Lamborghini-Urus''Porsche-Cayenne_Turbo_Coupe''Mercedes-Benz-GLC63_S''BMW-X3_M_Competition'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"125vh",gridTemplateRows : "repeat(5,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Lamborghini-Urus Mercedes-Benz-GLC63_S''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''BMW-X3_M_Competition BMW-X3_M_Competition' 'BMW-X3_M_Competition BMW-X3_M_Competition'"})
            $(".work--second--14").addClass("big");
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"200vh",gridTemplateRows : "repeat(5,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Lamborghini-Urus Mercedes-Benz-GLC63_S''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''Porsche-Cayenne_Turbo_Coupe Porsche-Cayenne_Turbo_Coupe''BMW-X3_M_Competition BMW-X3_M_Competition' 'BMW-X3_M_Competition BMW-X3_M_Competition'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"100vh",gridTemplateRows : "repeat(4,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Lamborghini-Urus Porsche-Cayenne_Turbo_Coupe''Lamborghini-Urus Porsche-Cayenne_Turbo_Coupe''BMW-X3_M_Competition Mercedes-Benz-GLC63_S''BMW-X3_M_Competition Mercedes-Benz-GLC63_S'"})
        }
    })
    $(".work--first__item:eq(3)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"150vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'Audi-S4_Avant''Porsche-Panamera''Mercedes-Benz-CLA45_S'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"75vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Audi-S4_Avant Porsche-Panamera''Mercedes-Benz-CLA45_S Mercedes-Benz-CLA45_S' 'Mercedes-Benz-CLA45_S Mercedes-Benz-CLA45_S'"})
            $(".work--second--8").addClass("big");
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"120vh",gridTemplateRows : "repeat(3,1fr)", gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Audi-S4_Avant Porsche-Panamera''Mercedes-Benz-CLA45_S Mercedes-Benz-CLA45_S' 'Mercedes-Benz-CLA45_S Mercedes-Benz-CLA45_S'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"50vh",gridTemplateRows : "repeat(2,1fr)", gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateAreas :"'Audi-S4_Avant Porsche-Panamera Mercedes-Benz-CLA45_S''Audi-S4_Avant Porsche-Panamera Mercedes-Benz-CLA45_S'"})
        }
    })
    $(".work--first__item:eq(4)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"100vh",gridTemplateRows : "repeat(2,1fr)",gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'BMW-745Le''Bentley-Flying_Spur'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"100vh",gridTemplateRows : "repeat(4,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'BMW-745Le BMW-745Le''BMW-745Le BMW-745Le''Bentley-Flying_Spur Bentley-Flying_Spur''Bentley-Flying_Spur Bentley-Flying_Spur'"})
            $(".work--second--9").addClass("big");
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"160vh",gridTemplateRows : "repeat(4,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'BMW-745Le BMW-745Le''BMW-745Le BMW-745Le''Bentley-Flying_Spur Bentley-Flying_Spur''Bentley-Flying_Spur Bentley-Flying_Spur'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"50vh",gridTemplateRows : "repeat(2,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'BMW-745Le Bentley-Flying_Spur''BMW-745Le Bentley-Flying_Spur'"})
        }
    })
    $(".work--first__item:eq(5)").click(function(){
        if(screenWidth <= 634){
            TweenLite.to(".work--second",0.5,{height:"100vh",gridTemplateRows : "repeat(2,1fr)",gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateAreas :"'Porsche-718_Spyder''Audi-TT_RS_Roadster'"})
        }
        else if(screenWidth > 634 && screenWidth <= 768){
            TweenLite.to(".work--second",0.5,{height:"100vh",gridTemplateRows : "repeat(4,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Porsche-718_Spyder Porsche-718_Spyder' 'Porsche-718_Spyder Porsche-718_Spyder''Audi-TT_RS_Roadster Audi-TT_RS_Roadster' 'Audi-TT_RS_Roadster Audi-TT_RS_Roadster'"})
            $(".work--second--10").addClass("big");
        }
        else if(screenWidth > 768 && screenWidth <= 991){
            TweenLite.to(".work--second",0.5,{height:"160vh",gridTemplateRows : "repeat(4,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Porsche-718_Spyder Porsche-718_Spyder' 'Porsche-718_Spyder Porsche-718_Spyder''Audi-TT_RS_Roadster Audi-TT_RS_Roadster' 'Audi-TT_RS_Roadster Audi-TT_RS_Roadster'"})
        }
        else{
            TweenLite.to(".work--second",0.5,{height:"50vh",gridTemplateRows : "repeat(2,1fr)",gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateAreas :"'Porsche-718_Spyder Audi-TT_RS_Roadster''Porsche-718_Spyder Audi-TT_RS_Roadster'"})
        }
    })


    // clients animation
    $(".clients__pic").hover(function(){
        $(this).siblings().css({filter : "grayscale(1)"});
        $(this).css({filter : "grayscale(0)"});
        let clientIndex = $(this).index();
        let quoteShow = $(".quotes")[clientIndex];
        let nameShow = $(".name")[clientIndex];
        $(quoteShow).siblings(".quotes").addClass("fade-away");
        $(quoteShow).removeClass("fade-away");
        $(nameShow).siblings(".name").addClass("fade-away");
        $(nameShow).removeClass("fade-away");
    });
    
    // this counter is used in the first observer
    let counter = 0;

    $(window).scroll(function(){
        
        // window scroll info
        let windowScroll = $(this).scrollTop();
        let windowHeight = $(this).height();
        let scroll1 = windowScroll + windowHeight;

        // navigation
        var navItems = $(".smooth");
        $(navItems).each(function(){
            var sectionOffset = ($(this.hash).offset().top)-60;
            if(sectionOffset <= windowScroll){
                $(this).parent().siblings().removeClass("active");
                $(this).parent().addClass("active");  
            }
        })

        // logo rotating while scroll
        $(".nav__img").css({transform : "rotate("+windowScroll+"deg)"});

        // services 3 observer
        let servicesThirdOffsetTop = $(".services--third").offset().top;
        let servicesThirdHeight = $(".services--third").height();
        let scroll2 = servicesThirdHeight + servicesThirdOffsetTop;
        if(scroll1 >= scroll2){
            let firstSvg = $(".wheel__svg:eq(0)");
            let secondSvg = $(".wheel__svg:eq(1)");
            let thirdSvg = $(".wheel__svg:eq(2)");
            let fourthSvg = $(".wheel__svg:eq(3)");
            let fifthSvg = $(".wheel__svg:eq(4)");
            let sixthSvg = $(".wheel__svg:eq(5)");
            let firstContainer = $(".inside__circle__container:eq(0)");
            $(firstContainer).addClass("shown_container");

            (function wheelAnimateInitialize(){
                if(counter >= 1){
                    return;
                }else{
                    let wheelAnimation = new TimelineMax();
                    wheelAnimation
                    .to(".wheel__svg",0,{className : "+=cannotclick"})
                    .to(".services--third__wheel",3,{rotation : "2000deg"})
                    .to(firstContainer,0.5,{opacity : 1})
                    .to(".wheel__svg",0,{className : "-=cannotclick"})
                    counter ++;
                    console.log(counter);
                }
            }());
            
            if (screenWidth > 768 && screenWidth < 991){
                let wheelSvgAnimation = new TimelineMax();
                wheelSvgAnimation
                .to(firstSvg,0.5,{x:"215px",y:"-120"})
                .to(secondSvg,0.5,{y:"-250"})
                .to(thirdSvg,0.5,{x:"-215px",y:"-120"})
                .to(fourthSvg,0.5,{x:"-215px",y:"120"})
                .to(fifthSvg,0.5,{y:"250"})
                .to(sixthSvg,0.5,{x:"215px",y:"120"})
            }else{
                let wheelSvgAnimation = new TimelineMax();
                wheelSvgAnimation
                .to(firstSvg,0.5,{x:"220px",y:"-120"})
                .to(secondSvg,0.5,{y:"-250"})
                .to(thirdSvg,0.5,{x:"-220px",y:"-120"})
                .to(fourthSvg,0.5,{x:"-220px",y:"120"})
                .to(fifthSvg,0.5,{y:"250"})
                .to(sixthSvg,0.5,{x:"220px",y:"120"})
            }

        }

        // about third observer
        let aboutThirdHeight = $(".about--third").height();
        let aboutThirdOffsetTop = $(".about--third").offset().top;
        let scroll3 = aboutThirdHeight + aboutThirdOffsetTop;
        if(scroll1 >= scroll3){
            let lines = $(".graph").children();
            let aboutThirdEngine = new TimelineMax();
            aboutThirdEngine
            .staggerTo(lines,0.5,{scaleX : 1,transformOrigin : "left"},0.2)
            .staggerTo(lines,0.3,{className : "+=show-before"},0.1);
        }

        // about first observer
        let aboutFirstHeight = $(".about--first").height();
        let aboutFirstOffset = $(".about--first").offset().top;
        let scroll4 = aboutFirstHeight + aboutFirstOffset;
        if(scroll1 >= scroll4){
            let aboutFirstEngine = new TimelineMax();
            aboutFirstEngine
            .staggerTo(".second__sub-container",0.5,{y : 0},0.3);
        }
    })


    // wheel animation hover effect
    $(".wheel__svg").hover(function(){
        let hoveredSvg = $(this);
        let svgIndex = ($(this).index()-3);
        let shownContainer = $(".shown_container");
        let showContainer = $(".inside__circle__container")[svgIndex];
        let downSize = $(".inside__circle__container:eq(0)");
        TweenLite.to(hoveredSvg,0.5,{scale : 1.8});
        if($(showContainer).hasClass("shown_container")){
            return;
        }else{
            let textToggle = new TimelineMax();
            textToggle
            .to(".wheel__svg",0,{className : "+=cannotclick"})
            .to(shownContainer,0.5,{opacity : 0})
            .to(showContainer,0.5,{opacity : 1})
            $(shownContainer).removeClass("shown_container");
            $(showContainer).addClass("shown_container");
        }
    },function(){
        let hoveredSvg = $(this);
        let textToggle2 = new TimelineMax();
        textToggle2
        .to(hoveredSvg,0.5,{scale : 1})
        .to(".wheel__svg",0.1,{className : "-=cannotclick"})
    })


    // navigation smooth scrolling
    var navLinks = $(".nav__link");
    $(navLinks).click(function(ev){
        ev.preventDefault();
        $("body,html").animate({
            scrollTop: ($(this.hash).offset().top)-50
          }, 1000);
    });

    // gallery navigation animation
    $(".work--first__item").click(function(){
        $(this).siblings().removeClass("extend");
        $(this).addClass("extend");
    })

    // buttons hover
    $(".btn").hover(function(){
        let thisButton = $(this);
        TweenLite.to(thisButton,0.2,{boxShadow : "0px 0px 0px 1px #DB9F00",backgroundColor : "#393939"});
    },function(){
        let thisButton = $(this);
        TweenLite.to(thisButton,0.2,{boxShadow : "0px 0px 0px 0px #DB9F00",backgroundColor : "transparent"});
    })

})