<%-- 
    Document   : index
    Created on : 26-jul-2016, 11:14:40
    Author     : gonet
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <% String context = request.getContextPath();%>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="BBVA" content="">
        <meta name="author" content="">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Url's BBVA</title>
        <!-- Bootstrap Core CSS -->
        <link href="<%=context%>/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom CSS -->
        <link href="<%=context%>/css/sb-admin.css" rel="stylesheet">

        <!-- Table CSS -->
        <link href="<%=context%>/css/dataTables.min.css" rel="stylesheet">

        <!-- Custom Fonts -->
        <link href="<%=context%>/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="<%=context%>/css/bootstrap-datepicker3.css">

    </head>

    <body>

        <div id="wrapper">

            <!-- Navigation -->
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Navegación</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <img class="navbar-brand"  src="<%=context%>/images/logo.png">
                </div>
                <!-- Top Menu Items -->
                <ul class="nav navbar-right top-nav">
                    <!-- Añadir codigo menú left>-->
                </ul>
                <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav side-nav">
                        <li id="peticionList" class="" onclick="refreshDatos();">
                            <a href="#"><i class="fa fa-fw fa-codepen"></i> Petición</a>
                        </li>
                        <li id="usoOtpList" onclick="refreshDatos();">
                            <a href="#"><i class="fa fa-fw fa-delicious"></i> Control-M</a>
                        </li>
                        <li id="mttoList" onclick="refreshDatos();">
                            <a href="#"><i class="fa fa-fw fa-empire"></i> Mtto Para</a>
                        </li>
                        <li id="lastList" onclick="refreshDatos();">
                            <a href="#"><i class="fa fa-fw fa-ils"></i> Copias</a>
                        </li>
                        <!--
                        <li>
                            <a href="<%=context%>/javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i> Dropdown <i class="fa fa-fw fa-caret-down"></i></a>
                            <ul id="demo" class="collapse">
                                <li>
                                    <a href="<%=context%>/#">Dropdown Item</a>
                                </li>
                                <li>
                                    <a href="<%=context%>/#">Dropdown Item</a>
                                </li>
                            </ul>
                        </li>
                        -->
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>

            <div id="page-wrapper">
                <br>
                <div class="col-md-offset-5 panel loader" id="loaderDiv" name="loaderDiv" style="display: none;"></div>

                <div class="container-fluid" id="containerDiv" name="containerDiv">
                    <input type="hidden" name="contexto" id="contexto" value="<%=context%>"/>
                    <!-- Page Heading 
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                Tablero de instrumentos <small> Descripción general</small>
                            </h1>
                        </div>
                    </div>
                    -->
                    <div class="row">
                        <div class="col-lg-12">

                            <div id="peticionDiv" class="panel panel-primary">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-codepen"></i> Petición</h3>
                                </div>
                                <div class="panel-body">

                                    <div class="col-md-offset-1">
                                        <input type="hidden" value="1" id="opcion" name="opcion">
                                        <div class="col-md-6">
                                            <label>Número de Usuario:</label>
                                            <div class="input-group col-md-6">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="1" maxlength="4" id="usuariotxt" name="usuariotxt" type="text" class="form-control text-uppercase" placeholder="Número de Usuario" aria-describedby="">
                                            </div>
                                            <br>
                                            <label>Numero de Peticiones:</label>
                                            <div class="input-group col-md-3">
                                                <span class="input-group-addon" id=""></span>
                                                <input onChange="maxnum100();" value="1" min="1" max="100" id="selectNumPeticiones" name="selectNumPeticiones" type="number" class="form-control">
                                            </div>
                                            <br>
                                            <div class="form-inline">
                                                <button onclick="consultaPorPeticion();" onchange="" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button onclick="refresh();" class="btn btn-danger btn-sm" role="button" >Limpiar</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="usoOtpDiv" class="panel panel-primary" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-delicious"></i> Control-M</h3>
                                </div>
                                <div class="panel-body">

                                    <div class="col-md-offset-1">
                                        <div class="col-md-6">
                                            <label>Tipo Concepto:</label>
                                            <div class="input-group col-md-4">
                                                <select class="form-control" id="selTipo" name="selTipo">
                                                    <option value="ADD">ADD</option>
                                                    <option value="DELETE">DELETE</option>
                                                    <option value="CHECK">CHECK</option>
                                                </select>
                                            </div>
                                            <br>

                                            <label>Llave OTP:</label>
                                            <div class="input-group col-md-7">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="20" maxlength="20" name="llaveOTPtxt" id="llaveOTPtxt" type="text" class="form-control text-uppercase" placeholder="Llave OTP" aria-describedby="">
                                            </div>
                                            <br>

                                            <label>Condición:</label>
                                            <div class="input-group form-group row">
                                                <div class="col-md-6">
                                                    <select class="form-control" id="parametrotxt" name="parametrotxt" onchange="myFunctionOtro()">
                                                        <option value="SAJCYCPD_OK_PR">SAJCYCPD_OK_PR</option>
                                                        <option value="NSACRID2_OK_PR">NSACRID2_OK_PR</option>
                                                        <option value="KZJCGERA_OK_PR">KZJCGERA_OK_PR</option>
                                                        <option value="OTRO">Otra Condición</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6 input-group">
                                                    <span class="input-group-addon" id=""></span>
                                                    <input minlength="1" disabled="true" class="form-control text-uppercase" name="otrotxt" id="otrotxt" type="text" placeholder="Otra Condición" >
                                                </div>
                                            </div>
                                            <br>

                                            <label>Fecha:</label>
                                            <div class="input-group col-md-4">
                                                <div class="input-group date">
                                                    <span class="input-group-addon"></span>
                                                    <input pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}" id="datepickerD" id="datepickerD" placeholder="Fecha" name="datepickerD" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <br>

                                            <div class="form-inline">
                                                <button onclick="consultaPorOTP();" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button onclick="refresh();" class="btn btn-danger btn-sm" role="button" >Limpiar</button>                                        
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="mttoDiv" class="panel panel-primary" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-empire"></i> Mtto Para</h3>
                                </div>
                                <div class="panel-body">

                                    <div class="col-md-offset-1">
                                        <div class="col-md-6">
                                            <label>Llave OTP:</label>
                                            <div class="input-group col-md-7">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="20" maxlength="20" name="llaveOTP" id="llaveOTP" type="text" class="form-control text-uppercase" placeholder="Llave OTP" aria-describedby="">
                                            </div>
                                            <br>

                                            <label>Tipo Acción:</label>
                                            <div class="input-group col-md-4">
                                                <select class="form-control" id="tipoAccion" name="tipoAccion">
                                                    <option value="SELECT">SELECT</option>
                                                    <option value="INSERT">INSERT</option>
                                                    <option value="UPDATE">UPDATE</option>
                                                    <option value="DELETE">DELETE</option>
                                                </select>
                                            </div>
                                            <br>

                                            <label>Tabla:</label>
                                            <div class="input-group col-md-2">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="1" maxlength="2" id="idTxt" name="idTxt" type="text" placeholder="53" class="form-control">
                                            </div>
                                            <br>

                                            <label>Subtabla:</label>
                                            <div class="input-group col-md-3">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="1" maxlength="4" id="tipoAccion2" name="tipoAccion2" type="text" placeholder="INPU" class="form-control">
                                            </div>
                                            <br>

                                            <label>Secuencia:</label>
                                            <div class="input-group col-md-4">
                                                <span class="input-group-addon" id=""></span>
                                                <input minlength="1" maxlength="8" id="secuenciaTxt" name="secuenciaTxt" type="text" placeholder="00000001" class="form-control">
                                            </div>
                                            <br>

                                            <label>Dato:</label>
                                            <div class="input-group col-md-10">
                                                <span class="input-group-addon" id=""></span>
                                                <input onkeypress="soloLetras(event)" minlength="1" maxlength="30" name="datoTxt" id="datoTxt" type="text" class="form-control" placeholder="Dato" aria-describedby="">
                                            </div>
                                            <br>

                                            <label>Estado:</label>
                                            <div class="input-group col-md-4">
                                                <select class="form-control" id="statTxt" name="statTxt">
                                                    <option value="A1">A1</option>
                                                    <option value="B1">B1</option>
                                                    <option value="C1">C1</option>
                                                </select>
                                            </div>
                                            <br>

                                            <div class="form-inline">
                                                <button onclick="consultaMTTOPARA();" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button onclick="refresh();" class="btn btn-danger btn-sm" role="button" >Limpiar</button>                                        
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="lastDiv" class="panel panel-primary" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-ils"></i> Copias</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-offset-1">
                                        <div class="col-md-6">

                                            <label>Archivo Origen:</label>
                                            <div class="input-group">
                                                <span class="input-group-addon" id=""></span>
                                                <input onkeyup="llaveOTPOrigenTam()" minlength="30" maxlength="44" name="origenTxt" id="origenTxt" type="text" class="form-control text-uppercase" placeholder="Archivo Origen" aria-describedby="">
                                            </div>
                                            <br>

                                            <label>Llave OTP Origen:</label>
                                            <div class="input-group">
                                                <span class="input-group-addon" id=""></span>
                                                <input disabled="true" minlength="20" maxlength="20" name="llaveOTPOrigen" id="llaveOTPOrigen" type="text" class="form-control" placeholder="Llave OTP Origen" aria-describedby="">
                                            </div>
                                            <br>

                                            <div id="segundaLlaveOrigen" name="segundaLlaveOrigen">
                                                <label>Segunda Llave OTP Origen:</label>
                                                <div class="input-group col-md-10">
                                                    <span class="input-group-addon" id=""></span>
                                                    <input disabled="true" minlength="20" maxlength="20" name="llaveOTPOrigen2" id="llaveOTPOrigen2" type="text" class="form-control" placeholder="Segunda Llave OTP Origen" aria-describedby="">
                                                </div>
                                                <br>  
                                            </div>


                                            <label>Archivo Destino:</label>
                                            <div class="input-group">
                                                <span class="input-group-addon" id=""></span>
                                                <input onkeyup="llaveOTPDesrinoTam()" minlength="30" maxlength="44" name="destinoTxt" id="destinoTxt" type="text" class="form-control text-uppercase" placeholder="Archivo Destino" aria-describedby="">
                                            </div>
                                            <br>

                                            <label>Llave OTP Destino:</label>
                                            <div class="input-group">
                                                <span class="input-group-addon" id=""></span>
                                                <input disabled="true" minlength="20" maxlength="20" name="llaveOTPODestino" id="llaveOTPODestino" type="text" class="form-control" placeholder="Llave OTP Destino" aria-describedby="">
                                            </div>
                                            <br>

                                            <div id="segundaLlaveDestino" name="segundaLlaveDestino">
                                                <label>Segunda Llave OTP Destino:</label>
                                                <div class="input-group col-md-10">
                                                    <span class="input-group-addon" id=""></span>
                                                    <input disabled="true" minlength="20" maxlength="20" name="llaveOTPODestino2" id="llaveOTPODestino2" type="text" class="form-control" placeholder="Segunda Llave OTP Destino" aria-describedby="">
                                                </div>
                                                <br>  
                                            </div>

                                            <div class="form-inline">
                                                <button onclick="consultaCopia();" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button onclick="refresh();" class="btn btn-danger btn-sm" role="button" >Limpiar</button>                                        
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-qrcode fa-fw"></i> Area GRID</h3>
                                </div>

                                <div class="panel-body table-responsive" id="contenedorTabla" name="contenedorTabla">

                                    <table id="tablaOperaciones" class="display table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Tipo</th>
                                                <th>URL</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Tipo</th>
                                                <th>URL</th>
                                                <th>Data</th>
                                            </tr>
                                        </tfoot>
                                        <tbody id="cuerpotablaOperaciones"></tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- jQuery -->
        <script src="<%=context%>/js/jquery.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="<%=context%>/js/bootstrap.min.js"></script>

        <!-- Table JavaScript -->
        <script src="<%=context%>/js/jquery.dataTables.min.js"></script>
        <script src="<%=context%>/js/dataTables.bootstrap.js"></script>

        <!-- Functions JavaScript -->
        <script src="<%=context%>/js/functions.js"></script>

        <script src="<%=context%>/js/bootstrap-datepicker.js"></script>
        <script src="<%=context%>/js/bootstrap-datepicker.min.js"></script>
        <script src="<%=context%>/js/bootstrap-datepicker.es.min.js"></script>

    </body>

</html>
