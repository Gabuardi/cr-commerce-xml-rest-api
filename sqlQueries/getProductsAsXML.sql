SELECT * FROM [Productos]
ORDER BY Nombre_Producto
FOR XML PATH ('Producto'), ROOT('Productos')
