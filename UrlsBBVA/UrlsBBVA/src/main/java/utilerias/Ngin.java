/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilerias;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Aya
 */
public class Ngin {

    private final Connection connection;

    public Ngin(Connection connection) {
        this.connection = connection;
    }

    /**
     *
     * @param query: La sentencia SQL a ejecutar
     * @param parameters: Parametros para la sentencia. Son opcionales
     * @return Retorna una lista de mapas que contiene el resultado de la
     * consulta. Puede ser convertida a json
     */
    public List<Map<String, String>> getRows(String query, Object... parameters) {
        List<Map<String, String>> list = new ArrayList<>();

        try (PreparedStatement prepareStatement = this.connection.prepareStatement(query)) {
            this.setParameters(prepareStatement, parameters);

            try (ResultSet resultSet = prepareStatement.executeQuery()) {
                this.setParameters(prepareStatement, parameters);
                List<String> columnNames = this.getColumnNames(resultSet);

                while (resultSet.next()) {
                    Map<String, String> hashMap = new HashMap();

                    for (String columnName : columnNames) {
                        hashMap.put(columnName, resultSet.getString(columnName));
                    }

                    list.add(hashMap);
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace(System.err);
        }

        return list;
    }

    /**
     *
     * @param query: La sentencia SQL a ejecutar
     * @param parameters: Parametros para la sentencia. Son opcionales
     * @return Un map con el resultado de la consulta.<br/>
     * Si el resultado tiene mas de una fila devuelve solo la primera
     */
    public Map getRow(String query, Object... parameters) {
        List<Map<String, String>> result = this.getRows(query, parameters);
        Map row = new HashMap();

        if (!result.isEmpty()) {
            row = result.get(0);
        }

        return row;
    }

    /**
     *
     * @param query: La sentencia SQL a ejecutar
     * @param parameters: Parametros para la sentencia. Son opcionales
     * @return true si la sentencia ha afectado a uno o mas elementos
     */
    public boolean execute(String query, Object... parameters) {
        boolean status = false;

        try (PreparedStatement prepareStatement = this.connection.prepareStatement(query)) {
            this.setParameters(prepareStatement, parameters);

            status = prepareStatement.executeUpdate() != 0;
        } catch (SQLException ex) {
            ex.printStackTrace(System.err);
        }

        return status;
    }

    private void setParameters(PreparedStatement preparedStatement, Object... parameters) throws SQLException {
        if (parameters.length != 0) {
            int index = 1;

            for (Object parameter : parameters) {
                preparedStatement.setObject(index++, parameter);
            }
        }
    }

    private List<String> getColumnNames(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        int n = metaData.getColumnCount();

        List<String> columnNames = new ArrayList<>();

        for (int i = 1; i <= n; i++) {
            columnNames.add(metaData.getColumnLabel(i));
        }

        return columnNames;
    }
}