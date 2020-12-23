var _spPageContextInfo = [];
_spPageContextInfo.siteAbsoluteUrl = '';
/****************************************************************
				MASTER PAGE
****************************************************************/
function _ConstruirMenu(_items) {
	$('.contenedor-menu >  .container .navbar-nav').html('');
	for(var i = 0; i < _items.length; i++) {
    	$('.contenedor-menu >  .container .navbar-nav').append(
    		'<li class="nav-item"><a class="nav-link' + (menu_actual == _items[i].Url ? ' active' : '') + '" href="' + _items[i].Url + '">' + _items[i].Title + '</a></li>'
    	);
    }
}
/****************************************************************
				HOME
****************************************************************/
function _ConstruirBanner(_items) {
	$(".seccion-banner").html('');
	for(var i = 0; i < _items.length; i++) {
		$(".seccion-banner").append(
    		'<a href=" ' + _items[i].Url + '" target="' + (_items[i].Target == 'Si' ? '_balnk': '') + '">' +
	    		'<div style="background-image: url(' + _items[i].ServerRelativeUrl + '); height: ' + $('.seccion-banner').width() * 0.5 + 'px">' +
					'<div style="background-color: ' + _items[i].DescriptionBackgroundColor + '; color: ' + _items[i].DescriptionColor + '">' + _items[i].Description + '</div>' +
				'</div>' +
			'</a>'
    	);
    }
	$('.seccion-banner').slick({
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		centerMode:true,
		dots: true,
		focusOnSelect: true,
		infinite: true,
		//rtl: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
}
function _ConstruirAccesoDirecto(_items) {
	$(".seccion-accesos-directos").html('');
	for(var i = 0; i < _items.length; i++) {
		var acceso_directo_height = $('.seccion-banner').width() * 0.5 / 3;
		$(".seccion-accesos-directos").append(
			'<div style="height: ' + acceso_directo_height + 'px">' +
	    		'<div style="background-image: url(\'' + _items[i].BackgroundImage + '\')">' +
	    			'<div class="row m-0" style="background-color: ' + _items[i].BackgroundColor + '">' +
	    				'<div class="col-3 text-center">' +
	    					'<img class="mr-4" src="' + _items[i].Icono.Url + '" />' +
	    				'</div>' +
	    				'<div class="col-9">' +
	    					'<a href="' + _items[i].Url + '" target="_blank">' + _items[i].Title + '<a>' +
	    				'</div>' +
	    			'</div>' +
	    		'</div>' +
			'</div>'
		);
	}
	$('.seccion-accesos-directos').slick({
		arrows: true,
		autoplay: true,
		autoplaySpeed: 10000,
		centerMode:true,
		//dots: true,
		focusOnSelect: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
	});
	$('.seccion-accesos-directos').height($('.seccion-banner').width() * 0.5);
}
function _ConstruirComunicacionFastFacts(_items) {
	$(".seccion-comunicaciones > .content > #accordionFastFacts > .card > .collapse .card-body").html('');
	for(var i = 0; i < _items.length; i++) {
    	$(".seccion-comunicaciones > .content > #accordionFastFacts > .card > .collapse .card-body").append(
			'<div>' +
				'<img class="mr-2" src="img/paises/' + _items[i].Title + '.png" />' + 
				'<a href="' + _spPageContextInfo.siteAbsoluteUrl + _items[i].ServerRelativeUrl + '" target="_blank">' + _items[i].ServerRelativeUrl.split('/')[2].split('.')[0] + '</a>' +
			'</div>'
    	);
    }
}
function _ConstruirComunicacionIdentidadVisual(_items) {
	$(".seccion-comunicaciones > .content > #accordionIdentidadVisual > .card > .collapse .card-body").html('');
	for(var i = 0; i < _items.length; i++) {
		if(_items[i].FileSystemObjectType == 1) {
			if(_items[i].ServerRelativeUrl.split('/').length == 3) {
				$(".seccion-comunicaciones > .content > #accordionIdentidadVisual > .card > .collapse .card-body").append(
					'<div>' +
						'<i class="mr-3 fa fa-folder" style="color: #E4BA20; font-size: 20px;"></i>' + 
						'<a href="IdentidadVisual.aspx?Folder=' + _items[i].ServerRelativeUrl.split('/')[2] + '">' +
							_items[i].ServerRelativeUrl.split('/')[2] +
						'</a>' +
					'</div>'
				);
			}
		}
	}
}
function _ConstruirDirectorio(_items) {
	$(".seccion-directorio > .content").html('');
	for(var i = 0; i < _items.length; i++) {
		$(".seccion-directorio > .content").html(
			'<div class="align-items-center d-flex flex-nowrap justify-content-center m-0 p-2 row">' +
    			'<img class="mr-4" src="' + _items[i].Icono.Url + '" style="width: 15%;" />' +
				'<div><a href="' + _items[i].Url + '" target="_blank">' + _items[i].Title + '</a></div>' +
			'</div>'
    	);
    };
}
function _ConstruirCalendario(_items) {
	$(".seccion-calendario > .content").html('');
    for(var i = 0; i < _items.length; i++) {
		var mesNumero = parseInt(_items[i].Mes.split('.')[0]);
		var diaNumero = parseInt(_items[i].Title);
		var mesNumeroActual = parseInt(moment().format('MM'));
		var diaNumeroActual = parseInt(moment().format('dd'));
		var PaisText = '';
		if(_items[i].Paises.results.length == 1) {
			PaisText = ' - ' + _items[i].Paises.results[0].Title;
		}
		if((mesNumero == mesNumeroActual && diaNumero >= diaNumeroActual) || mesNumero == (mesNumeroActual + 1)) {
			$(".seccion-calendario > .content").append(
	    		'<div class="row m-0 p-2">' +
		    		'<div class="col-3 text-center">' +
		    			'<div>' +
			    			'<div>' + _items[i].Title + '</div>' +
			    			'<div>' + (_items[i].Mes.split('.')[1]).substr(0, 3) + '</div>' +
		    			'</div>' +
		    		'</div>' +
		    		'<div class="col-9">' +
		    			'<div>' +
		    				_items[i].Description +
		    				PaisText +
		    			'</div>' +
		    		'</div>' +
	    		'</div>'
	    	);
    	}
    };
}
function _ConstruirFooter(_items) {
	$('.seccion-footer > .content').html('');
	for(var i = 0; i < _items.length; i++) {
		$('.seccion-footer > .content').append(
			'<div class="pb-2 pt-2">' +
				'<a href="AplicacionesDeNegocio.aspx?pais=' + _items[i].Title + '" target="_blank">' +
					'<img title="' + _items[i].Title + '" src="img/paises/' + _items[i].Title + '.png" />' +
				'</a>' +
			'</div>'
		);
    };
}