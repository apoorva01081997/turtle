 var socket = io.connect('http://localhost:4000');
 var x=150;
 var y=150;
 var i=0;
 var n=0;
 var Xtr=0;
 var Ytr=0;
 var times=1;
 var id = "lineAB";
 var linedraw ="M "+x+" "+y+" ";
 var rot=0;
 var flag=0;

 var message = document.getElementById('tarea');
 //var message = document.getElementById('message');
  var recieve = document.getElementById('recieve');
var btn = document.getElementById('send');
btn.addEventListener('click', function(){
    socket.emit('commands', {
        message: message.value
    });
    message.value = "";
});



// Listen for events
socket.on('commands', function(data){

  for(m=0;m<times;m++)
  {
  var lines = data.message.split("\n");
  for(i=0;i<lines.length;i++)
  {
  var responseArray = lines[i].split(" ");
  if(responseArray[0]==='repeat')
  {
    flag=1;
  }
  else{
    flag=0;
  }
  console.log("run");
if(responseArray[0]==='move')
{
  n=n+1;
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  id="lineAB"+n;
  linedraw ="M "+x+" "+y+" ";
  console.log(id);
  newElement.setAttribute("d",linedraw);
  newElement.setAttribute("id",id);
  newElement.setAttribute("stroke-opacity","0");
  newElement.setAttribute("fill-opacity","0");
  newElement.setAttribute("stroke-width","3");
  svg.appendChild(newElement);
}

if(responseArray[0]==='draw')
{
  n=n+1;
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  id="lineAB"+n;
  linedraw ="M "+x+" "+y+" ";
  console.log(id);
  newElement.setAttribute("d",linedraw);
  newElement.setAttribute("id",id);
  newElement.setAttribute("stroke-opacity","1");
  newElement.setAttribute("fill-opacity","0");
  newElement.setAttribute("stroke-width","3");
  svg.appendChild(newElement);
  document.getElementById(id).setAttribute("stroke","red");
}

  if(responseArray[0]==='fd'){
    if(responseArray[2]!=undefined){
      colorchange(responseArray[2]);
    }
    var res = document.getElementById(id).getAttribute("d");
    var fd=parseInt(responseArray[1])*Math.sin((3.141592/180)*(90-rot));
    var fd1=parseInt(responseArray[1])*Math.cos((3.141592/180)*(90-rot));
    if(fd<0)
    document.getElementById(id).setAttribute("d",res+" l "+fd1+" "+-fd);
    else
    document.getElementById(id).setAttribute("d",res+" l "+fd1+" "+"-"+fd);
    var res = document.getElementById(id).getAttribute("d");
    console.log(res);
    //document.getElementById(id).setAttribute("transform","rotate("+rot+" 150 150)");
    //y=y-parseInt(responseArray[1]);
    y=y-fd;
    //x=x+0;
    x=x+fd1;
    Ytr=Ytr-fd;
    Xtr=Xtr+fd1;

    document.getElementById("turtle").setAttribute("transform","translate("+Xtr+","+Ytr+")"+""+"rotate("+rot+" 150 150)");
  }
  else if(responseArray[0]==='bk'){
    if(responseArray[2]!=undefined){
      colorchange(responseArray[2]);
    }
    var res = document.getElementById(id).getAttribute("d");
    var fd=parseInt(responseArray[1])*Math.sin((3.141592/180)*(90-rot));
    var fd1=parseInt(responseArray[1])*Math.cos((3.141592/180)*(90-rot));
    if(fd<0)
    document.getElementById(id).setAttribute("d",res+"l "+fd1+" "+fd);
    else
    document.getElementById(id).setAttribute("d",res+"l "+fd1+" "+"+"+fd);
    //document.getElementById(id).setAttribute("transform","rotate("+rot+" 250 250)");
    //y=y+parseInt(responseArray[1]);
    y=y+fd;
    //x=x+0;
    x=x+fd1;
    Ytr=Ytr+fd;
    Xtr=Xtr+fd1;
    document.getElementById("turtle").setAttribute("transform","translate("+Xtr+","+Ytr+")"+""+"rotate("+rot+" 150 150)");
  }
  else if(responseArray[0]==='lt'){
    if(responseArray[2]!=undefined){
      colorchange(responseArray[2]);
    }
        rot=rot+parseInt(-responseArray[1]);
        console.log(rot);
    document.getElementById("turtle").setAttribute("transform","translate("+Xtr+","+Ytr+")"+""+"rotate("+rot+" 150 150)");

  }
  else if(responseArray[0]==='rt'){
    if(responseArray[2]!=undefined){
      colorchange(responseArray[2]);
    }
    var res = document.getElementById(id).getAttribute("d");
      rot=rot+parseInt(responseArray[1]);
      console.log(rot);
      document.getElementById("turtle").setAttribute("transform","translate("+Xtr+","+Ytr+")"+""+"rotate("+rot+" 150 150)");
}

  }

  }
  if(flag==1)
  times=responseArray[1];
  else
  times=1;
});


function colorchange(colorR){
  document.getElementById("turtle").setAttribute("stroke",colorR);
  n=n+1;
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  id="lineAB"+n;
  linedraw ="M "+x+" "+y+" ";
  console.log(id);
  newElement.setAttribute("d",linedraw);
  newElement.setAttribute("id",id,"fill-opacity","0");
  newElement.setAttribute("stroke-opacity","1");
  newElement.setAttribute("fill-opacity","0");
  newElement.setAttribute("stroke-width","3");
  svg.appendChild(newElement);

  document.getElementById(id).setAttribute("stroke",colorR);

}
