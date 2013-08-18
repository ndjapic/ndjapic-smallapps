function srednjaVrednost(y0,y1,y2){ // po Simpsonu
 return (y0+4*y1+y2)/6
}
function integralR(f, interval, y0,y2,preciznost){
 var y1 = f(interval.sredina)
 if(Math.abs(y2-y0) * interval.sirina < preciznost){
  return srednjaVrednost(y0,y1,y2) * interval.sirina
 }else{
  var I1 = integralR(f, new Interval(interval.leviKraj, interval.sredina), y0,y1,preciznost/2)
  setStat("x = " + interval.sredina + ", y = " + y1)
  var I2 = integralR(f, new Interval(interval.sredina, interval.desniKraj), y1,y2,preciznost/2)
  return I1 +I2         
 }
}
function integral(f,interval,preciznost){
/*
 setStat(
  "Za "+a+" < x < "+b+
  " racunam povrsinu ispod krive "+f
 )
*/
 var y0 = f(interval.leviKraj)
 var y2 = f(interval.desniKraj)
 var P = integralR(f, interval, y0, y2, preciznost)
// setStat("Sa tacnoscu "+preciznost+" povrsina je "+P)
 return P
}
