var cabezeras ={
    head1:'opcion',
    head2:'Comentario',
    head3:'Select'
  }
  var fila =
    [
      {
      tipo:'checkbox',
      name:'estado'
      },
      {
        tipo:'text',
        name:'opcion'        
      },
      {
        tipo:'select',
        name:'tipo_frase',
        opciones: ['frase','opcion'],
        evento:'onchange ="MostrarFrase(event)"'   
      }
    ];
  var url = 'url del servicio a conectar';

  const tabla_test = new TablaIncremental('tablaTest',fila,url);
  const contenedor = document.getElementById('contenedorTabla');
  tabla_test.PintarTabla(contenedor,cabezeras);

  //se agregan los estilos de jquery
  tabla_test.getTabla().classList.add('bordered');
  tabla_test.getBotonAdd().classList.add('ui-button', 'ui-widget', 'ui-corner-all', 'ui-state-hover');
  tabla_test.getBotonGuardar().classList.add('ui-button', 'ui-widget', 'ui-corner-all', 'ui-state-hover');

  //se agregan los objetos fuera de la tabla para guardarlos en la BD
  var descripcion = {
    objt:document.getElementById('pruebaInput'),
    validacion: ['vacio']
  }  
  tabla_test.setObjto_Externo(descripcion);

  //forzando el display none
  document.getElementById('RC_concepto_t').style.display='block';
 