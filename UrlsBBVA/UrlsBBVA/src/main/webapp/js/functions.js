/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 <script>
 $(document).ready(function () {
 $('#example').DataTable({
 "pagingType": "full_numbers"
 });
 });
 </script>
 */
$(document).ready(function () {
//Llamada a limpiar la lista cuando se entra

    $("#peticionList").click(function () {
        $("#peticionDiv").show();
        $("#usoOtpDiv").hide();
        $("#mttoDiv").hide();
        $("#lastDiv").hide();
    });
    $("#usoOtpList").click(function () {
        $("#peticionDiv").hide();
        $("#usoOtpDiv").show();
        $("#mttoDiv").hide();
        $("#lastDiv").hide();
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
        $('#datepickerD').val(datestring);
    });
    $("#mttoList").click(function () {
        $("#peticionDiv").hide();
        $("#usoOtpDiv").hide();
        $("#mttoDiv").show();
        $("#lastDiv").hide();
    });
    $("#lastList").click(function () {
        $("#peticionDiv").hide();
        $("#usoOtpDiv").hide();
        $("#mttoDiv").hide();
        $("#lastDiv").show();
    });
    $('#datepickerD').datepicker({
        format: "dd-mm-yyyy",
        language: "es",
        autoclose: true
    });
});

function maxnum100() {
    var numero = $('#selectNumPeticiones').val();
    if (numero > 100) {
        $('#selectNumPeticiones').val("100");
    }
    if (numero <= 0) {
        $('#selectNumPeticiones').val("1");
    }
}

function validaOTP() {
    var parametrotxt = $('#llaveOTPtxt').val().length > 0 ? $('#llaveOTPtxt').val() : $('#llaveOTP').val();
    for (var i = 0; i < parametrotxt.length; i++) {
        var valorAscii = parametrotxt.charCodeAt(i);
        console.log(valorAscii);
        if ((valorAscii >= 65 && valorAscii <= 90) || (valorAscii >= 97 && valorAscii <= 122)) {
            $(this).val("" + parametrotxt.substring(0, i - 1));
        }
    }
}



$('input').on('keydown', function (e)
{
//    eliminar caracteres dif a num y cadena
//    var parametrotxt = $('#llaveOTPtxt').val().length > 0 ? $('#llaveOTPtxt').val() : $('#llaveOTP').val();
//    console.log(parametrotxt+"");
//    for (var i = 0; i < parametrotxt.length; i++) {
//        var valorAscii = parametrotxt.charCodeAt(i);
//        console.log(valorAscii);
//        if ((valorAscii >= 65 && valorAscii <= 90) || (valorAscii >= 97 && valorAscii <= 122)) {
//            $(this).val("" + parametrotxt.substring(0, i));
//        }
//    }
    // Visually Friendly Auto-Uppercase
    var $this = $(this);

    // 1. Length of 1, hitting backspace, remove class.
    if ($this.val().length == 1 && e.which == 8)
    {
        $this.removeClass('text-uppercase');
    }

    // 2. Length of 0, hitting character, add class.
    if ($this.val().length == 0 && e.which >= 65 && e.which <= 90)
    {
        $this.addClass('text-uppercase');
    }
});

function refresh() {
    var context = $('#contexto').val();
    $.ajax({
        type: "GET",
        url: context + '/ServletUrls',
        data: {
            opcion: '2'
        },
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var table = $('#tablaOperaciones').DataTable();
            table.destroy();
            $('#tablaOperaciones').empty();
            $('#tablaOperaciones').remove();
            var cuerpoT = '<table id="tablaOperaciones" class="display table">'
                    + ' <thead><tr><th>Tipo</th><th>URL</th><th>Data</th><th>Fecha</th></tr></thead>'
                    + '<tbody id="cuerpotablaOperaciones"></tbody>'
                    + '<tfoot><tr><th>Tipo</th><th>URL</th><th>Data</th><th>Fecha</th></tr></tfoot>'
                    + '</table>';
            $('#contenedorTabla').append(cuerpoT);
            $('#tablaOperaciones').dataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        beforeSend: function (jqXHR, settings) {
        },
        complete: function (jqXHR, textStatus) {
            $('#usuariotxt').val("");
            $('#selectNumPeticiones').val("1");
            var llaveOTPtxt = $('#llaveOTPtxt').val("");
            var selTipo = $('#selTipo').val("ADD");
            var parametrotxt = $('#parametrotxt').val("SAJCYCPD_OK_PR");
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
            $('#datepickerD').val(datestring);

            $('#llaveOTP').val("");
            $('#tipoAccion').val("SELECT");
            $('#idTxt').val("");
            $('#tipoAccion2').val("");
            $('#datoTxt').val("");
            $('#statTxt').val("A1");
            $('#otrotxt').val("");
            $('#secuenciaTxt').val("");
        }
    });
}

function consultaPorPeticion() {
    var context = $('#contexto').val();
    var user = $('#usuariotxt').val().trim();
    var selectNumPeticiones = $('#selectNumPeticiones').val();
    if (user.length > 0 && parseInt(selectNumPeticiones)) {
        $.ajax({
            type: "GET",
            url: context + '/ServletUrls',
            data: {
                opcion: '1',
                usuariotxt: user,
                selectNumPeticiones: selectNumPeticiones
            },
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var table = $('#tablaOperaciones').DataTable();
                table.destroy();
                $('#cuerpotablaOperaciones').remove();
                var cuerpoT = '<tbody id="cuerpotablaOperaciones">';
                for (BuscadorObjeto in data) {
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].fecha + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
            beforeSend: function (jqXHR, settings) {
                $("#loaderDiv").show();
                $("#containerDiv").hide();
            },
            complete: function (jqXHR, textStatus) {
                $("#loaderDiv").hide();
                $("#containerDiv").show();
            }
        });
    } else {
        alert("El campo Número de Usuario esta vacío");
    }
}

function consultaPorOTP() {
    var context = $('#contexto').val();
    var llaveOTPtxt = $('#llaveOTPtxt').val().trim();
    var selTipo = $('#selTipo').val();
    var parametrotxt = $('#otrotxt').val().trim().length > 0 ? $('#otrotxt').val().trim() : $('#parametrotxt').val();
    var datepickerD = $('#datepickerD').val().trim();

    var mensaje = llaveOTPtxt.length > 0 ?
            parametrotxt.length > 0 ?
            datepickerD.length > 0 ? ""
            : "Selecciona una Fecha"
            : "El campo Condición esta vacío"
            : "El campo Llave OTP esta vacío";
    if (mensaje.length === 0) {
        $.ajax({
            type: "GET",
            url: context + '/ServletUrls',
            data: {
                opcion: '3',
                llaveOTPtxt: llaveOTPtxt,
                selTipo: selTipo,
                parametrotxt: parametrotxt,
                datepickerD: datepickerD
            },
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var table = $('#tablaOperaciones').DataTable();
                table.destroy();
                $('#cuerpotablaOperaciones').remove();
                var cuerpoT = '<tbody id="cuerpotablaOperaciones">';
                for (BuscadorObjeto in data) {
                    console.log(data[BuscadorObjeto].url + "");
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].fecha + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
            beforeSend: function (jqXHR, settings) {
                $("#loaderDiv").show();
                $("#containerDiv").hide();
            },
            complete: function (jqXHR, textStatus) {
                $("#loaderDiv").hide();
                $("#containerDiv").show();
            }
        });
    } else {
        alert(mensaje);
    }
}


function consultaMTTOPARA() {
    var context = $('#contexto').val();
    var llaveOTP = $('#llaveOTP').val().trim();
    var tipoAccion = $('#tipoAccion').val();
    var idTxt = $('#idTxt').val().trim();
    var tipoAccion2 = $('#tipoAccion2').val().trim();
    var secuenciaTxt = $('#secuenciaTxt').val().trim();
    var datoTxt = $('#datoTxt').val().trim();
    var statTxt = $('#statTxt').val().trim();

    var mensaje = llaveOTP.length > 0 ?
            idTxt.length > 0 ?
            tipoAccion2.length > 0 ?
            secuenciaTxt.length > 0 ?
            datoTxt.length > 0 ?
            "" : "El campo Dato esta vacio"
            : "El campo Secuencia esta vacio"
            : "El campo Subtabla esta vacio"
            : "El campo Tabla esta vacio"
            : "El campo Llave OTP esta vacio";

    if (mensaje.length === 0) {
        $.ajax({
            type: "GET",
            url: context + '/ServletUrls',
            data: {
                opcion: '4',
                llaveOTP: llaveOTP,
                tipoAccion: tipoAccion,
                idTxt: idTxt,
                tipoAccion2: tipoAccion2,
                secuenciaTxt: secuenciaTxt,
                datoTxt: datoTxt,
                statTxt: statTxt
            },
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var table = $('#tablaOperaciones').DataTable();
                table.destroy();
                $('#cuerpotablaOperaciones').remove();
                var cuerpoT = '<tbody id="cuerpotablaOperaciones">';
                for (BuscadorObjeto in data) {
                    console.log(data[BuscadorObjeto].url + "");
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].fecha + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
            beforeSend: function (jqXHR, settings) {
                $("#loaderDiv").show();
                $("#containerDiv").hide();
            },
            complete: function (jqXHR, textStatus) {
                $("#loaderDiv").hide();
                $("#containerDiv").show();
            }
        });
    } else {
        alert(mensaje);
    }
}

//$("input").keypress(function () {
//    var texto = this.value;
//    console.log(texto);
//    this.set(texto.toUpperCase());
//});
//function consultarPorPeticion() {
//    var obj = new Object();
//    obj.operacion = "pruebaKZML";
//    obj.concepto = "PETICION;XMJN;";
//
//    $.ajax({
//        type: 'GET',
//        //url: 'https://www.bancomermovil.com/mbhxp_mx_web/servlet/ServletOperacionWeb?OPERACION=BAN2O05&LOCALE=es_ES&PAR_INICIO.0={"operacion":"pruebaKZML","concepto":"PETICION;XMJN;"}',
//        url: 'https://www.bancomermovil.com/mbhxp_mx_web/servlet/ServletOperacionWeb?OPERACION=BAN2O05&LOCALE=es_ES&PAR_INICIO.0=' + JSON.stringify(obj) + '',
//        success: function (data) {
//            console.log("success: " + data);
//            alert(data);
//        },
//        error: function (data) {
//            console.log("error: " + data);
//        }
//    });
//}