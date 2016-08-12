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
$('input').on('keyup', function (event)
{
    var cadena = $('#' + event.currentTarget.id + '').val();
    $(this).val(cadena.replace("..", ".").trim());
});


function soloLetras(e) {
    key = e.keyCode || e.which;

    if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {

    } else {

    }
}


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
                    + ' <thead><tr><th>Fecha</th><th>Tipo</th><th>URL</th><th>Data</th></tr></thead>'
                    + '<tbody id="cuerpotablaOperaciones"></tbody>'
                    + '<tfoot><tr><th>Fecha</th><th>Tipo</th><th>URL</th><th>Data</th></tr></tfoot>'
                    + '</table>';
            $('#contenedorTabla').append(cuerpoT);
            $('#tablaOperaciones').dataTable({
                "order": []
            });
            refreshDatos();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var table = $('#tablaOperaciones').DataTable();
            table.destroy();
            $('#tablaOperaciones').empty();
            $('#tablaOperaciones').remove();
            var cuerpoT = '<table id="tablaOperaciones" class="display table">'
                    + ' <thead><tr><th>Fecha</th><th>Tipo</th><th>URL</th><th>Data</th></tr></thead>'
                    + '<tbody id="cuerpotablaOperaciones"></tbody>'
                    + '<tfoot><tr><th>Fecha</th><th>Tipo</th><th>URL</th><th>Data</th></tr></tfoot>'
                    + '</table>';
            $('#contenedorTabla').append(cuerpoT);
            $('#tablaOperaciones').dataTable({
                "order": []
            });
            refreshDatos();
        }
    });
}

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum === 8))
        return true;

    return /\d/.test(String.fromCharCode(keynum));
}

function noSpaces(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum !== 32))
        return true;

    return /\d/.test(String.fromCharCode(keynum));
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
    $('#origenTxt').val("");
    $('#llaveOTPOrigen').val("");
    $('#llaveOTPOrigen2').val("");
    $('#destinoTxt').val("");
    $('#llaveOTPODestino').val("");
    $('#llaveOTPODestino2').val("");
    $('#llaveOTPOrigen').addClass('disabled').attr('disabled', true);
    $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', true);
    $('#llaveOTPODestino').addClass('disabled').attr('disabled', true);
    $('#llaveOTPODestino2').addClass('disabled').attr('disabled', true);
}


function llaveOTPOrigenTam() {

    var dato = document.getElementById("origenTxt").value;
    var res = dato.replace(" ", "");
    $('#origenTxt').val(res);
    dato = res;
    if (dato.match("([^a-zA-Z0-9_ ])+([^a-zA-Z0-9_ ])") !== null) {
        alert("El formato no puede contener dos o más puntos seguidos");
        $('#llaveOTPOrigen').addClass('disabled').attr('disabled', true);
        $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', true);
    } else {
        if (dato.length > 0 && dato.length <= 30) {
            $('#llaveOTPOrigen').addClass('disabled').attr('disabled', false);
        } else {
            $('#llaveOTPOrigen').addClass('disabled').attr('disabled', true);
        }
        if (dato.length > 30) {
            $('#llaveOTPOrigen').addClass('disabled').attr('disabled', false);
            $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', false);
        } else {
            $('#llaveOTPOrigen2').addClass('disabled').attr('disabled', true);
            $('#llaveOTPOrigen2').val("");
        }
    }
}

function llaveOTPDestinoTam() {
    var dato = document.getElementById("destinoTxt").value;
    var res = dato.replace(" ", "");
    $('#destinoTxt').val(res);
    dato = res;
    if (dato.match("([^a-zA-Z0-9_ ])+([^a-zA-Z0-9_ ])") !== null) {
        alert("El formato no puede contener dos o más puntos seguidos");
        $('#llaveOTPODestino').addClass('disabled').attr('disabled', true);
        $('#llaveOTPODestino2').addClass('disabled').attr('disabled', true);
    } else {
        if (dato.length >0 && dato.length <= 30) {
            $('#llaveOTPODestino').addClass('disabled').attr('disabled', false);
        } else {
            $('#llaveOTPODestino').addClass('disabled').attr('disabled', true);
        }
        if (dato.length > 30) {
            $('#llaveOTPODestino').addClass('disabled').attr('disabled', false);
            $('#llaveOTPODestino2').addClass('disabled').attr('disabled', false);
        } else {
            $('#llaveOTPODestino2').addClass('disabled').attr('disabled', true);
            $('#llaveOTPODestino2').val("");
        }
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
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}


function consultaPorPeticion() {
    var context = $('#contexto').val();
    var user = $('#usuariotxt').val().toUpperCase();
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
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    var llaveOTPtxt = $('#llaveOTPtxt').val();
    var valiOTP = ValidarOtp(llaveOTPtxt);
    var selTipo = $('#selTipo').val();
    var parametrotxt = $('#parametrotxt').val() === "OTRO" ? $('#otrotxt').val() : $('#parametrotxt').val();
    var datepickerD = $('#datepickerD').val();

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
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    var llaveOTP = $('#llaveOTP').val();
    var valiOTP = ValidarOtp(llaveOTP);
    var tipoAccion = $('#tipoAccion').val();
    var idTxt = $('#idTxt').val();
    var tipoAccion2 = $('#tipoAccion2').val();
    var secuenciaTxt = $('#secuenciaTxt').val();
    var datoTxt = $('#datoTxt').val();
    var statTxt = $('#statTxt').val();

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
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    var origenTxt = $('#origenTxt').val().toUpperCase();
    var llaveOTPOrigen = $('#llaveOTPOrigen').val();
    var valiOTP = ValidarOtp(llaveOTPOrigen);


    var llaveOTPOrigen2;
    var valiOTP3;
    if ($('#llaveOTPOrigen2').prop("disabled") === false) {
        llaveOTPOrigen2 = $('#llaveOTPOrigen2').val();
        if (llaveOTPOrigen2.length > 0 && llaveOTPOrigen2.length <= 20) {
            llaveOTPOrigen2 = $('#llaveOTPOrigen2').val();
            valiOTP3 = ValidarOtp(llaveOTPOrigen2);
            if (valiOTP3 === false) {
                alert("La Segunda Llave OTP Origen no cumple con el formato numerico de 20 digitos");
            }
        } else {
            alert("La Segunda Llave OTP Origen no cumple con el formato numerico de 20 digitos");
            llaveOTPOrigen2 = "";
        }
    } else {
        llaveOTPOrigen2 = "";
    }


    var destinoTxt = $('#destinoTxt').val().toUpperCase();
    var llaveOTPODestino = $('#llaveOTPODestino').val();
    var valiOTP2 = ValidarOtp(llaveOTPODestino);

    var llaveOTPODestino2;
    var valiOTP4;

    if ($('#llaveOTPODestino2').prop("disabled") === false) {
        llaveOTPODestino2 = $('#llaveOTPODestino2').val();
        if (llaveOTPODestino2.length > 0 && llaveOTPODestino2.length <= 20) {
            llaveOTPODestino2 = $('#llaveOTPODestino2').val();
            valiOTP4 = ValidarOtp(llaveOTPODestino2);
            if (valiOTP4 === false) {
                alert("La Segunda Llave OTP Destino no cumple con el formato numerico de 20 digitos");
            }
        } else {
            alert("La Segunda Llave OTP Destino no cumple con el formato numerico de 20 digitos");
            llaveOTPODestino2 = "";
        }
    } else {
        llaveOTPODestino2 = "";
    }
//    var llaveOTPODestino2 = $('#llaveOTPODestino2').val();

    var mensaje =
            origenTxt.length > 0 ?
            destinoTxt.length > 0 ?
            valiOTP === true ?
            valiOTP2 === true ?
            "" : "La Llave OTP Destino no cumple con el formato numerico de 20 digitos"
            : "La Llave OTP Origen no cumple con el formato numerico de 20 digitos"
            : "El campo Archivo Destino esta vacio"
            : "El campo Archivo Origen esta vacio";


    if (mensaje.length === 0 && valiOTP === true && valiOTP2 === true && valiOTP3 === true && valiOTP4 === true) {
//        0 a 30 lanzar con 2
//        31 0 mas lanza con 3
//        31 0  mas lanza con 4
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
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    } else if (mensaje.length === 0 && valiOTP === true && ($('#llaveOTPOrigen2').prop("disabled") === true) === true && valiOTP2 === true && valiOTP4 === true) {
//        0 a 30 lanzar con 2
//        31 0 mas lanza con 3
//        31 0  mas lanza con 4
        $.ajax({
            type: "POST",
            url: context + '/ServletUrls',
            data: {
                opcion: '5',
                origenTxt: origenTxt,
                llaveOTPOrigen: llaveOTPOrigen,
                llaveOTPOrigen2: "",
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
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    } else if (mensaje.length === 0 && valiOTP === true && valiOTP3 === true && valiOTP2 === true && ($('#llaveOTPODestino2').prop("disabled") === false) === false) {
//        0 a 30 lanzar con 2
//        31 0 mas lanza con 3
//        31 0  mas lanza con 4
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
                llaveOTPODestino2: ""
            },
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var table = $('#tablaOperaciones').DataTable();
                table.destroy();
                $('#cuerpotablaOperaciones').remove();
                var cuerpoT = '<tbody id="cuerpotablaOperaciones">';
                for (BuscadorObjeto in data) {
                    console.log(data[BuscadorObjeto].url + "");
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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
    } else if (mensaje.length === 0 && valiOTP === true && valiOTP2 === true && ($('#llaveOTPOrigen2').prop("disabled") === false) === false && ($('#llaveOTPODestino2').prop("disabled") === false) === false) {
//        0 a 30 lanzar con 2
//        31 0 mas lanza con 3
//        31 0  mas lanza con 4
        $.ajax({
            type: "POST",
            url: context + '/ServletUrls',
            data: {
                opcion: '5',
                origenTxt: origenTxt,
                llaveOTPOrigen: llaveOTPOrigen,
                llaveOTPOrigen2: "",
                destinoTxt: destinoTxt,
                llaveOTPODestino: llaveOTPODestino,
                llaveOTPODestino2: ""
            },
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var table = $('#tablaOperaciones').DataTable();
                table.destroy();
                $('#cuerpotablaOperaciones').remove();
                var cuerpoT = '<tbody id="cuerpotablaOperaciones">';
                for (BuscadorObjeto in data) {
                    console.log(data[BuscadorObjeto].url + "");
                    cuerpoT += "<tr><td class='text-center'>" + data[BuscadorObjeto].fecha + "</td>"
                            + "<td  class='text-center'>" + data[BuscadorObjeto].operacion + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].url + "</td>"
                            + "<td class='text-center'>" + data[BuscadorObjeto].data + "</td></tr>"
                }
                $('#tablaOperaciones').append(cuerpoT + '</tbody>');
                $('#tablaOperaciones').dataTable({
                    "order": []
                });
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

$(function () {
    $(".wrapper1").scroll(function () {
        $(".wrapper2").scrollLeft($(".wrapper1").scrollLeft());
    });
    $(".wrapper2").scroll(function () {
        $(".wrapper1").scrollLeft($(".wrapper2").scrollLeft());
    });
});
