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

    $('#example').DataTable({
        "pagingType": "full_numbers"
    });

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

});


function consultarPorPeticion() {
    $.ajax({
        url: "https://www.bancomermovil.com/mbhxp_mx_web/servlet/ServletOperacionWeb?OPERACION=BAN2O05&LOCALE=es_ES&PAR_INICIO.0={%22operacion%22:%22pruebaKZML%22,%22concepto%22:%22PETICION;XMJN;%22}",
        type: 'GET',
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}