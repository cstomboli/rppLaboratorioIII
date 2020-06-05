var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var personas = [{
  "id": 1,
  "make": "BMW",
  "model": "7 Series",
  "year": 2000
}, {
  "id": 2,
  "make": "Mazda",
  "model": "B-Series",
  "year": 2001
}, {
  "id": 3,
  "make": "Mitsubishi",
  "model": "Galant",
  "year": 1996
}, {
  "id": 4,
  "make": "Jensen",
  "model": "Interceptor",
  "year": 1967
}, {
  "id": 5,
  "make": "Ford",
  "model": "F250",
  "year": 2007
}, {
  "id": 6,
  "make": "Subaru",
  "model": "Baja",
  "year": 2006
}, {
  "id": 7,
  "make": "Volkswagen",
  "model": "Eos",
  "year": 2012
}, {
  "id": 8,
  "make": "Dodge",
  "model": "Neon",
  "year": 1995
}, {
  "id": 9,
  "make": "Dodge",
  "model": "Caliber",
  "year": 2011
}, {
  "id": 10,
  "make": "Chevrolet",
  "model": "Silverado 1500",
  "year": 2011
}, {
  "id": 11,
  "make": "Toyota",
  "model": "Camry",
  "year": 2004
}];
var id =11;



app.get("/autos",function(req,res){
   
 res.send(personas);    

        return;
   
   
    
});


app.post("/nuevoAuto",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.make!= undefined&&req.body.make!= "") &&(req.body.model!= undefined&&req.body.model!= "") 
			&&  (req.body.year!= undefined&&req.body.year!= "") ){
	
			id = id +1;
       
			
			var data = {"id":id,"make":req.body.make,"model":req.body.model,"year":req.body.year};
				personas.push(data);
            
        res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editarYear",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.year!= undefined&&req.body.year!= "")){
	

        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].year=req.body.year;
						
							res.send({'type': 'ok'});    
						console.log("edito");
							return;
					}
				}
		
        }
						console.log("error");
        res.send({'type': 'error'});
    },2000);
    
});
app.post("/eliminar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});
app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});




app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});