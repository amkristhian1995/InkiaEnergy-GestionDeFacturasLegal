var array_garantias = [
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"No", EnContra:"Si", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
];
var array_seguros = [
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"No", EnContra:"Si", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
];
var array_penalidades = [
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"No", EnContra:"Si", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
	{ Tipo:"Data", AFavor:"Si", EnContra:"No", Desde:"00/00/0000", Hasta:"00/00/0000", NotificarA:"Data", DiasAnticipacion:"15" },
];
var array_partes_intervinientes = [
	{ ParteInterviniente:"Data", Representante:"Data" },
	{ ParteInterviniente:"Data", Representante:"Data" },
	{ ParteInterviniente:"Data", Representante:"Data" },
];
var array_contratantes = [
	{ ParteInterviniente:"Data", Representante:"Data" },
	{ ParteInterviniente:"Data", Representante:"Data" },
	{ ParteInterviniente:"Data", Representante:"Data" },
];
$(function(){
	// GENERAL - LISTAS DESPLEGABLES
	CargarTipoContrato();
	CargarContratante();
	CargarTipoContratante();
	CargarResponsable();
	CargarTipoPago();
	CargarMoneda();
	// CRONOGRAMA DE PAGO
	ControlarCronogramaPago(false,false,false);
	// Otros
	CargarTablaGarantia();
	CargarTablaSeguro();
	CargarTablaPenalidad();
	CargarTablaParteInterviniente();
	CargarTablaContranate();
	$('.date').attr("readonly","readonly");
	$('.date').datetimepicker({
        language:  'es',
        format: 'dd/mm/yyyy',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		showMeridian: true,
    });
})
// LISTAS DESPLEGABLES
function CargarTipoContrato() {
	$("#ddl-tipo-contrato").html('<option value="0">Seleccionar</option>');
	$("#ddl-tipo-contrato").append('<option value="1">Tipo 1</option>');
	$("#ddl-tipo-contrato").append('<option value="2">Tipo 2</option>');
	$("#ddl-tipo-contrato").append('<option value="3">Tipo 3</option>');
}
function CargarContratante() {
	$("#ddl-contratante").html('<option value="0">Seleccionar</option>');
	$("#ddl-contratante").append('<option value="1">Contratante 1</option>');
	$("#ddl-contratante").append('<option value="2">Contratante 2</option>');
	$("#ddl-contratante").append('<option value="3">Contratante 3</option>');
}
function CargarTipoContratante() {
	$("#ddl-tipo-contratante").html('<option value="0">Seleccionar</option>');
	$("#ddl-tipo-contratante").append('<option value="1">Tipo 1</option>');
	$("#ddl-tipo-contratante").append('<option value="2">Tipo 2</option>');
	$("#ddl-tipo-contratante").append('<option value="3">Tipo 3</option>');
}
function CargarResponsable() {
	$("#ddl-responsable").html('<option value="0">Seleccionar</option>');
	$("#ddl-responsable").append('<option value="1">Responsable 1</option>');
	$("#ddl-responsable").append('<option value="2">Responsable 2</option>');
	$("#ddl-responsable").append('<option value="3">Responsable 3</option>');
	$("#ddl-responsable").select2()
}
function CargarTipoPago() {
	$("#ddl-tipo-pago").html('<option value="0">Seleccionar</option>');
	$("#ddl-tipo-pago").append('<option value="1">Mensual</option>');
	$("#ddl-tipo-pago").append('<option value="2">Anual</option>');
	$("#ddl-tipo-pago").append('<option value="3">Hitos</option>');
}
function CargarMoneda() {
	$("#ddl-moneda").html('<option value="0">Seleccionar</option>');
	$("#ddl-moneda").append('<option value="1">Soles</option>');
	$("#ddl-moneda").append('<option value="2">Dolares</option>');
	$("#ddl-moneda").append('<option value="3">Euro</option>');
}
// EVENTOS
$('#cb-involucra-pago').on("change", function() {
	if($(this).is(':checked')) {
		$("#txt-monto-contrato").removeAttr("disabled");
		$("#ddl-tipo-pago").removeAttr("disabled");
		$("#ddl-moneda").removeAttr("disabled");
	} else {
		$("#txt-monto-contrato").val("");
		$("#txt-monto-contrato").attr("disabled","disabled");
		$("#ddl-tipo-pago").val("0");
		$("#ddl-tipo-pago").attr("disabled","disabled");
		$("#ddl-moneda").val("0");
		$("#ddl-moneda").attr("disabled","disabled");
	}
});
$("#ddl-tipo-pago").on("change", function() {
	var TipoPago = $("#ddl-tipo-pago option:selected").text();
	if(TipoPago == "Seleccionar") {
		ControlarCronogramaPago(false,false,false);
	} else if(TipoPago == "Mensual") {
		ControlarCronogramaPago(true,false,false);
	} else if(TipoPago == "Anual") {
		ControlarCronogramaPago(true,true,false);
	} else {
		ControlarCronogramaPago(false,false,true);
	}
});
$('#cb-vigencia-indefinido').on("change", function() {
	console.log($(this).is(':checked'));
	if($(this).is(':checked')) {
		$("#cb-vigencia-renovacion-automatica").prop("checked", false);
	}
});
$('#cb-vigencia-renovacion-automatica').on("change", function() {
	if($(this).is(':checked')) {
		$("#cb-vigencia-indefinido").prop("checked", false);
	}
});
//
function ControlarCronogramaPago(c1,c2,c3) {
	$("#txt-cronograma-pagos-dias").val("");
	$("#txt-cronograma-pagos-mes").val("");
	$("#txt-cronograma-pagos-hitos").val("");
	if(c1)
		$("#txt-cronograma-pagos-dias").removeAttr("disabled");
	else
		$("#txt-cronograma-pagos-dias").attr("disabled","disabled");
	if(c2)
		$("#txt-cronograma-pagos-mes").removeAttr("disabled");
	else
		$("#txt-cronograma-pagos-mes").attr("disabled","disabled");
	if(c3)
		$("#txt-cronograma-pagos-hitos").removeAttr("disabled");
	else
		$("#txt-cronograma-pagos-hitos").attr("disabled","disabled");
}
function GenerarCronograma() {
	var InvolucraPago = $("#cb-involucra-pago").is(':checked');
	if(InvolucraPago) {
		var valido = ValidarCamposCronograma();
		if(valido) {
			var MontoContrato = $("#txt-monto-contrato").val();
			var VigenciaFechaInicio = $("#txt-vigencia-inicio").val();
			var VigenciaFechaFin = $("#txt-vigencia-fin").val();
			var Dias = parseInt($("#txt-cronograma-pagos-dias").val());
			var DiaInicio = parseInt(VigenciaFechaInicio.split("/")[0]);
			var DiaFin = parseInt(VigenciaFechaFin.split("/")[0]);
			var MesInicio = parseInt(VigenciaFechaInicio.split("/")[1]);
			var MesFin = parseInt(VigenciaFechaFin.split("/")[1]);
			var AnioInicio = parseInt(VigenciaFechaInicio.split("/")[2]);
			var AnioFin = parseInt(VigenciaFechaFin.split("/")[2]);
			var TipoPago = $("#ddl-tipo-pago option:selected").text();
			if(TipoPago == "Mensual") {
				var DiferenciaAnio = AnioFin - AnioInicio;
				var DiferenciaMes = MesFin - MesInicio + 1;
				var DiferenciaDia = DiaFin - DiaInicio;
				var CantidadMeses = 12*DiferenciaAnio + DiferenciaMes + (DiferenciaDia>=0?0:-1);
				var c = false;
				var FechaAlerta = "";
				var MesInicioText = "";
				var listaCronogramaPago = [];
				for(var i = 0; i < CantidadMeses; i++) {
					if(MesInicio<10) {
						MesInicioText = "0" + MesInicio;
					} else {
						MesInicioText = MesInicio;
					}
					FechaAlerta = (Dias<10?"0":"")+Dias + "/" + MesInicioText + "/" + AnioInicio;
					if(i==0) {
						if(Dias>DiaInicio) {
							c = true;
						}
					} else {
						if(AnioInicio<AnioFin) {
							c = true;
						} else {
							console.log(MesInicio+'-'+MesFin);
							if(MesInicio<MesFin) {
								c = true;
							} else {
								if(Dias<DiaFin) {
									c = true;
								} else {
									c = false;
								}
							}
						}
					}
					if(c) {
						listaCronogramaPago.push({Tipo: "Mensual", FechaAlerta: FechaAlerta, MesAnio: NombreMes(MesInicio)});
					}
					if(MesInicio < 9){
						MesInicio++;
						MesInicioText = "0" + MesInicio;
					} else if(MesInicio<12) {
						MesInicio++;
						MesInicioText = MesInicio;
					} else {
						MesInicio = 1;
						AnioInicio++;
						MesInicioText = FechaAlerta = "0" + MesInicio;
					}
				}
				CargarTablaCronogramaPago(listaCronogramaPago, MontoContrato);
			} else if(TipoPago == "Anual") {
				console.log("1");
			}
			console.log();
		} else {
			alert("Debe de ingresar los datos requeridos.")
		}
	}
}
function CargarTablaCronogramaPago(l, m) {
	$("#tbl-lista-cronograma-pago tbody").html("");
	l.forEach(function(e,i) {
		$("#tbl-lista-cronograma-pago tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td><input class="form-control" type="text" value="'+(m/l.length)+'"" /></td>'+
				'<td>'+e.Tipo+'</td>'+
				'<td>'+
					'<div class="input-group">'+
                    	'<input type="text" class="form-control date" placeholder"dd/mm/yyyy" value="'+e.FechaAlerta+'">'+
                		'<div class="input-group-prepend calendar-icon">'+
							'<div class="input-group-text">'+
								'<i class="fa fa-calendar"></i>'+
							'</div>'+
						'</div>'+
	                '</div>'+
				'</td>'+
				'<td>'+e.MesAnio+'</td>'+
				'<td>'+
					'<div class="custom-control custom-checkbox">'+
						'<input type="checkbox" class="custom-control-input" id="cb-cronograma-pago-'+(i+1)+'">'+
						'<label class="custom-control-label" for="cb-cronograma-pago-'+(i+1)+'"></label>'+
					'</div>'+
				'</td>'+
				'<td class="text-center">'+
					'<a class="text-primary">Editar</a>'+
				'</td>'+
			'</tr>'
		);
	});
}
function ValidarCamposCronograma() {
	var retorno = true;
	var ctrlFoco = null;
	var TipoPago = $("#ddl-tipo-pago option:selected").text();
	if(TipoPago == "Seleccionar") {
		retorno = false;
	} else if(TipoPago == "Mensual") {
		var Dias = $('input[id$=txt-cronograma-pagos-dias]');
	    if (CampoRequeridoTxt(Dias, 'form-control', 'cajatextoError')) {
	        retorno = false;
	        if (ctrlFoco == null)
	            ctrlFoco = Dias;
	    }
	    var MontoContrato = $("#txt-monto-contrato");
	    if (CampoRequeridoTxt(MontoContrato, 'form-control', 'cajatextoError')) {
	        retorno = false;
	        if (ctrlFoco == null)
	            ctrlFoco = MontoContrato;
	    }
	} else if(TipoPago == "Anual") {
		var Mes = $('input[id$=txt-cronograma-pagos-mes]');
	    if (CampoRequeridoTxt(Mes, 'form-control', 'cajatextoError')) {
	        retorno = false;
	        if (ctrlFoco == null)
	            ctrlFoco = Mes;
	    }
	} else {
		var Hitos = $('input[id$=txt-cronograma-pagos-hitos]');
	    if (CampoRequeridoTxt(Hitos, 'form-control', 'cajatextoError')) {
	        retorno = false;
	        if (ctrlFoco == null)
	            ctrlFoco = Hitos;
	    }
	}
	if (ctrlFoco != null)
        ctrlFoco.focus();
	return retorno;
}
// OTROS
function AgregarGarantia() {
	var valido = ValidarGrantia();
}
function ValidarGrantia() {
	var retorno = true;
	var ctrlFoco = null;
	var GarantiaInicio = $('input[id$=txt-garantia-inicio]');
    if (CampoRequeridoTxt(GarantiaInicio, 'form-control', 'cajatextoError')) {
        retorno = false;
        if (ctrlFoco == null)
            ctrlFoco = GarantiaInicio;
    }
    var GarantiaFin = $('input[id$=txt-garantia-fin]');
    if (CampoRequeridoTxt(GarantiaFin, 'form-control', 'cajatextoError')) {
        retorno = false;
        if (ctrlFoco == null)
            ctrlFoco = GarantiaFin;
    }
    if (ctrlFoco != null)
        ctrlFoco.focus();
    return retorno;
}
function CargarTablaGarantia() {
	$("#tbl-lista-garantia > tbody").html("");
	array_garantias.forEach(function(e,i){
		$("#tbl-lista-garantia > tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td>'+e.Tipo+'</td>'+
				'<td>'+e.AFavor+'</td>'+
				'<td>'+e.EnContra+'</td>'+
				'<td>'+e.Desde+'</td>'+
				'<td>'+e.Hasta+'</td>'+
				'<td>'+e.NotificarA+'</td>'+
				'<td>'+e.DiasAnticipacion+'</td>'+
				'<td><a class="text-danger"><i class="fa fa-trash"></i></a></td>'+
			'</tr>'
		);
	});
}
function CargarTablaSeguro() {
	$("#tbl-lista-seguro > tbody").html("");
	array_garantias.forEach(function(e,i){
		$("#tbl-lista-seguro > tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td>'+e.Tipo+'</td>'+
				'<td>'+e.AFavor+'</td>'+
				'<td>'+e.EnContra+'</td>'+
				'<td>'+e.Desde+'</td>'+
				'<td>'+e.Hasta+'</td>'+
				'<td>'+e.NotificarA+'</td>'+
				'<td>'+e.DiasAnticipacion+'</td>'+
				'<td><a class="text-danger"><i class="fa fa-trash"></i></a></td>'+
			'</tr>'
		);
	});
}
function CargarTablaPenalidad() {
	$("#tbl-lista-penalidad > tbody").html("");
	array_garantias.forEach(function(e,i){
		$("#tbl-lista-penalidad > tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td>'+e.Tipo+'</td>'+
				'<td>'+e.AFavor+'</td>'+
				'<td>'+e.EnContra+'</td>'+
				'<td>'+e.Desde+'</td>'+
				'<td>'+e.Hasta+'</td>'+
				'<td>'+e.NotificarA+'</td>'+
				'<td>'+e.DiasAnticipacion+'</td>'+
				'<td><a class="text-danger"><i class="fa fa-trash"></i></a></td>'+
			'</tr>'
		);
	});
}
function CargarTablaParteInterviniente() {
	$("#tbl-lista-parte-interviniente > tbody").html("");
	array_partes_intervinientes.forEach(function(e,i){
		$("#tbl-lista-parte-interviniente > tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td>'+e.ParteInterviniente+'</td>'+
				'<td>'+e.Representante+'</td>'+
				'<td><a class="text-danger"><i class="fa fa-trash"></i></a></td>'+
			'</tr>'
		);
	});
}
function CargarTablaContranate() {
	$("#tbl-lista-contratante > tbody").html("");
	array_partes_intervinientes.forEach(function(e,i){
		$("#tbl-lista-contratante > tbody").append(
			'<tr>'+
				'<td>'+(i+1)+'</td>'+
				'<td>'+e.ParteInterviniente+'</td>'+
				'<td>'+e.Representante+'</td>'+
				'<td><a class="text-danger"><i class="fa fa-trash"></i></a></td>'+
			'</tr>'
		);
	});
}
// VALIDACIONES
function CampoRequeridoTxt(controlTxt, classNormal, classError) {
    if (trim(controlTxt.val()) == "") {
        controlTxt.prop('title', 'Campo obligatorio');
        controlTxt.addClass(classError);

        controlTxt.blur(function () {
            CampoRequeridoTxt(jQuery(this), classNormal, classError);
        });
        return true;
    }
    else {
        controlTxt.removeClass(classError);
        controlTxt.prop('title', '');
        return false;
    }
}
//Quitar espacios en blanco
function trim(myString) {
    return myString.replace(/^\s+/g, '').replace(/\s+$/g, '')
}
// Nombre del Mes
function NombreMes(d) {
	switch(d) {
		case 1:
			return "Enero";
		case 2:
			return "Febrero";
		case 3:
			return "Marzo";
		case 4:
			return "Abril";
		case 5:
			return "Mayo";
		case 6:
			return "Junio";
		case 7:
			return "Julio";
		case 8:
			return "Agosto";
		case 9:
			return "Septiembre";
		case 10:
			return "Octubre";
		case 11:
			return "Noviembre";
		case 12:
			return "Diciembre";
	}
}