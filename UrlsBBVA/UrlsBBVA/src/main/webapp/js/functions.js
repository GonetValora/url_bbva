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

//$('input').on('keydown', function (e)
//{
//    // Visually Friendly Auto-Uppercase
//    var $this = $(this);
//
//    $this.addClass('text-uppercase');
//    if ($("#datoTxt").length >= 0)
//    {
//        $("#datoTxt").removeClass('text-uppercase');
//    }
//});



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
            refreshDatos();
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
        }
    });
}
function refreshDatos() {
    $('#usuariotxt').val("");
    $('#selectNumPeticiones').val("1");
    $('#llaveOTPtxt').val("");
    $('#selTipo').val("ADD");
    $('#parametrotxt').val("SAJCYCPD_OK_PR");
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
    $('#otrotxt').addClass('disabled').attr('disabled', true);
}

function soloLetras(e) {
    key = e.keyCode || e.which;

    if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {

    } else {

    }
}

function llaveOTPOrigenTam() {
    var dato = document.getElementById("origenTxt").value;

    if (dato.length >= 1 && dato.length <= 30) {
        $('#llaveOTPOrigen').addClass('disabled').attr('disabled', false);
    } else {
        $('#llaveOTPOrigen').addClass('disabled').attr('disabled', true);
    }

    if (dato.length >= 31) {
        $('#llaveOTPOrigen').addClass('disabled').attr('disabled', false);
        $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', false);
    } else {
        $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', true);
    }

}

function llaveOTPDesrinoTam() {
    var dato = document.getElementById("destinoTxt").value;

    if (dato.length >= 1 && dato.length <= 30) {
        $('#llaveOTPODestino').addClass('disabled').attr('disabled', false);
    } else {
        $('#llaveOTPODestino').addClass('disabled').attr('disabled', true);
    }

    if (dato.length >= 31) {
        $('#llaveOTPODestino').addClass('disabled').attr('disabled', false);
        $('#llaveOTPODestino2').addClass('disabled').attr('disabled', false);
    } else {
        $('#llaveOTPODestino2').addClass('disabled').attr('disabled', true);
    }
}


function myFunctionOtro() {
    var dato = document.getElementById("parametrotxt").value;
    if (dato === "OTRO") {
//        $('#parametrotxt').addClass('disabled').attr('disabled', true);
        $('#otrotxt').addClass('disabled').attr('disabled', false);
    } else {
//        $('#parametrotxt').addClass('disabled').attr('disabled', false);
        $('#otrotxt').addClass('disabled').attr('disabled', true);
        $('#otrotxt').val("");
    }
}


function ValidarOtp(dato) {
    try {
        if (parseInt(dato)) {
            if (dato.length === 20) {
                return true;
            } else {
                return false;
            }
        }
    } catch (e) {
        return false;
    }
}


function consultaPorPeticion() {
    var context = $('#contexto').val();
    var user = $('#usuariotxt').val().trim().toUpperCase();
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
    var valiOTP = ValidarOtp(llaveOTPtxt);
    var selTipo = $('#selTipo').val();
    var parametrotxt = $('#parametrotxt').val() === "OTRO" ? $('#otrotxt').val().trim().toUpperCase() : $('#parametrotxt').val();
    var datepickerD = $('#datepickerD').val().trim();

    var mensaje = llaveOTPtxt.length > 0 ?
            parametrotxt.length > 0 ?
            datepickerD.length > 0 ?
            valiOTP === true ? "" : "La llave OTP no cumple con el formato numerico de 20 digitos"
            : "Selecciona una Fecha"
            : "El campo Condición esta vacío"
            : "El campo Llave OTP esta vacío";
    if (mensaje.length === 0 && valiOTP === true) {
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
    var valiOTP = ValidarOtp(llaveOTP);
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
            valiOTP === true ? "" : "La llave OTP no cumple con el formato numerico de 20 digitos"
            : "El campo Dato esta vacio"
            : "El campo Secuencia esta vacio"
            : "El campo Subtabla esta vacio"
            : "El campo Tabla esta vacio"
            : "El campo Llave OTP esta vacio";

    if (mensaje.length === 0 && valiOTP === true) {
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

function consultaCopia() {
    var context = $('#contexto').val();
    var origenTxt = $('#origenTxt').val().trim().toUpperCase();

    var llaveOTPOrigen;
    var valiOTP;
    if ($('#llaveOTPOrigen').prop("disabled") === false) {
        llaveOTPOrigen = $('#llaveOTPOrigen').val().trim();
        if (llaveOTPOrigen.length > 0 && llaveOTPOrigen.length <= 20) {
            llaveOTPOrigen = $('#llaveOTPOrigen').val().trim();
            valiOTP = ValidarOtp(llaveOTPOrigen);
            if (valiOTP === false) {
                alert("La llave OTP Origen no cumple con el formato numerico de 20 digitos");
            }
        } else {
            llaveOTPOrigen = "No trae nada";
        }
    } else {
        llaveOTPOrigen = "No trae nada";
    }

    var llaveOTPOrigen2;
    var valiOTP2;
    if ($('#llaveOTPOrigen').prop("disabled") === false) {
        llaveOTPOrigen2 = $('#llaveOTPOrigen2').val().trim();
        if (llaveOTPOrigen2.length > 0 && llaveOTPOrigen2.length <= 20) {
            llaveOTPOrigen2 = $('#llaveOTPOrigen').val().trim();
            valiOTP2 = ValidarOtp(llaveOTPOrigen2);
            if (valiOTP === false) {
                alert("La Segunda llave OTP Origen no cumple con el formato numerico de 20 digitos");
            }
        } else {
            llaveOTPOrigen2 = "No trae nada";
        }
    } else {
        llaveOTPOrigen2 = "No trae nada";
    }

    var destinoTxt = $('#destinoTxt').val().trim().toUpperCase();

    var llaveOTPODestino;
    var valiOTP3;
    if ($('#llaveOTPODestino').prop("disabled") === false) {
        llaveOTPODestino = $('#llaveOTPODestino').val().trim();
        if (llaveOTPODestino.length > 0 && llaveOTPODestino.length <= 20) {
            llaveOTPODestino = $('#llaveOTPODestino').val().trim();
            valiOTP3 = ValidarOtp(llaveOTPODestino);
        } else {
            llaveOTPODestino = "No trae nada";
        }
    } else {
        llaveOTPODestino = "";
    }

    var llaveOTPODestino2;
    var valiOTP4 = ValidarOtp(llaveOTPODestino2);
    if ($('#llaveOTPODestino').prop("disabled") === false) {
        llaveOTPODestino2 = $('#llaveOTPODestino2').val().trim();
    } else {
        llaveOTPODestino2 = "";
    }


    var mensaje =
            origenTxt.length > 0 ?
            origenTxt.length >= 30 ?
            destinoTxt.length > 0 ?
            destinoTxt.length >= 30 ? ""
            : "El campo Archivo Destino no cumple con el tamaño"
            : "El campo Archivo Destino esta vacio"
            : "El campo Archivo Origen no cumple con el tamaño"
            : "El campo Archivo Origen esta vacio";

    if (mensaje.length === 0) {
        $.ajax({
            type: "POST",
            url: context + '/ServletUrls',
            data: {
                opcion: '5',
                origenTxt: origenTxt,
                llaveOTPOrigen: llaveOTPOrigen,
                llaveOTPOrigen2: llaveOTPOrigen2,
                destinoTxt: destinoTxt,
                llaveOTPODestino: llaveOTPODestino,
                llaveOTPODestino2: llaveOTPODestino2
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