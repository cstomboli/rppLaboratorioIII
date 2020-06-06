var http = new XMLHttpRequest();
var loading;
var contenedor;
var trPadre;
var idObtenido;

window.onload = function()
{
    loading = document.getElementById("loading");
    contenedor = document.getElementById("form");
    contenedor.hidden=true;
    //loading.hidden=true;

    peticion('GET', "http://localhost:3000/autos", callback);

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.onclick = function()
    {
        contenedor.hidden = true;
    }


    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.onclick = function()
    {
        contenedor.hidden = false;
    }

    var btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.onclick = function()
    {
        if(chequearDatos())
        {
            peticion('POST', "http://localhost:3000/nuevoAuto", callbackAgregar);
        }
    }
    

    


}

function peticion(metodo, url, funcion)
{
    if(http.onreadystatechange = funcion)
    {
        http.open(metodo, url);
        loading.hidden = false;
        contenedor.hidden=true;

        if(metodo == 'GET')
        {
            http.send();
        }
        else if (metodo == 'POST')
        {            
            var data;
            http.setRequestHeader("Content-Type","application/json");
            if(url == "http://localhost:3000/eliminar")
            {
                data = {id:idObtenido};
            }
            else if(url == "http://localhost:3000/nuevoAuto")
            {
                data = {"id": idObtenido, "make":document.getElementById("marca").value,
                 "model": document.getElementById("modelo").value,  
                 "year": document.getElementById("año").value};
            }
            http.send(JSON.stringify(data)); 
        }
    }
}

function callback()
{
    if(http.status == 200 && http.readyState ==4)
    {
        cargarGrilla (JSON.parse(http.responseText));
        loading.hidden = true;
    }
}

function callbackAgregar()
{
    if(http.status == 200 && http.readyState ==4)
    {
        agregar (JSON.parse(http.responseText));
        loading.hidden = true;
    }
}

function agregar(auto)
{
    var tabla = document.getElementById("table");
    
        var tr= document.createElement("tr");
        
        var tdId= document.createElement("td");
        var txt=document.createTextNode(auto.id);
        tdId.appendChild(txt);
        tr.appendChild(tdId);
        tdId.hidden=true;
       
        var tdNa= document.createElement("td");
        var txt=document.createTextNode(auto.make);
        //console.log(txt);
        tdNa.appendChild(txt);
        tr.appendChild(tdNa);

        var tdAp= document.createElement("td");
        var txt=document.createTextNode(auto.model);
        tdAp.appendChild(txt);
        tr.appendChild(tdAp);

        var tdAño = document.createElement("td");
        var select = document.createElement("select");        
        tdAño.appendChild(select);
        for (var j = 1967; j<=2020; j++)
        {
            var opcion = document.createElement("option");
            opcion.text =j;
            select.add(opcion);
            
            if (opcion.text == auto.year)
            {
                opcion.selected=true;
            }
        }        
        tr.appendChild(tdAño);
        select.addEventListener("change", cambioAño);



        tabla.appendChild(tr);   

}





function callbackEditar()
{
    if(http.status == 200 && http.readyState ==4)
    {
        if( (JSON.parse(http.responseText)).type == "ok" )
        {
            modificar();
        } 
        else
        {
            alert("No se ha podido modificar.");
        } 
        loading.hidden = true;
    }

}

function cargarGrilla(materias)
{
    var tabla = document.getElementById("table");

    for(var i=0; i<materias.length; i++)
    {
        var tr = document.createElement("tr");

        var tdId= document.createElement("td");
        var text = document.createTextNode(materias[i].id);
        tdId.appendChild(text);
        tr.appendChild(tdId);
        tdId.hidden=true;

        var tdId= document.createElement("td");
        var text = document.createTextNode(materias[i].make);
        tdId.appendChild(text);
        tr.appendChild(tdId);

        var td= document.createElement("td");
        var text = document.createTextNode(materias[i].model);
        td.appendChild(text);
        tr.appendChild(td);

        var tdAño = document.createElement("td");
        var select = document.createElement("select");
        
        tdAño.appendChild(select);
        for (var j = 1967; j<=2020; j++)
        {
            var opcion = document.createElement("option");
            opcion.text =j;
            select.add(opcion);
            
            if (opcion.text == materias[i].year)
            {
                opcion.selected=true;
            }
        }
        
        tr.appendChild(tdAño);

        select.addEventListener("change", cambioAño);
        tabla.appendChild(tr);
    }
}

function cambioAño()
{
    contenedor.hidden = false;

}

function modificar()
{
    var hijo = trPadre.childNodes;

    hijo[1].textContent = document.getElementById("nombre").value;
    hijo[2].textContent = document.getElementById("cuatrimestre").value;

    var fecha= (document.getElementById("fecha").value).split('-');
    var fechaCorrecta= fecha[2]+'/'+fecha[1]+'/'+fecha[0];
    hijo [3].textContent=  fechaCorrecta;
    
    //hijo[3].textContent = document.getElementById("fecha").value;

    if((document.getElementById("turMa").checked))
    {
        hijo[4].textContent = document.getElementById("turMa").value;
    }
    else if((hijo[4].textContent) == "Noche")
    {
        document.getElementById("turNo").checked =true;
    } 


}

function clickGrilla(click)
{
    contenedor.hidden = false;
    trPadre = click.target.parentNode;
    var hijo = trPadre.childNodes;

    idObtenido = hijo[0].textContent;
    document.getElementById("nombre").value = hijo[1].textContent;
    document.getElementById("cuatrimestre").value =hijo[2].textContent; 
    document.getElementById("cuatrimestre").disabled=true;

    var fecha= (hijo [3].textContent).split('/');
    var fechaCorrecta= fecha[2]+'-'+fecha[1]+'-'+fecha[0];
    document.getElementById("fecha").value = fechaCorrecta;

    if((hijo[4].textContent) == "Mañana")
    {
        document.getElementById("turMa").checked =true;

    }
    else if((hijo[4].textContent) == "Noche")
    {
        document.getElementById("turNo").checked =true;
    }    
}

function chequearDatos()
{
    var marca= document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var retorno =false;
    if(marca.length>3) 
    {
        if(modelo.length>3)
        {
            retorno=true;
        }
        else
        {
            alert("El nombre del modelo debe tener mas de 3 letras"); 
            document.getElementById("modelo").className ="classError";
        }                  
    }
    else
    {
        alert("El nombre de la marca debe tener mas de 3 letras"); 
        document.getElementById("marca").className ="classError";
    }
    return retorno;
}