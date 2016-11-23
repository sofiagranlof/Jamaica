
function allowDrop(ev) {
    ev.preventDefault(); 
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); 
}

function dropped(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

}

function addCakes() {
	var	page = document.getElementById('cakes'),
		fig, img, cap, caption,
		imgArr = [
			'almond_fudge_avocado_cake.jpg',						'carrot_cake.jpg',
			'chocolate_brownie.jpg',
			'cranberry_coffee_pie.jpg',
			'gluten-free_vanilla_cake.jpg',
			'lemon_blueberry_cupcakes.jpg',
			'raspberry_pie.jpg',
			'red_cake.jpg',
			'rosemary_semolina_cake.jpg'
		];

        imgArr.forEach(function(fileName) {								
            caption = capitalise(fileName.split('.')[0]);
			fig = document.createElement('figure');
			img = document.createElement('img');
			cap = document.createElement('figcaption');
		
			img.setAttribute('src', 'img/cakes/' + fileName);
			img.setAttribute('alt', caption);
			img.setAttribute('title', caption);
		    cap.appendChild(document.createTextNode(caption))
			fig.appendChild(img);
            fig.appendChild(cap);
            page.appendChild(fig);
        });
}
function capitalise(txt) {
		var arr = txt.split('_'),
			capTxt = '';

		arr.forEach(function(word, index) {
			capTxt += word[0].toUpperCase() + word.slice(1);
			if (index < arr.length - 1) {
				capTxt += ' ';
			}
		});
		return capTxt;
}
function docLoaded(fn) {
		if (document.readyState !== 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
}
function cakePageLoaded(){
	addCakes();
}
function rotateBanner() {
		var	banner = document.getElementById('banner'),
			style = window.getComputedStyle(banner, null),
			path = style.backgroundImage.split('.')[0],
			imgNr;
	
		imgNr = parseInt(path[path.length-1]);
		imgNr = (imgNr === 5) ? 1 : imgNr + 1;
	
		banner.style.backgroundImage = 'url("img/banners/'+imgNr+'.jpg")';
}
function indexPageLoaded(){
    window.setInterval(rotateBanner, 3000);
}

$(document).ready(function() {

	
	$('.panel-button').on('click', function () {
        //$('#myDiv').toggle();
        var panelId = $(this).attr('data-panelid');
        $('#' + panelId).toggle();
    });
});

