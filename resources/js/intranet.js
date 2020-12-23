var arrayPages = [
	{ Menu: 'Home.aspx', Pagina: 'RNuestraCultura', PageName: 'Repositorio - Nuestra Cultura', },
	// ÉTICA Y CUMPLIMIENTO
	{ Menu: 'EticaCumplimiento.aspx', Pagina: 'EticaCumplimiento', PageName: '&Eacutetica y Cumplimiento', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'REticaCumplimiento', PageName: 'Repositorio - Ética y Cumplimiento', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'PoliticasCorporativas', PageName: 'Pol&iacuteticas Corporativas', },
	/**//**/{Menu: 'EticaCumplimiento.aspx', Pagina: 'Corporativa', PageName: 'Corporativas', },
	/**//**//**/{Menu: 'EticaCumplimiento.aspx', Pagina: 'Corporativas', PageName: 'Corporativas', },
	/**//**/{Menu: 'EticaCumplimiento.aspx', Pagina: 'UnidadNegocio', PageName: 'Unidades de Negocio', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'LineaEtica', PageName: 'L&iacutenea &Eacutetica', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'CodigoConducta', PageName: 'C&oacutedigo de Conducta', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'ProgramaCumplimiento', PageName: 'Programa de Cumplimiento', },
	/**/{ Menu: 'EticaCumplimiento.aspx', Pagina: 'ProgramaCapacitacion', PageName: 'Programa de Capacitaci&oacuten', },
	/**//**/{Menu: 'EticaCumplimiento.aspx', Pagina: 'CalendarioCapacitaciones', PageName: 'Calendario de Capacitaciones', },
	/**//**/{Menu: 'EticaCumplimiento.aspx', Pagina: 'RTemarioMaterial', PageName: 'Repositorio - Temario y Material', },
]
var href = location.href.toLowerCase();
//var page = (location.href.split('/intranet/')[1]).split('.')[0];
var page = '';
if(href.split('/intranet/').length > 1) {
	page = (href.split('/intranet/')[1]).split('.')[0];
} else {
	page = (href.split('/sitepages/')[1]).split('.')[0];
}
var menu_actual = '';
var pageTitle = '';
var indice = '';
for(var i = 0; i < arrayPages.length; i++) {
	if((arrayPages[i].Pagina.toLowerCase()) == page) {
		menu_actual = 'https://inkiaenergy.sharepoint.com/SitePages/Intranet/' + arrayPages[i].Menu;
		pageTitle = arrayPages[i].PageName;
		indice = arrayPages[i].Indice;
	}
}
function MasterIntranet() {
    $('title').html(pageTitle);
    //$('.indice').html(indice);
    $('.indice > span > a:first-child').html('Inicio')
    var _email = _spPageContextInfo.userEmail;
    //_email = "Giuliana.Vercelli@inkiaenergy.com";
    $('#user-email-web').html(_email);
    $('#img-user-photo').removeAttr('src');
    $('#img-user-photo').attr('src', '/_layouts/15/userphoto.aspx?size=m&accountname=' + _email);
    $('.contenedor-menu > .container .navbar-nav').html('');
    $.ajax({
	    url: "https://inkiaenergy.sharepoint.com/_api/web/SiteUserInfoList/items?$select=Title,EMail,JobTitle,Department&$filter=EMail%20eq%20%27" + _email + "%27",
	    method: "GET",
	    headers: {
	        "accept": "application/json;odata=verbose",
	        "content-type": "application/json;odata=verbose",
	        "X-RequestDigest": $("#__REQUESTDIGEST").val()
	    },
	    success: function(data) {
	        var user = data.d.results;
	        var cerrarSesion = '<a id="meControlSignoutLink" href="javascript:SuiteOnClick(&quot;STSNavigate2\u0028event,\u0027\u002f_layouts\u002f15\u002fSignOut.aspx\u0027\u0029;&quot;)" aria-label="Cerrar sesión y volver a la página de inicio de sesión" class="o365sx-neutral-accent-link" style="color: #FFF">Cerrar sesi&oacuten</a>';
	        if(user.length > 0) {
	        	//$('#user-information').html(user[0].Title + '<br/>' + (user[0].JobTitle == null ? '' : user[0].JobTitle));
	        	$('#user-information').html(user[0].Title + '<br/>' + cerrarSesion);
	        } else {
	        	$('#user-email-web').html('adm.sharepoint@inkiaenergy.com');
	        	$('#user-information').html('Admin SharePoint<br/>' + cerrarSesion);
	        }
	        $('#user-email-web').html('<a href="https://www.office.com" style="color: #FFF; text-decoration: none;" target="_blank">Correo web</a>');
	    },
	    error: function(error) {
	        console.log(error.responseJSON.error.message.value, error);
	    }
	});
	obtenerGruposUsuarioActual(
	    function(res) {
	    	console.log(res);
	    	var grupos = res.d.Groups.results;
	    	var _isGroup = false;
	    	var _isOwner = false;
		  	grupos.forEach(
		  		function(val,idx, arr){
			  		var group = val.LoginName;
			  		//console.log(group);
			  		if(group.indexOf("Intranet Visitantes") > -1 || group.indexOf("Intranet Integrantes") > -1) {
			  			_isGroup = true;
			        }
			        if(group.indexOf("Intranet Propietarios") > -1){
			        	_isGroup = true;
			        	_isOwner = true;
			        }
		   		}
		   	);
		   	_isGroup = true;
		   	$.ajax({
				url: "https://inkiaenergy.sharepoint.com/_api/web/lists/getByTitle('LST_MENU_PRINCIPAL')/items?$orderby=Orden asc&$select=Title,Url",
				method: "GET",
				headers: {
					"accept": "application/json;odata=verbose",
					"content-type": "application/json;odata=verbose",
					"X-RequestDigest": $("#__REQUESTDIGEST").val()
				},
				success: function(data) {
					var menu = data.d.results;
					$('.contenedor-menu >  .container .navbar-nav').html('');
					for(var i = 0; i < menu.length; i++) {
				    	$('.contenedor-menu >  .container .navbar-nav').append(
				    		'<li class="nav-item"><a class="nav-link' + (menu_actual == menu[i].Url ? ' active' : '') + '" href="' + menu[i].Url + '">' + menu[i].Title + '</a></li>'
				    	);
				    }
				    
				    // MOSTRAR INDICE
					getData(
						"LST_INDICE",
						"<Query>" +
							"<Where>" +
								"<Eq>" +
									"<FieldRef Name='Title' />" +
									"<Value Type='Text'>" + decodeURI(page) + "</Value>" +
								"</Eq>" +
							"</Where>" +
						"</Query>",
						"<ViewAttributes Scope='Recursive' />",
						"<FieldRef Name='Title' />" +
						"<FieldRef Name='Nombre' />" +
						"<FieldRef Name='Descripcion' />" +
						"<FieldRef Name='Seccion' />" +
						"<FieldRef Name='Nivel1' />" +
						"<FieldRef Name='Nivel2' />" +
						"<FieldRef Name='Nivel3' />" +
						"<FieldRef Name='Nivel4' />" +
						"<FieldRef Name='Nivel5' />",
						"",
						"https://inkiaenergy.sharepoint.com",
						function(data){
							$("#indice").html();
							$(data.responseXML).find("z\\:row").each(function() {
								var title = $(this).attr("ows_Title");
								var nombre = $(this).attr("ows_Nombre");
								var descripcion = $(this).attr("ows_Descripcion");
								var seccion = $(this).attr("ows_Seccion");
								var nivel1 = $(this).attr("ows_Nivel1");
								var nivel2 = $(this).attr("ows_Nivel2");
								var nivel3 = $(this).attr("ows_Nivel3");
								var nivel4 = $(this).attr("ows_Nivel4");
								var nivel5 = $(this).attr("ows_Nivel5");
								$('title').html(nombre);
								$('#titulo-administrable').html(nombre);
								if(descripcion != undefined) {
									$('#descripcion-administrable').html(descripcion);
								}
								$('.contenedor-menu >  .container .navbar-nav li a').each(function() {
									if($(this).html() == seccion) {
										$(this).addClass('active');
									}
								});
						    	$(".indice").html(
						    		'<span>' +
							    		(nivel1 != undefined ? '<a href="' + nivel1.split(', ')[0] + '">' + nivel1.split(', ')[1] + '</a>' : '') +
							    		(nivel2 != undefined ? ' / <a href="' + nivel2.split(', ')[0] + '">' + nivel2.split(', ')[1] + '</a>' : '') +
							    		(nivel3 != undefined ? ' / <a href="' + nivel3.split(', ')[0] + '">' + nivel3.split(', ')[1] + '</a>' : '') +
							    		(nivel4 != undefined ? ' / <a href="' + nivel4.split(', ')[0] + '">' + nivel4.split(', ')[1] + '</a>' : '') +
							    		(nivel5 != undefined ? ' / <a href="' + nivel5.split(', ')[0] + '">' + nivel5.split(', ')[1] + '</a>' : '') +
						    		'</span>'
						    	);
						    });
						}
					);
				    
				    if(!_isGroup) {
				    	if(page.toLowerCase() != 'accesodenegado') {
							location.href = "AccesoDenegado.aspx";
						}
				    }
				    if(_isOwner){
				    	$('.contenedor-menu >  .container .navbar-nav').append(
				    		'<li class="nav-item"><a class="nav-link' + (menu_actual == 'Administrar.aspx' ? ' active' : '') + '" href="Administrar.aspx">Administraci&oacuten</a></li>'
				    	);
        			}
				    $('#container-loading').fadeOut(1000);
				},
				error: function(error) {
					console.log(error.responseJSON.error.message.value, error);
				}
			});
		},function(fail){
		}
	);
	/*
	document.__defineGetter__("cookie", function() { return '';} );
	document.__defineSetter__("cookie", function() {} );
	*/
}

var arrayBBL = [];
var folder = '';
function MostrarArchivos(_path, _object) {
	var arrayPath = _path.split('/');
	$('#accordionBiblioteca h5 > span').html('');
	var _url = '';
	for(var i = 0; i < arrayPath.length; i++) {
		if(i == 0) {
			_url += arrayPath[i];
		} else {
			_url += ('/' + arrayPath[i]);
		}
		$('#accordionBiblioteca h5 > span').append('<a onclick="MostrarArchivos(\'' + _url + '\', null)">' + arrayPath[i] + '</a> / ');
	}
	$('table > tbody').html('');
	if(folder == "null") {
    	folder = '';
    }
    var _folder = _path;
    if(_object != null) {
	    var _pais = _folder;
	    _pais = _pais.split('/').pop();
		if(_pais != ';#') {
			$('.filtro > div > a').removeClass('active');
			$(_object).addClass('active');
		}
	}
	for(var _i = 0; _i < arrayBBL.length; _i++) {
		var v = arrayBBL[_i];
        var _fileRef = v.FileRef.split(';#')[1];
        var _location = _fileRef.split('/');
        var _isFolder = false;
        var _folderLocation = _folder.split('/');
        for(var i = 0; i < _folderLocation.length; i++) {
        	if(_folderLocation[i] == _location[i + 1]) {
        		_isFolder = true;
        	} else {
        		_isFolder = false;
        		break;
        	}
        }
        if(_location.length == (_folderLocation.length + 2) && _isFolder) {
        	var icono = '';
        	var document = _location.pop();
        	var _documento = document.split('.')[0];
        	var _download = '<a href="/' + _fileRef + '" download><i class="fa fa-download text-danger"></i></a>';
        	var _list = _fileRef.split('/')[0];
        	switch(document.split('.')[1]) {
        		case undefined:
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/folder.svg?refresh1';
        			_documento = '<a onclick="MostrarArchivos(\'' + _path + '/' + document.split('.')[0] + '\')">' + document.split('.')[0] + '</a>';
        			_download = '';
        			break;
        		case 'doc':
        		case 'docx':
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/docx.svg?refresh1';
        			_documento = '<a onclick="VerArchivo(\'' + _list + '\',' + v.Id + ')">' + _documento + '</a>';
        			break;
        		case 'xlsx':
        		case 'xls':
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/xlsx.svg?refresh1';
        			_documento = '<a onclick="VerArchivo(\'' + _list + '\',' + v.Id + ')">' + _documento + '</a>';
        			break;
        		case 'ppt':
        		case 'pptx':
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/pptx.svg?refresh1';
        			_documento = '<a onclick="VerArchivo(\'' + _list + '\',' + v.Id + ')">' + _documento + '</a>';
        			break;
        		case 'pdf':
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/pdf.svg?refresh1';
        			//_documento = '<a onclick="VerArchivo(\'' + _list + '\',' + v.Id + ')">' + _documento + '</a>';
        			_documento = '<a data-lity href="https://inkiaenergy.sharepoint.com/' + _fileRef + '">' + _documento + '</a>';
        			break;
        		case 'png':
        		case 'jpg':
        		case 'svg':
        			icono = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/20/photo.svg?refresh1';
        			_documento = '<a data-lity href="https://inkiaenergy.sharepoint.com/' + _fileRef + '">' + _documento + '</a>';
        			break;
        	}
        	$('table > tbody').append(
        		'<tr>' +
        			'<td class="text-left"><img src="' + icono + '" />' + _documento + '</td>' +
        			'<td class="text-center">' + _download + '</td>' +
        			'<td class="text-right">' + new Date(v.Creado.split(';#')[1].split(' ')[0]).format('dd/MM/yyyy') + '</td>' +
        		'<tr>'
        	);
        }
	}
}

function VerArchivo(list, id) {
	$.ajax({
		url: "https://inkiaenergy.sharepoint.com/_api/web/lists/getByTitle('" + list + "')/items?$select=ServerRedirectedEmbedUri&$filter=ID eq " + id,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function(data) {
			var _data = data.d.results;
			if(_data.length > 0) {
				console.log();
				var lightbox = lity(data.d.results[0].ServerRedirectedEmbedUri);
			}
		},
		error: function(error) {
			console.log(error.responseJSON.error.message.value);
		}
	});
}
function ModalVerArchivo(url) {
	
}
function MostrarRecursos(_seccion, _OnlyVisible) {
	var _filter = "";
	if(_OnlyVisible) {
		_filter =
			"<And>" +
				"<Eq>" +
					"<FieldRef Name='Seccion' />" +
					"<Value Type='Text'>" + _seccion + "</Value>" +
				"</Eq>" +
				"<Eq>" +
					"<FieldRef Name='Visible' />" +
					"<Value Type='Text'>" + 'Si' + "</Value>" +
				"</Eq>" +
			"</And>";
	} else {
		_filter =
			"<Eq>" +
				"<FieldRef Name='Seccion' />" +
				"<Value Type='Text'>" + _seccion + "</Value>" +
			"</Eq>";
	}
	getData(
		"LST_RECURSOS",
		"<Query>" +
			"<Where>" +
				_filter +
			"</Where>" +
			"<OrderBy>" +
				"<FieldRef Name='Orden' Ascending='TRUE'/>" +
			"</OrderBy>" +
		"</Query>",
		"<ViewAttributes Scope='Recursive' />",
		"<FieldRef Name='Seccion' />" +
		"<FieldRef Name='Title' />" +
		"<FieldRef Name='Tipo' />" +
		"<FieldRef Name='Url' />" +
		"<FieldRef Name='VistaPrevia' />",
		"",
		"https://inkiaenergy.sharepoint.com",
		function(data){
			$("#recursos").html('');
			$(data.responseXML).find("z\\:row").each(function() {
				var seccion = $(this).attr("ows_Seccion");
				var nombre = $(this).attr("ows_Title");
				var tipo = $(this).attr("ows_Tipo");
				var url = $(this).attr("ows_Url");
				var vistaPrevia = $(this).attr("ows_VistaPrevia");
				if(tipo == 'Imagen') {
					$("#recursos").append(
			    		'<div class="col-12 col-md-4 mb-4">' +
			    			'<a data-lity href="' + url + '">' +
			    				'<img src="' + url + '" style="width: 100%;" />' +
			    				'<div class="text-center" style="color: #662D8C; font-family: \'Lato SemiBold\'; font-size: 18px; padding: 10px 0;">' + nombre + '</div>' +
			    			'</a>' +
			    		'</div>'
			    	);
		    	} else {
		    		$("#recursos").append(
			    		'<div class="col-12 col-md-4 mb-4">' +
			    			'<a href="' + url + '" target="_blank">' +
			    				($(window).width() > 1000 ?
			    				'<iframe width="640" height="360"  src="' + url + '?autoplay=false&showinfo=true&fullscreen=true" allowfullscreen style="width: 100%"></iframe>' :
			    				'<img src="' + vistaPrevia + '" style="width: 100%;" />') +
			    				'<div class="text-center" style="color: #662D8C; font-family: \'Lato SemiBold\'; font-size: 18px; padding: 10px 0;">' + nombre + '</div>' +
			    			'</a>' +
			    		'</div>'
			    	);
		    	}
		    });
		    $('iframe').each(function() {
				$(this).height($(this).width() * 0.57);
			});
		}
	);
}