/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.gonet.prototypes.urlsbbva.daos;

import java.net.URL;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.net.ssl.HttpsURLConnection;

/**
 *
 * @author macbookair
 */
public class DaoURl {

    public static void main(String[] args) {
        //consultaDePeticion("");
    }

    public Map consultaDePeticion(String dato) {
        Map mapaDatos = new HashMap();
        try {

            Date today;
            String fecha;
            SimpleDateFormat formatter;

            formatter = new SimpleDateFormat("yyyy-MMMMM-dd hh:mm aaa");
            today = new Date();
            fecha = formatter.format(today);

            String httpsURL = "https://www.bancomermovil.com/mbhxp_mx_web/servlet/ServletOperacionWeb?OPERACION=BAN2O05&LOCALE=es_ES&PAR_INICIO.0={\"operacion\":\"pruebaKZML\",\"concepto\":\"PETICION;" + dato + ";\"}";
            URL myurl = new URL(httpsURL);
            HttpsURLConnection con = (HttpsURLConnection) myurl.openConnection();
            InputStream ins = con.getInputStream();
            InputStreamReader isr = new InputStreamReader(ins);
            BufferedReader in = new BufferedReader(isr);

            String inputLine, outputreturn = "";

            while ((inputLine = in.readLine()) != null) {
                outputreturn += inputLine;
            }
            mapaDatos.put("url", httpsURL);
            mapaDatos.put("data", outputreturn);
            mapaDatos.put("fecha", fecha);

            in.close();
            return mapaDatos;
        } catch (Exception e) {
            return mapaDatos;
        }
    }
}
