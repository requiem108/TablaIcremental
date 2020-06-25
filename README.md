# TABLA INCREMENTAL
Tabla que agrega filas desde el boton add, estas filas pueden contener asta ahora inputs tipo text, checkbox y select, el boton guardar manda la informacion en formato json

tambien se puede agregar otros inputs par agregarlos como si un formulario se tratara

## Como Usarlo
Descargue el archivo TablaIncremental.js

## Estructura 
En los archivos tabla.html y pruebas.js estan ejemplos de uso

## variables de la clase
this.id=id;
this.contenedor;
this.cabezeras;
this.fila = fila;
this.url=url;
this.objetos_externos = [];
this.IdRegistro='';
this.contador=0;
this.btoEliminar_addEvento='';
this.valores_inputs = new Array();

### id
Agrega el id a la tabla

### contenedor
El componente que contendra la tabla

### cabezeras
Un arreglo de objetos js para las cabezeras de la tabla

### Fila
Arreglo de objeto js dentro de las filas, sus propiedades son:
    `tipo: text,checkbox,select`
    `name: modifica la propiedad nombre del input`
    `evento: algun evento que se requiera que tenga`
    `opciones: solo para select, contiene las opciones del select`
### url
La direcciondonde conectara para mandar el JSON con lo datos

### objetos externos
Arreglo de objetos que se deseen incluir en la peticion

### IdRegistro
En caso de ya existir un registro y que se desee actualizar, se agrega el id a esta propiedad

### contador
Agrega un consecutivo a los id's de los elementos creados en la tabla

### botonEliminar_AddEvento
Agrega evento extra al boton eliminar fila

### valores_inputs
Guarda los valores que se deseen pre cargar en la tabla.

## FUNCIONES RELEVANTES

SetDatosTabla(datos)
**datos esta compuesto de un arreglo que en su interior tiene objetos js ejemplo
datos = ['COL0:valor','COL1:valor',...]
**es inpirtante que en la consulta se entregue como nombre de la columna COLn para que pueda colocarlo en el lugar correcto.


