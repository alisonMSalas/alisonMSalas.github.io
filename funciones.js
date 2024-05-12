
const sr= ScrollReveal({
distance: '40px',
duration: 2500,
reset:true
});
sr.reveal('.logo',{delay:200, origin:'left'})
sr.reveal('#nav', { delay: 200, origin: 'top' });
sr.reveal('.redes a', { delay: 200, origin: 'bottom', interval: 100 });
sr.reveal('.inicio .fila .col .contenedor-img', { delay: 200, origin: 'bottom', interval: 100 });

var typingEffect = new Typed(".typedText", {
    strings: ["Alison Salas", "Estudiante", "Ingeniera"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
});

jQuery(document).ready(function($) {
    function animateElements() {
            $('.pr-chart-ctrl').each(function() {
                var elementPos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                var animate = $(this).data('animate');
                if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                    $(this).data('animate', true);
                    $(this).find('.pr-chart').easyPieChart({
                        size: 200,
                        barColor: '#FFFFFF',
                        trackColor: 'rgba(0,0,0,.1)',
                        scaleColor: 'rgba(0,0,0,.5)',
                        scaleLength: 10,
                        lineWidth: 10,
                        lineCap: 'square',
                        onStep: function(from, to, percent) {
                            $(this.el).find('i').text(Math.round(percent) + '%');
                        }
                    }).stop();
                }
            });
        }
    animateElements();
    $(window).scroll(animateElements);
});
function responsiveMenu(){
    let x = document.getElementById("nav");
    if(x.className===""){
        x.className = "responsive";

        //creamos el elemento que cierra el menu
        let span = document.createElement("span");
        span.innerHTML = "X";
        document.getElementById("nav").appendChild(span);

        //quitamos el boton eliminar cuando se hace click sobre este
        span.onclick = function(){
            x.className = "";
            span.remove();
        }
    }else{
        x.className="";
    }
}
function verCategoria(cat){
    const items = document.getElementsByClassName("item");
    for(let i=0; i < items.length;i++){
        items[i].style.display = "none";
    }

    const itemCat = document.getElementsByClassName(cat);
    for(let i = 0; i<itemCat.length;i++){
        itemCat[i].style.display = "block";
    }

    const links = document.querySelectorAll(".trabajos nav a");
    links[0].className = "";
    links[1].className = "";
    links[2].className = "";
    links[3].className = "";

    const itemSeleccionado = document.getElementById(cat);
    itemSeleccionado.className = "borde";
}

