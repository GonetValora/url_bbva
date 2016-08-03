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
        }
    });
}

function consultaPorPeticion() {
//    $.ajaxSetup({
//        async: false
//    });

    var context = $('#contexto').val();
    var user = $('#usuariotxt').val();
    var selectPeticion = $('#selectPeticion').val();

    $.ajax({
        type: "GET",
        url: context + '/ServletUrls',
        data: {
            opcion: '1',
            usuariotxt: user,
            selectPeticion: selectPeticion
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
        },
        complete: function (jqXHR, textStatus) {
        }
    });

//    $.ajaxSetup({
//        async: true
//    });
}

function consultaPorOTP() {
//    $.ajaxSetup({
//        async: false
//    });

    var context = $('#contexto').val();
    var llaveOTPtxt = $('#llaveOTPtxt').val();
    var selTipo = $('#selTipo').val();
    var parametrotxt = $('#parametrotxt').val();
    var datepickerD = $('#datepickerD').val();

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
        },
        complete: function (jqXHR, textStatus) {
        }
    });


//    $.ajaxSetup({
//        async: true
//    });
}

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