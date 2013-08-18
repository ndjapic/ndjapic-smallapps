setStat("funkcije.js")
var crlf = "\r\n"
var preciznost = 0.5e-4
var POLA = 0.5

function jednako(x,y){return (Math.abs(x-y) < preciznost)}
function setNumber(obj,x){obj.value = x}
function getNumber(obj){return Number(obj.value)}
function setStat(s){window.status = s}
function square(x){return x*x}
function signum(x){return x<0?-1:1}
function jeCeo(x){return jednako(Math.round(x),x)}
function simetrizuj(x,y){
 if(x>0)return (1+y)/2
 else	return (1-y)/2
}

function Interval(a,b){
 this.leviKraj = a
 this.desniKraj = b
 this.sredina = (b+a)/2
 this.sirina = b-a
}

function faktorijel(n){
 var p = 1
 for(var i=n; i>0; i--) p *= i
 return p
// return gama(n+1,0.05)
}
function obradiFaktorijel(f){
 var n = getNumber(f.n)
 setNumber(f.p, faktorijel(n))
}

function obradiGama(f){
 var lambda = getNumber(f.lambda)
 var x      = getNumber(f.x)
 setNumber(f.gama, Math.exp(logGama(lambda)))
 setNumber(f.gamaNekompletna, gamaNekompletna(lambda,x,preciznost))
 setNumber(f.gamaRegularizovana, gamaRegularizovana(lambda,x,preciznost))
}

function binKoefRekurzivno(n,k){
 if(k>0){
  return Math.round((n/k)*binKoef(n-1,k-1))
 }else{
  return 1
 }
}
function binKoef(n,k){
// return 1/n/beta(n-k,k+1)
 if(k<0){
  return 0
 }else if(k>n){
  return 0
 }else{
  return binKoefRekurzivno(n,k)
 }
}
function obradiBinKoef(f){
 var n = Number(f.n.value)
 var k = Number(f.k.value)
 f.p.value = binKoef(n,k)
}

function obradiBeta(f){
 var p = getNumber(f.p)
 var q = getNumber(f.q)
 var x = getNumber(f.x)
 var y = getNumber(f.y)
 setNumber(f.beta, 1/beta(p,q))
 setNumber(f.betaNekompletna, 1/betaNekompletna(p,q,x))
 setNumber(f.betaRegularizovana, betaRegularizovana(p,q,x))
 setNumber(f.betaRegularizovanaInverzna, betaRegularizovanaInverzna(p,q,y))
}

function prikaziPaskalovTrougao(nmax){
 var s = "<html>"
 s += crlf+"<head>"
 s += crlf+"<link rel='stylesheet' href='stil.css' type='text/css' />"
 s += crlf+"</head>"
 s += crlf+"<body>"
 s += crlf+"<h3>Паскалов троугао</h3>"
 s += crlf+"<table border='1' align='center'>"
 s += crlf+"<tr>"
 for(var k=0; k<=nmax/2; k++){
  s += crlf+"<th>"+k+"</th>"
 }
 s += crlf+"</tr>"
 for(var n=0; n<=nmax; n++){
  s += crlf+"<tr align='right'>"
  for(k=0; k<=nmax/2; k++){
   if(k==1){
    s += crlf+"<th>"+binKoef(n,k)+"</th>"
   }else{
    s += crlf+"<td>"+(binKoef(n,k)||"")+"</td>"
   }
  }
  s += crlf+"</tr>"
 }
 s += crlf+"</table>"
 s += crlf+"</body>"
 s += crlf+"</html>"
 var Paskal=window.open()
 Paskal.document.writeln(s)
}

function binomnaRaspodela(n,p,k){
 return binKoef(n,k)
 * Math.pow(p,k)
 * Math.pow(1-p,n-k)
}
function binomnaRaspodelaKumulativno(n,p,k){
 var s = 0
 for(var i=0; i<=k; i++) s += binomnaRaspodela(n,p,i)
 return s
}
function obradiBinomnuRaspodelu(f){
 var n = Number(f.n.value)
 var p = Number(f.p.value)
 var k = Number(f.k.value)
 f.verovatnoca.value = binomnaRaspodela(n,p,k)
 f.kumulativno.value = binomnaRaspodelaKumulativno(n,p,k)
}

function hipergeometrijskaRaspodela(c,a,n,k){
 return binKoef(a,k)
 * binKoef(c-a,n-k)
 / binKoef(c,n)
}
function hipergeometrijskaRaspodelaKumulativno(c,a,n,k){
 var s = 0
 for(var i=0; i<=k; i++) s += hipergeometrijskaRaspodela(c,a,n,i)
 return s
}
function obradiHipergeometrijskuRaspodelu(f){
 var c = Number(f.c.value)
 var a = Number(f.a.value)
 var n = Number(f.n.value)
 var k = Number(f.k.value)
 f.verovatnoca.value = hipergeometrijskaRaspodela(c,a,n,k)
 f.kumulativno.value = hipergeometrijskaRaspodelaKumulativno(c,a,n,k)
}

function PuasonovaRaspodela(lambda,k){
 return Math.exp(-lambda)
 * Math.pow(lambda,k)
 / faktorijel(k)
}
function PuasonovaRaspodelaKumulativno(lambda,k){
 var s = 0
 for(var i=0; i<=k; i++) s += PuasonovaRaspodela(lambda,i)
 return s
}
function obradiPuasonovuRaspodelu(f){
 var lambda = Number(f.lambda.value)
 var k = Number(f.k.value)
 f.verovatnoca.value = PuasonovaRaspodela(lambda,k)
 f.kumulativno.value = PuasonovaRaspodelaKumulativno(lambda,k)
}

function geometrijskaRaspodela(p,k){
 return Math.pow(1-p,k-1) * p
}
function geometrijskaRaspodelaKumulativno(p,k){
 var s = 0
 for(var i=1; i<=k; i++) s += geometrijskaRaspodela(p,i)
 return s
}
function obradiGeometrijskuRaspodelu(f){
 var p = Number(f.p.value)
 var k = Number(f.k.value)
 f.verovatnoca.value = geometrijskaRaspodela(p,k)
 f.kumulativno.value = geometrijskaRaspodelaKumulativno(p,k)
}

function eksponencijalnaRaspodela(alfa,x){
 return (x<0) ? 0 : 1 - Math.exp(-alfa*x)
}
function gustinaEksponencijalneRaspodele(alfa,x){
 return (x<0) ? 0 : alfa * Math.exp(-alfa*x)
}
function obradiEksponencijalnuRaspodelu(f){
 var alfa = Number(f.alfa.value)
 var x = Number(f.x.value)
 f.pdf.value = gustinaEksponencijalneRaspodele(alfa,x)
 f.cdf.value = eksponencijalnaRaspodela(alfa,x)
}

function gustinaUniformneRaspodele(a,b,x){
 if(x<a) return 0
 else if(x>b) return 0
 else return 1/(b-a)
}
function uniformnaRaspodela(a,b,x){
 if(x<a) return 0
 else if(x>b) return 1
 else return (x-a)/(b-a)
}
function obradiUniformnuRaspodelu(f){
 var a = Number(f.a.value)
 var b = Number(f.b.value)
 var x = Number(f.x.value)
 f.pdf.value = gustinaUniformneRaspodele(a,b,x)
 f.cdf.value = uniformnaRaspodela(a,b,x)
}

function gustinaNormalneNormiraneRaspodele(z){
 with(Math) return exp(-z*z/2)/sqrt(2*PI)
}
function gustinaNormalneRaspodele(m,sigma,x){
 var z = (x-m)/sigma
 return gustinaNormalneNormiraneRaspodele((x-m)/sigma) / sigma
}
function povrsina(x,h,greska){
 var max = gustinaNormalneNormiraneRaspodele(x-h)
 var min = gustinaNormalneNormiraneRaspodele(x+h)
 var polaGreske = greska/2
 var h2 = h/2
 if((max-min)*h < polaGreske){
  var y = gustinaNormalneNormiraneRaspodele(x)
  return (max+4*y+min)/3*h
 }else{
  return povrsina(x-h2,h2,polaGreske) + povrsina(x+h2,h2,polaGreske)
 }
}
function erf(z,epsilon){
 return simetrizuj(z, gamaRegularizovana(1/2,z*z/2,epsilon*2)) - 0.5
}
function normalnaRaspodela(m,sigma,x,epsilon){
 var z = (x-m)/sigma
 return erf(z,epsilon) + 0.5
}
function obradiNormalnuRaspodelu(f){
 var m = Number(f.m.value)
 var sigma = Number(f.sigma.value)
 var x = Number(f.x.value)
 var epsilon = Number(f.epsilon.value)
 var z = (x-m)/sigma
 f.z.value = z
 f.pdf.value = gustinaNormalneRaspodele(m,sigma,x)
 f.cdf.value = normalnaRaspodela(m,sigma,x,epsilon)
}

function obradiChi2Raspodelu(f){
 var n = Number(f.n.value)
 var x = Number(f.x.value)
 var epsilon = Number(f.epsilon.value)
 f.pdf.value = Math.pow(x/2,n/2-1) * Math.exp(-x/2) / n //sigurno ne valja <---***
 f.cdf.value = gamaRegularizovana(n/2,x/2,epsilon)
}

function obradiFiserovuRaspodelu(f){
 var k = Number(f.k.value)
 var m = Number(f.m.value)
 var x = Number(f.x.value)
 f.pdf.value = Math.pow(x,k/2-1) * Math.pow(1+x,-(k+m)/2) / beta(k/2,m/2)
 f.cdf.value = betaRegularizovana(k/2,m/2,1-1/(x*k/m+1))
}

function obradiStudentovuRaspodelu(f){
 var m = Number(f.m.value)
 var x = Number(f.x.value)
 f.pdf.value = Math.pow(1+x*x/m,-(m+1)/2) / Math.sqrt(m) / beta(1/2,m/2)
 f.cdf.value = simetrizuj(x, betaRegularizovana(1/2,m/2,1-1/(x*x/m+1)))
}
