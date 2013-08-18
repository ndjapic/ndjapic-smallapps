// setStat("gama.js")
var LMIN = 2 // realan broj veci od 1
var LMAX = 4 // realan broj bar za 1 veci od prethodnog
with(Math){
 var EINV = 1/E
 var LOGPI2 = log(PI)/2
}
function gamaIzvod(lambda,x){
 with(Math) return pow(x, lambda-1) * exp(-x)
}
function gamaSmena(lambda,x){
 return Math.exp(-x/lambda)
}
function gamaPodintegralna(lambda){
 var f = new Function("x",
  "return x>0 ? "+lambda+
  " * Math.pow("+(-lambda)+
  " * x * Math.log(x), "+(lambda-1)+
  ") : 0"
 )  
// alert("f="+f)
 return f
}
function gamaF(lambda,x,preciznost){
 var lambda2 = 2*lambda
 var f = gamaPodintegralna(lambda)
 if(lambda==0){
  alert("(Nekompletna) Gama funkcija nije definisana")
  return NaN
 }else if(lambda<LMIN){
  return (
   gamaF(
    lambda+1,
    Math.pow(x,lambda/(lambda+1)),
    preciznost*Math.abs(lambda)
   ) + gamaf1(lambda,lambda,x)
  ) / lambda
 }else if(lambda>LMAX){
  return (lambda-1) * gamaF(
   lambda-1,
   Math.pow(x,lambda/(lambda-1)),
   preciznost/Math.abs(lambda-1)
  ) - x * gamaf1(lambda,lambda-1,x)
 }else if(x>=EINV){
  return integral(f, new Interval(x,1), preciznost)
 }else if(jeCeo(lambda2)){
  return Math.exp(logGama(lambda)) -
  integral(f, new Interval(0,x) ,preciznost)
 }else{
  return gamaF(lambda,EINV,preciznost/2) +
  integral(f, new Interval(x,EINV) ,preciznost/2)
 }
}
function logGama(lambda){
// setStat("Pozvana je logGama("+lambda+")")
 if(lambda>1){
  var n = Math.round(lambda/2)
  setStat("n="+n)
  return logGama(n) + logGama(lambda-n) - Math.log(beta(n,lambda-n))
 }else if(jednako(lambda,1)){
  return 0
 }else if(jednako(lambda,POLA)){
  return LOGPI2
 }else{
  setStat(
   "Gama funkcija je pozvana sa argumentom lambda = "+lambda+
   "tako da 2*lambda nije ceo broj."+
   "Kod funkcija koje se koriste u statistici to se redje desava."
  )
  return Math.log(gamaF(lambda,0,preciznost))
//  return NaN
 }
}
function gamaNekompletna(lambda,x,preciznost){
 var n = Math.ceil(lambda-1)
 if(!jeCeo(lambda)) n -= 2
 var zbir = 0
 if(x<=0){
  return 0
 }else if(n>0){
// lambda je preveliko, treba smanjiti da bi se podintegralna funkcija mogla brze racunati
  var sabirak = gamaIzvod(lambda,x)
  var koeficijent = 1
  for(var k = 0; k<n; k++){
   zbir += sabirak
   sabirak *= (lambda-1-k)/x
   koeficijent *= lambda-1-k
  }
  return gamaNekompletna(lambda-n,x,preciznost/koeficijent) * koeficijent - zbir
 }else if(n<0){
// lambda je premalo, treba povecati da integral ne bi imao nesvojstvenosti
  var sabirak = gamaIzvod(lambda,x)
  var koeficijent = 1
  for(var k = 0; k<-n; k++){
   koeficijent *= lambda+k
   sabirak *= x/(lambda+k)
   zbir += sabirak
  }
  return gamaNekompletna(lambda-n,x,preciznost*koeficijent) / koeficijent + zbir
 }else if(jednako(lambda,1)){
  return 1 - Math.exp(-x)
 }else{
  return gamaF(lambda,gamaSmena(lambda,x),preciznost)
 }
}
function gamaRegularizovanaIzvod(lambda,x){
// alert("Pozvana je gamaRegularizovana("+lambda+","+x+")")
 if(x<=0){return 0}else{
  return Math.exp(
   (lambda-1) * Math.log(x) - x - logGama(lambda)
  )
 }
}
function gamaRegularizovana(lambda,x,preciznost){
 if(lambda>1){
  return gamaRegularizovana(lambda-1,x,preciznost) - gamaRegularizovanaIzvod(lambda,x)
 }else{
  return gamaNekompletna(lambda,x,preciznost) / Math.exp(logGama(lambda))
 }
}
