let horizontalScrollContainer = document.querySelector(".horizontal_scroll");
function Swipe(){

    this.swipeLeft = function(){
        horizontalScrollContainer.scrollLeft -= 300;
    }
    this.swipeRight = function(){
        horizontalScrollContainer.scrollLeft += 300;
    }
};

let btnLeft = document.querySelector(".btn-left");
let btnRight = document.querySelector(".btn-right");
let swipe = new Swipe();
let scrollableWidth = horizontalScrollContainer.scrollWidth;
let elementWidth = horizontalScrollContainer.clientWidth;
let totalScrollableWidth = (scrollableWidth - elementWidth);

let leftScroll = totalScrollableWidth;
let rightScroll = totalScrollableWidth;

btnLeft.onclick = () =>{
    rightScroll -= 300;
    if(rightScroll < totalScrollableWidth){
        btnLeft.style.display = "none";
    }else{
        btnLeft.style.display = "block";
    }
    swipe.swipeLeft();
    leftScroll += 300;
    if(leftScroll < totalScrollableWidth){
        btnRight.style.display = "none";
    }else{
        btnRight.style.display = "block";
    }
}
btnRight.onclick = () => {
    btnLeft.style.display = "block";
    leftScroll -= 300;
    if(leftScroll < totalScrollableWidth){
        btnRight.style.display = "none";
    }else{
        btnRight.style.display = "block";
    }
    swipe.swipeRight();
    rightScroll += 300;
    if(rightScroll < totalScrollableWidth){
        btnLeft.style.display = "none";
    }else{
        btnLeft.style.display = "block";
    }
}
