function koren(f,x0,x2,preciznost){
 var y0 = f(x0)
 var y2 = f(x2)
/*
 setStatus(
  "Funkcija koren je pozvana sa argumentima"+
  crlf+"f  = "+f +
  crlf+"x0 = "+x0+
  crlf+"x2 = "+x2+
  crlf+"preciznost = "+preciznost+
  crlf+"Pri tom je dobijeno"+
  crlf+"y0 = "+y0+
  crlf+"y2 = "+y2
  )
*/
 if(y0*y2>0 || preciznost<=0){
 }else{
//  alert("Uspesan prolaz.")
  var x1 = (x0+x2)/2
  var y1 = f(x1)
  setStatus = "(x,y) = ("+x1+","+y1+")"
  if(x2-x0<preciznost) return x1
  if(y0*y1<=0){x2=x1;y2=y1}
  if(y1*y2<=0){x0=x1;y0=y1}
  if(y2-y0==0){
   alert("Nije postignuta trazena preciznost "+preciznost)
   return x1
  }
  var x1 = (x0*y2-x2*y0)/(y2-y0)
  var y1 = f(x1)
  if(y0*y1<=0){x2=x1;y2=y1}
  if(y1*y2<=0){x0=x1;y0=y1}
  return koren(f,x0,x2,preciznost)
 }
}
function inverzna(f,y,preciznost){
 return koren(
  new Function("x",
   "return ((x*(1-x)>0) ? "+f+"(x):(1-x))-"+(y)
  ),0,1,preciznost
 )
}