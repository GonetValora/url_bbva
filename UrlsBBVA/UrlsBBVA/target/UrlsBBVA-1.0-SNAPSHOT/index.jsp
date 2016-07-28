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
                        <li id="peticionList" class="">
                            <a href="#"><i class="fa fa-fw fa-codepen"></i> Petición</a>
                        </li>
                        <li id="usoOtpList">
                            <a href="#"><i class="fa fa-fw fa-delicious"></i> Uso De OTP</a>
                        </li>
                        <li id="mttoList">
                            <a href="#"><i class="fa fa-fw fa-empire"></i> MTTOPARA</a>
                        </li>
                        <li id="lastList">
                            <a href="#"><i class="fa fa-fw fa-ils"></i> Por Definir</a>
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

                <div class="container-fluid">
                    <input type="hidden" name="contexto" id="contexto" value="<%=context%>"/>
                    <!-- Page Heading -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                Tablero de instrumentos <small> Descripción general</small>
                            </h1>
                        </div>
                    </div>

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
                                            <div class="input-group">
                                                <span class="input-group-addon" id="basic-addon1"></span>
                                                <input value="XMJN" id="usuariotxt" name="usuariotxt" type="text" class="form-control" placeholder="Usuario" aria-describedby="basic-addon1">
                                            </div>
                                            <br>
                                            <div class="form-inline">
                                                <button onclick="consultaPorPeticion();" type="submit" class="btn btn-success" role="button" >Aceptar</button>
                                                <button class="btn btn-danger btn-sm" role="button" type="reset">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="usoOtpDiv" class="panel panel-default" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-delicious"></i> Uso De OTP</h3>
                                </div>
                                <div class="panel-body">

                                    <form class="col-md-offset-1" action="" method="post">
                                        <div class="col-md-6">
                                            <div class="input-group">
                                                <span class="input-group-addon" id="basic-addon1">@</span>
                                                <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                                            </div>
                                            <br>
                                            <div class="form-inline">
                                                <button href="#" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button class="btn btn-danger btn-sm" role="button" type="reset">Cancelar</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div id="mttoDiv" class="panel panel-default" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-empire"></i> MTTOPARA</h3>
                                </div>
                                <div class="panel-body">

                                    <form class="col-md-offset-1" action="" method="post">
                                        <div class="col-md-6">
                                            <div class="input-group">
                                                <span class="input-group-addon" id="basic-addon1">@</span>
                                                <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                                            </div>
                                            <br>
                                            <div class="form-inline">
                                                <button href="#" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button class="btn btn-danger btn-sm" role="button" type="reset">Cancelar</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div id="lastDiv" class="panel panel-default" style="display: none;">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-fw fa-ils"></i> Por Definir</h3>
                                </div>
                                <div class="panel-body">

                                    <form class="col-md-offset-1" action="" method="post">
                                        <div class="col-md-6">
                                            <div class="input-group">
                                                <span class="input-group-addon" id="basic-addon1">@</span>
                                                <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                                            </div>
                                            <br>
                                            <div class="form-inline">
                                                <button href="#" class="btn btn-success btn-sm" role="button">Aceptar</button>
                                                <button class="btn btn-danger btn-sm" role="button" type="reset">Cancelar</button>
                                            </div>
                                        </div>
                                    </form>

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
                                <div class="panel-body">

                                    <table id="tablaOperaciones" class="display" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>URL</th>
                                                <th>Data</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>URL</th>
                                                <th>Data</th>
                                                <th>Fecha</th>
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
        <script src="<%=context%>/js/dataTables.min.js"></script>

        <!-- Functions JavaScript -->
        <script src="<%=context%>/js/functions.js"></script>

    </body>

</html>
