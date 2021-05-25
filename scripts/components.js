// function for dropdown on mobile screen
// Uses querySelectorAll in case we need to add more dropdowns
const readmorebtns = document.querySelectorAll(".dropdown-readmore");


if(window.innerWidth <= 750){
    let readmoreCount = 1;
    readmorebtns.forEach(btn => {
        let extra = document.querySelector(`#readmore-${readmoreCount}`);
        showExtra(btn, extra, false);
        readmoreCount++;
    })
}

function showExtra(btn, elements, isOpen){
    const height = elements.offsetHeight + 20;
    elements.style.height = "0px";
    elements.style.overflow = "hidden";
    btn.addEventListener('click', () => {
        if(elements.style.height == "0px"){
            btn.style.flexDirection = "column-reverse";
            btn.querySelector("h6").innerText = "Se mindre";
            btn.querySelector("i").classList.remove("down");
            btn.querySelector("i").classList.add("up");
            let count = 0;
            opendropdown = setInterval(function() {
                if(count < height){
                    count += 10;
                    elements.style.height = count + "px";
                }else{
                    clearInterval(opendropdown);
                }
            }, 1);
        }else{
          btn.style.flexDirection = "column";
          btn.querySelector("h6").innerText = "Se flere";
          btn.querySelector("i").classList.remove("up");
          btn.querySelector("i").classList.add("down");
          let count = height;
          closedropdown = setInterval( function() {
            if(count > 0){
              count -= 10;
              elements.style.height = count + "px"
            } else {
              elements.style.height = "0px"
              clearInterval(closedropdown);
            }
          }, 1)
        }
    })
}