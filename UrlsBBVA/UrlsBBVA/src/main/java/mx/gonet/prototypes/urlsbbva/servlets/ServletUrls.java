/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.gonet.prototypes.urlsbbva.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.gonet.prototypes.urlsbbva.daos.DaoMTTOPARA;
import mx.gonet.prototypes.urlsbbva.daos.DaoOTPUrl;
import mx.gonet.prototypes.urlsbbva.daos.DaoPeticionUrl;

/**
 *
 * @author macbookair
 */
@WebServlet("/ServletUrls")
public class ServletUrls extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error oc curs
     * @throws IOException if an I/O error occurs
     */
    static final String UrlTipoPeticion = "1";
    static final String RefreshList = "2";
    static final String UrlTipoOTP = "3";
    static final String UrlMTTOPARA = "4";
    ArrayList listadoRespuestas = new ArrayList();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;");

        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        Gson gson = new Gson();
        switch (opcion) {
            case UrlTipoPeticion:
                DaoPeticionUrl daoPet = new DaoPeticionUrl();
                String user = request.getParameter("usuariotxt");
                int numPeticiones = Integer.parseInt(request.getParameter("selectNumPeticiones"));
                for (int i = 0; i < numPeticiones; i++) {
                    listadoRespuestas.add(daoPet.consultaDePeticion(user));
                }
                out.print(gson.toJson(listadoRespuestas));
                break;

            case UrlTipoOTP:
                DaoOTPUrl daoOtp = new DaoOTPUrl();
                String llaveOTPtxt = request.getParameter("llaveOTPtxt");
                String selTipo = request.getParameter("selTipo");
                String parametrotxt = request.getParameter("parametrotxt");
                String datepickerD = request.getParameter("datepickerD");
                String fechaPeticion = datepickerD.substring(0, 2) + ";" + datepickerD.substring(3, 5);
                listadoRespuestas.add(daoOtp.consultaDePeticion(llaveOTPtxt, selTipo, parametrotxt, fechaPeticion));

                out.print(gson.toJson(listadoRespuestas));
                break;

            case UrlMTTOPARA:
                DaoMTTOPARA daoMTTO = new DaoMTTOPARA();
                String llaveOTP = request.getParameter("llaveOTP");
                String tipoAccion = request.getParameter("tipoAccion");
                String idTxt = request.getParameter("idTxt");
                String tipoAccion2 = request.getParameter("tipoAccion2");
                String datoTxt = request.getParameter("datoTxt");
                String statTxt = request.getParameter("statTxt");

                listadoRespuestas.add(daoMTTO.consultaDePeticion(llaveOTP, tipoAccion, idTxt, tipoAccion2, datoTxt, statTxt));

                out.print(gson.toJson(listadoRespuestas));
                break;

            case RefreshList:
                listadoRespuestas = new ArrayList();
                out.print(gson.toJson(listadoRespuestas));
                break;

        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
