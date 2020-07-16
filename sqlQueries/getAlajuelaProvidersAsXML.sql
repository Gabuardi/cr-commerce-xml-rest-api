SELECT * FROM Proveedores
WHERE Direccion LIKE 'Al%'
FOR XML PATH ('Proveedor'), ROOT('Proveedores')
