class TablaIncremental {
    constructor(id,fila,url){
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
      
    }
  
    
  
    /*------------------------------------------/
    /   GET y SET
    /------------------------------------------*/
    getTabla(){
      return document.getElementById(`${this.id}_tabla`);
    }
    getTHead(){
      return document.querySelector(`#${this.id}_tabla thead`);
    }
    getTBody(){
      return document.querySelector(`#${this.id}_tabla tbody`);
    }
    getBotonAdd(){
      return document.getElementById(`${this.id}_add`);
    }  
    getBotonGuardar(){
      return document.getElementById(`${this.id}_Guardar`);
    }  
    setFila(){
      var cadena = ``;
      var contador =0;
  
      for(var head in this.cabezeras){        
        var nombreC = this.cabezeras[head].replace(/ /g, "");
        var nombre = this.fila[contador].name;
        var input= this.fila[contador];
        var evento = input.evento!=null & input.evento!=''? input.evento:'';  
        var idInput = nombre+'_'+this.contador; 
        
        //Cuando se carguen los datos desde SetDatosTabla()
        var valor = this.valores_inputs[contador]!='' ||
         this.valores_inputs[contador]!=null? 
         this.valores_inputs[contador]:'';
        var valor = valor == null? '':valor;
        var estado = '';

  
        switch (input.tipo) {
          case 'text':
            cadena +=`
            <td class ="${this.id}_td">
              <input id="${idInput}" type="text" ${evento} class="${nombreC}" name="${nombre}" value="${valor}">
            </td>
          `;            
          break;

          case 'checkbox':
            estado = valor=='01' || valor =='1'? 'checked':'';
            cadena +=`
            <td class ="${this.id}_td">
              <input id="${idInput}" type="checkbox" ${evento}  class="${nombreC}" name="${nombre}" ${estado}>
            </td>
            `;
          break;

          case 'select':
            cadena +=`
            <td class ="${this.id}_td">
              <select id="${idInput}" ${evento}  class="${nombreC}" name="${nombre}">`;
              for(var op of input.opciones){
                estado = valor ==op?'selected':'';
                cadena += `<option value="${op}" ${estado}>${op}</opcion>`;
              }
              cadena +=`</td>`;            
          break;
        
          default:
            break;
        }
        this.contador++;
        contador++;      
      }
      //Se obtiene la cantida de filas para armar el id del boton eliminar      
      var noFila = document.querySelectorAll(`#${this.getTabla().id} tbody tr`);
      cadena += `
      <td>
      <input type="button" id="${this.id}_${noFila.length}" value="-" ${this.btoEliminar_addEvento} />
      </td>`;
      this.getTBody().insertRow(-1).innerHTML= cadena;   
  
      //Se le agrega evento al boton
      document.getElementById(`${this.id}_${noFila.length}`).addEventListener('click',(e)=>{
        this.deleteRow(e);
      })
    }
    setObjto_Externo(objt){
      this.objetos_externos.push(objt);
    }
    setIdRegistro(id){
      this.IdRegistro=id;
    }
    gettMSJ(){
      return document.querySelector(`#${this.id}_msj span`);
    }
    getcMSJ(){
      return document.querySelector(`#${this.id}_msj`);
    }
    setEventoBotonEliminar(evento){
      this.btoEliminar_addEvento=evento;
    }
    SetDatosTabla(datos){
      //se lee los datos para generar las filas
      var cont=0;
      for(var dato of datos){
        
        //Los datos de este for son la fila completa
        for(var nam in this.cabezeras){
          this.valores_inputs[cont]=dato['COL'+cont];
          cont++;
        }
        //console.log(this.valores_inputs); 
        this.setFila();
        cont= 0;        
      }
      this.valores_inputs = new Array();
    }
    
    /*------------------------------------------/
    /   FUNCIONES
    /------------------------------------------*/
    deleteRow(event){
      var btn = event.currentTarget;
      var row = btn.parentNode.parentNode;
      row.parentNode.removeChild(row);
  
    }
    PintarTabla(contenedor,cabezeras){
      this.contenedor = contenedor;
      this.cabezeras = cabezeras;
      this.Styles();
      //se agregan los estilos
     // contenedor.innerHTML=this.Styles();

      var cadena = ` 
      <div id='${this.id}' class="contenedor_tablaIncremental">
        <div class="bloqueBoton">
          <input type="button" id="${this.id}_add" value="+Opcion">        
        </div>
  
        <table id="${this.id}_tabla">
          <thead>
            
          </thead>  
          <tbody>
            
          </tbody>      
        </table>
        
        <div class="bloqueBoton">
          <input onclick= "onGuardar('${this.id}')"type="button" id="${this.id}_Guardar" value="Guardar">
        </div>
        <div class="${this.id}_msj ${this.id}_OFF" 
        id="${this.id}_msj"><span>test</span></div>
      </div>
      `;
      contenedor.innerHTML+= cadena;
      
      cadena ='<tr>';
      for(var head in cabezeras){
        var nombre = cabezeras[head].trim();
        cadena += `
          <th id="${this.id}_${nombre}">
            ${cabezeras[head]}
          </th>
        `;
      }
  
      this.getTHead().innerHTML=cadena+'<th></th></tr>';
      //Agregar listenes a agregar filas y guardar
      this.getBotonAdd().addEventListener('click',()=>{
        this.setFila()
      });
     // this.getBotonGuardar().addEventListener('click',onGuardar);
    }
    async Guardar(datos){
     //datos es un arreglo de json 
    
        var contador = 0;
        var listaInputs=[];
        var datos = datos;
    
        //Se obtiene todos los inputs
        for(var head in this.cabezeras){
          var nombre = this.cabezeras[head].replace(/ /g, "");
          var direccion = `#${this.id} .${nombre}`;
          listaInputs[contador]= document.querySelectorAll(direccion);
          contador++;
        }
       // console.log(listaInputs);
    
        //Se crea el data para POST
        datos.unshift({origen:'New'+this.id});
        var valor;
        var name;
        var contador =0;
        var json;
        var val = true;
        
        for(var inputs of listaInputs){

          for(var input of inputs){
            
            //revisamos el tipo para reglas especiales
            switch (input.type) {
              case 'text':
                valor = input.value;
                name = input.name; 
                if(valor ==''){
                  val=false;
                  this.ShowMSJ(true,`Llene todos los campos`,0);
                  this.ShowMSJ(false,``,2000);
                }                               
              break;

              case 'checkbox':
                valor = input.checked? true: false;
                name = input.name;  
              break;

              case 'select-one':
                valor = input.value;
                name = input.name;  
              break;
              
            
              default:
                break;
            }           
            json = JSON.parse(`{"${name}":"${valor}"}`);
            datos.push(json);
          }         
          
        }
        if(val){
          //Agregar objetos externos
          val = this.Guardar_objt_Externos(datos);
        }        
        if(val!=false){
          datos = val;
          json = JSON.parse(`{"id":"${this.IdRegistro}"}`);
          datos.push(json);

          var respuesta = await this.getPostjson_json(datos);
          return respuesta;
        } 
    }
    Guardar_objt_Externos(datos){
      var datos = datos;
      if(this.objetos_externos.length != 0){
        for(var ob of this.objetos_externos){
          var respuesta = this.Validaciones(ob);
          if(respuesta.estado){
            var json = JSON.parse(`{"${ob.objt.name}":"${ob.objt.value}"}`);
            datos.push(json);
          }else{
            //muestra mensaje de la validacion
            var msj=`El campo ${ob.objt.name} ${respuesta.msj}`;
            this.ShowMSJ(true,msj,0);            
            //Despues de x tiempo desaparese mensaje
            this.ShowMSJ(false,'',2000);
            return false;
          }
          
        }
      }
      return datos;      
    }
    Validaciones(ob){
      for(var val of ob.validacion){
        
        switch (val) {
          case 'vacio':
            var estado = ob.objt.value!='' & ob.objt.value!=null?true:false;
            var msj = estado?'':'no puede estar vacio';
            return {estado,msj};
          break;
        
          default:
            break;
        }
      }
    }
    ShowMSJ(estado,mensaje,tiempo){
      if(estado){
        this.gettMSJ().innerHTML=mensaje;
        this.getcMSJ().classList.remove(`${this.id}_OFF`);
      }else{
        setTimeout(() => {
          this.getcMSJ().classList.add(`${this.id}_OFF`);
        },tiempo);
      }
    }
    
    Styles(){
      
      var styles = `
      
        <style>
          #${this.id}_tabla{
            width: 100%;
            margin: 10px 0px;
          }
          #${this.id}_tabla td input{
            width: 100%;            
          }
          #${this.id}_tabla td select{
            width: 100%;            
          }
          .${this.id}_td{
            padding: 5px;
          }
          .${this.id}_msj {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: rgba(42,42,42,.7);
            top: 0;
            left: 0;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #${this.id}_msj span{
            width: 200px;
            height: 80px;
            background-color: rgba(240,240,240);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18;
            font-weight: bold;
            text-align: center;
          }

          .${this.id}_OFF {
            display:none;
          }
        </style>
           
      `;
      
      var head = document.querySelector('head');
      head.innerHTML+=styles;
    }
    /*------------------------------------------/
    /   FUNCIONES PARA CONECTAR 
    /------------------------------------------*/
  
    
    
      //retorna json
      async getPost_json(data){
        try {
          const consulta = await fetch(this.url,{
            method: 'POST',
            body: data });
          const respuesta = await consulta.json();
          return respuesta;
        }catch (e){
          const respuesta = null;
          return respuesta;
        }         
      }

      //retorna json sen json
      async getPostjson_json(data){
        try {
          const consulta = await fetch(this.url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          });
          const respuesta = await consulta.json();
          return respuesta;
        }catch (e){
          const respuesta = null;
          return respuesta;
        }         
      }
      
    //retorna text
      async  getPost_Text(data){
        const consulta = await fetch(this.url,{
          method: 'POST',
          body: data })
        const respuesta = await consulta.text();
        return respuesta;  
      } 
      //retorna text sen json
      async  getPostJson_Text(data){
        const consulta = await fetch(this.url,{
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
         })
        const respuesta = await consulta.text();
        return respuesta;  
      }       
  }

