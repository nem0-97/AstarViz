
let g;
let cols = 50;
let rows = 50;
let w,l;
let cells=[];
let s,goal;//start and goal vertices
let path;//path
let cost;//cost of path

function setup(){
  createCanvas(innerWidth,innerHeight);
  w = Math.floor(innerWidth/cols);
  l = Math.floor(innerHeight/rows);
  for(let i = 0;i<cols;i++){
      let temp = [];
    for(let j = 0;j<rows;j++){
      let v=new Vertex(data=[i*w,l*j],edges=[],weights=[],key=i*rows+j);
      if(i>0){
        v.addEdge(cells[(i-1)*rows+j],1,dir=false);//above it
        if(j>0){
          v.addEdge(cells[(i-1)*rows+j-1],1,dir=false);//to left and above
        }
      }
      if(j>0){
        v.addEdge(cells[i*rows+j-1],1,dir=false);//to left
      }
      cells.push(v);//create a vertex containin x,y for top left of cell represented by vertex
    }
  }
  g=new Graph(cells);
  s=random(cells);
  goal=random(cells);
  path=g.aStar(s,goal);//can chane to use other alorithms from Graph class
  cost=path[1];
  path=path[0];
}
let start=true;
function mousePressed(){
  if(start){//set start vertex to one for cell clicked in
    let i=Math.floor(mouseX/w);
    let j=Math.floor(mouseY/l);
    s=cells[i*rows+j];
  }else{//set goal vertex to one for cell clicked in
    let i=Math.floor(mouseX/w);
    let j=Math.floor(mouseY/l);
    goal=cells[i*rows+j];
  }
  start=!start;
  path=g.aStar(s,goal);
  cost=path[1];
  path=path[0];
}
/*function keyPressed(){//set keys to choose what algorithm to use
//maybe also choose if to do a mst visualisation
}*/
function draw(){
  background(0);
  for(let i=0;i<cells.length;i++){//draw cells
    noStroke();
    fill(100,0,211);
    stroke(0);
    rect(cells[i].data[0],cells[i].data[1],w,l);
    line(cells[i].data[0],cells[i].data[1],cells[i].data[0]+w,cells[i].data[1]); //top
    line(cells[i].data[0],cells[i].data[1],cells[i].data[0],cells[i].data[1]+l); //left
    line(cells[i].data[0]+w,cells[i].data[1],cells[i].data[0]+w,cells[i].data[1]+l); //right
    line(cells[i].data[0],cells[i].data[1]+l,cells[i].data[0]+w,cells[i].data[1]+l); //bottom
  }
  for(let i=0;i<path.length;i++){//fill in path
    noStroke();
    fill(255-i/path.length*255,i/path.length*255,0);
    rect(path[i].data[0],path[i].data[1],w,l);
  }
  fill(255);//display cost of path(how many cells long not including start)
  textSize(32);
  text(cost,32,32);
  textAlign(CENTER);
  text("Click a cell to be the start, click another cell to be the destination",width/2,32);
}
