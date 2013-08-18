function betaIzvod(p,q,x){
// Ovde su eksponenti p i q povecani za po 1
 with(Math) return pow(x,p)*pow(1-x,q)
}
function betaIntegral(p,q,x,y,preciznost){
 if(POLA<=x){
  return betaIntegral(q,p,1-y,1-x,preciznost)
 }else if(POLA<y){
  return betaIntegral(p,q,  x,POLA,preciznost/2) +
         betaIntegral(q,p,1-y,POLA,preciznost/2)
 }else{
  var f = new Function("x",
   "with(Math) return pow(1 - pow(x, "+1/p+"), "+(q-1)+")"
  )
  return integral(
   f, new Interval(
    Math.pow(x,p),
    Math.pow(y,p)
   ), preciznost * p
  ) / p
 }
}
function betaNekompletna(p,q,x){
 if(
  !(
    jeCeo(  p) || jeCeo(  q) ||
   (jeCeo(2*p) && jeCeo(2*q))
  )
 ){
/*
  alert(
   "Beta funkcija je pozvana sa parametrima"+crlf+
   "(p,q)=("+p+","+q+")"+crlf+
   "tako da 2p ili 2q nije prirodan broj."
  )
*/
  var k = (p+q)/p*(p+q+1)/q
  with(Math) return k*betaIntegral(p+1,q+1,0,x,preciznost/k) +
  ((1-x)/p-x/q) * betaIzvod(p,q,x)
 }else if(q>1){
  with(Math) return (
   (q-1)*betaNekompletna(p,q-1,x) + betaIzvod(p,q-1,x)
  )/(p+q-1)
 }else if(p>q){return betaNekompletna(q,p,1) - betaNekompletna(q,p,1-x)}else
 if(jednako(q,1)){return Math.pow(x,p)/p}else
 if(jednako(q,POLA) && jednako(p,q)){with(Math) return 2*asin(sqrt(x))}else
 alert("Greska u betaNekompletna.")
}
function beta(p,q){
 return betaNekompletna(p,q,1)
}
function betaRegularizovana(p,q,x){
 if(x<=0) return 0
 var a = betaNekompletna(p,q,x) 
 var b = betaNekompletna(q,p,1-x) 
 return a/(a+b)
}
function betaRegularizovanaInverzna(p,q,y){
 var preciznost = 0.5e-10
 return 1 / (
  1 + inverzna(
   new Function("x",
    "return betaRegularizovana(" +
     p + ", " + q +
    ", 1/x-1)"
   ), y, preciznost
  )
 )
}
