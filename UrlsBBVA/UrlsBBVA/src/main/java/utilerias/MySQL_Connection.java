/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilerias;

/**
 *
 * @author macbookair
 */
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.dbcp.BasicDataSource;

public class MySQL_Connection {

    private static ResourceBundle properties;

    private static String host;
    private static String port;
    private static String database;
    private static String user;
    private static String password;

    public static Connection getConnection() {
        try {
            System.out.print("Conecting with the database... ");

            if (properties == null) {
                properties = ResourceBundle.getBundle("MySQL");

                host = properties.getString("host");
                port = properties.getString("port");
                database = properties.getString("database");
                user = properties.getString("user");
                password = properties.getString("password");
            }

            BasicDataSource datasource = new BasicDataSource();
            datasource.setDriverClassName("com.mysql.jdbc.Driver");
            datasource.setUsername(user);
            datasource.setPassword(password);
            datasource.setUrl(String.format("jdbc:mysql://%s:%s/%s", host, port, database));
            datasource.setMaxActive(125);
            datasource.setMaxIdle(25);
            datasource.setMaxWait(5000);

            Connection connection = datasource.getConnection();
            System.out.println("success.");

            return connection;
        } catch (SQLException ex) {
            System.out.println("failed.\n" + ex);
            return null;
        }
    }

    public static void main(String[] args) {
        Connection connection = MySQL_Connection.getConnection();

        try {
            connection.close();
        } catch (SQLException ex) {
            Logger.getLogger(MySQL_Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
