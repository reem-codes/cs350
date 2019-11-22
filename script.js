window.onload = function() {
  moveDivisor();
  imagePickerFiller();
};

var divisor = document.getElementById("divisor");
var before = document.getElementById("before");
var slider = document.getElementById("slider");
var imgs = ["images/edit1_2.png", 
"images/edit2_1.png",
"images/edit3_2.png",
"images/edit4.png",
"images/edit5.png",
"images/edit6.png"];

/** BEFORE AND AFTER */
function moveDivisor() {
	divisor.style.width = slider.value+"%";
}

/** GALLERY picker */
function imagePickerFiller() {

  var imgsContainer = document.getElementById("gallery-picker");
  for(var i = 0; i < imgs.length; i++) {
    var div = document.createElement("div");                 
    var divAtt = document.createAttribute("class");
    divAtt.value = "gallery-img" + ((i == 0)? " border" : "");
    div.setAttributeNode(divAtt);
    
    var img = document.createElement("img");                 
    var imgAtt = document.createAttribute("src");
    imgAtt.value = "images/" + (i+1) + ".jpg";
    img.setAttributeNode(imgAtt);

    div.appendChild(img); 
    div.onclick = function() {
      before.style.backgroundImage =  "url('images/" + (i+1) + ".jpg')";
      divisor.style.backgroundImage =  "url('"+ imgs[i+1] + "')";

    }
    imgsContainer.appendChild(div); 
  }
}


$(document).ready(function(){
  $(".gallery-img").click(function() {
    let i = $(this).index();
    $("#before").css("background-image", "url('images/" + (i+1) + ".jpg')");
    $("#divisor").css("background-image", "url('"+ imgs[i] + "')");
    $(".gallery-img").removeClass("border");
    $(this).addClass("border");
  });
  $(".anim-buttons").hover(function(){
    $(this).animate({
      left: '250px',
      opacity: '0.5',
      width: '150px'
    });
  });


  /** CONFETTI  */
  for (var i = 0; i < 250; i++) {
    create(i);
  }
  
  function create(i) {
    var width = Math.random() * 8;
    var height = width * 0.4;
    var colourIdx = Math.ceil(Math.random() * 3);
    var colour = "red";
    switch(colourIdx) {
      case 1:
        colour = "yellow";
        break;
      case 2:
        colour = "blue";
        break;
      default:
        colour = "red";
    }
    $('<div class="confetti-'+i+' '+colour+'"></div>').css({
      "width" : width+"px",
      "height" : height+"px",
      "top" : -Math.random()*20+"%",
      "left" : Math.random()*100+"%",
      "opacity" : Math.random()+0.5,
      "transform" : "rotate("+Math.random()*360+"deg)"
    }).appendTo('.credit');  
    
    drop(i);
  }
  
  function drop(x) {
    $('.confetti-'+x).animate({
      top: "100%",
      left: "+="+Math.random()*15+"%"
    }, Math.random()*3000 + 3000, function() {
      reset(x);
    });
  }
  
  function reset(x) {
    $('.confetti-'+x).animate({
      "top" : -Math.random()*20+"%",
      "left" : "-="+Math.random()*15+"%"
    }, 0, function() {
      drop(x);             
    });
  }
}); 
