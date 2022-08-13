function Display(page)
{
var largeur=700;
var hauteur=500;
//var top=(screen.height-hauteur)/2;
//var left=(screen.width-largeur)/2;
var top=0;
var left=0;
//var options='menubar=no,scrollbars=no,statusbar=no' ;
var options='menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes';
wdw = window.open(page,'aide',"top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
wdw.focus();
}
function OnEventDisplay(page,id,largeur,hauteur,top,left)
{
var options='menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes';
wdw = window.open(page,id,"top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
wdw.focus();
return false;
}

function OnEventDisplayOptions(page,id,largeur,hauteur,top,left,options)
{
wdw = window.open(page,id,"top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
wdw.focus();
return false;
}

function OnEventDisplayNew(page)
{
return OnEventDisplay(page,"",650,600,0,0)
}
function OnEventDisplayHelp(page,appli)
{
return OnEventDisplay(page,appli+"aide",500,600,0,0)
}

function setFontSize(niv)
{
		document.body.className = (niv == 0)?  "": "fontsize" + niv;
}
function addFav(surl,snom)
{
	if (navigator.appName != 'Microsoft Internet Explorer')
	{	window.sidebar.addPanel(surl,snom,"");
	}
	else
	{ window.external.AddFavorite(surl,snom);
	}
}
function setIFrameHeight()
{
	var h = 0;
	if ( !document.all ) {
		h = document.getElementById('ifrm').contentDocument.height;
		document.getElementById('ifrm').style.height = h + 60 + 'px';
	}
	else if( document.all ) {
		h = document.frames('ifrm').document.body.scrollHeight;
		document.all.ifrm.style.height = h + 20 + 'px';
	}
}
function setItemSel(oli)
{
	var lli1 = document.getElementById("a_menuappli").getElementsByTagName("LI");
 	var i;
 	for (i=0; i<lli1.length; i++)
 		lli1[i].className = lli1[i].className.replace (/\s*sel/g, "");
	oli.className += " sel";
	if (oli.parentNode.parentNode.nodeid == "LI") oli.parentNode.parentNode.className += " sel";
}

// Nouvelle gestion plier/déplier juillet 2006 PP
//================================================
var wlib_pid = "";

function wlib_createCookie(nom,contenu,jours) {
	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + jours*24*3600*1000);
	document.cookie = wlib_pid + nom + "=" + escape(contenu)
		 + ";expires=" + expireDate.toGMTString();
}
function wlib_readCookie(nom) {
	var deb,fin,nomcpl;
	nomcpl = wlib_pid + nom;
	deb = document.cookie.indexOf(nomcpl + "=");
	if (deb >= 0) {
		deb += nomcpl.length + 1;
		fin = document.cookie.indexOf(";",deb);
		if (fin < 0) fin = document.cookie.length;
		return unescape(document.cookie.substring(deb,fin));
	}
	return "";
}
function wlib_deleteCookie(nom) { wlib_createCookie(nom,"",-1); }

function wlib_getNodeId(node)
{
	var nodeid;
	if (node.tagName == "INPUT" && node.getAttribute("type") == "radio")
		nodeid = (document.all)? node.name : node.getAttribute("name");
	else
		nodeid = (document.all)? node.id : node.getAttribute("id");
	return nodeid;
}
function wlib_swapDisplayInit(node)
{	var cook;
	var nodeid = wlib_getNodeId(node);
	
	if (node.tagName == "A" && nodeid != "blocmsgerrdet" && (node.className == "afficher" || node.className == "masquer"))
	{	cook = wlib_readCookie('gdd'+nodeid);
		if (cook && (cook == "0" && node.className == "masquer") || (cook == "1" && node.className == "afficher"))
		{	wlib_swapDisplay(node);
		}
	}
	for (var i = 0; i < node.childNodes.length; i++)
		if (node.childNodes[i].tagName) wlib_swapDisplayInit(node.childNodes[i]);
}	
function wlib_swapDisplay(node)
{	
	var nodeid = wlib_getNodeId(node);
	var disp;

	if (node.className == "afficher")
	{	if (nodeid != "blocmsgerrdet") wlib_createCookie('gdd'+nodeid, "1", 1);
		node.setAttribute('title', "Masquer");
		node.className = "masquer";
		disp = 'block';
	}
	else
	{	if (nodeid != "blocmsgerrdet") wlib_createCookie('gdd'+nodeid, "0", 1);
		node.setAttribute('title', "Afficher");
		node.className = "afficher";
		disp = 'none';
	}
	//alert(document.cookie);
	wlib_swapDisplayElements(document.body, node, disp);
}

function wlib_show(node)
{	
	var nodeid = wlib_getNodeId(node);

	if (node.className == "afficher")
	{	if (nodeid != "blocmsgerrdet") wlib_createCookie('gdd'+nodeid, "1", 1);
		node.setAttribute('title', "Masquer");
		node.className = "masquer";
		wlib_swapDisplayElements(document.body, node, 'block');
	}
}
function wlib_swapDisplayElements(node, obj, disp)
{	
	var nodeid = (document.all)? node.id : node.getAttribute("id");
	var objid = wlib_getNodeId(obj);
	var inlineTags = " SPAN A ABBR ACRONYM EM STRONG ";
	
	if (node != obj && nodeid && nodeid.indexOf(objid)==0)
	{	if (node.tagName != "A" && node.tagName != "INPUT" && node.tagName != "SELECT")
		{	if (disp=="none")
				node.style.display = "none";
			else if (inlineTags.indexOf(' '+node.tagName+' ') != -1)
				node.style.display = "inline";
			else if (document.all)
				node.style.display = "block";
			else if (node.tagName == "TABLE")
				node.style.display = "table";
			else if (node.tagName == "TH" || node.tagName == "TD")
				node.style.display = "table-cell";
			else if (node.tagName == "TR")
				node.style.display = "table-row";
			else
				node.style.display = "block";
		}
		//alert(disp+"/"+objid+"/<"+node.tagName+" class="+node.className+" name="+nodeid+">");
		if (disp=="none" && node.className=="masquer")
		{	node.className = "afficher";
			node.setAttribute('title', "Afficher");
			if (nodeid != "blocmsgerrdet") wlib_createCookie('gdd'+nodeid, "0", 1);
		}
		else if (disp!="none" && node.className=="afficher")
		{	node.className = "masquer";
			node.setAttribute('title', "Masquer");
			if (nodeid != "blocmsgerrdet") wlib_createCookie('gdd'+nodeid, "1", 1);
		}
	}
	for (var i = 0; i < node.childNodes.length; i++)
		if (node.childNodes[i].tagName) wlib_swapDisplayElements(node.childNodes[i], obj, disp);
}
function wlib_hideAll(node)
{		
	wlib_swapDisplayElements(document.body, node, "none");
}
function wlib_showAll(node)
{		
	wlib_swapDisplayElements(document.body, node, "all");
}
// Gestion des appels http - PP sept 2006
var wlib_http = null;
var wlib_httpMethod = "GET";
var wlib_httpUrl = "";
// Initialisation sur body onload
function wlib_httpInit(method, url)
{
	var xmlhttp = null;
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else if(window.ActiveXObject)
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	if (wlib_httpMethod=="GET" || wlib_httpMethod=="POST") wlib_httpMethod = method;
	wlib_httpUrl = url;
	wlib_http = xmlhttp;
	return (xmlhttp != null);
}
// Ouverture d'une requête
function wlib_httpOpenToSend(data)
{
	var urlpar = wlib_httpUrl;

	if (!wlib_http) return false;
	if(wlib_httpMethod == "GET" && data != null && data != "") urlpar = urlpar+"?"+data;
	if(wlib_httpMethod == "GET") data = null;
	wlib_http.open(wlib_httpMethod, urlpar, true); //ouverture asynchrone
	wlib_http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	return true;
}
// Retour d'une requête = code html inséré dans une balise ciblée par son id
function wlib_httpRefreshHtml(id, idsrc, valsrc)
{
	var ohtml = document.getElementById(id);
	var data;

	if (!ohtml || !wlib_http) return false;
	ohtml.innerHTML = "Veuillez patienter ...";
	
	data = "idsrc=" + idsrc + "&valsrc=" + valsrc;
	if (!wlib_httpOpenToSend(data)) return false;
	wlib_http.onreadystatechange = function() {
		if (wlib_http.readyState == 4)
		{ //alert(http.status);
			if (wlib_http.status == 200)
			{ //alert(http.responseText);
				document.getElementById(id).innerHTML = wlib_http.responseText;
			}
			else
			{	ohtml.innerHTML = "Problème technique !";
				return false;
			}
		}
	}
	wlib_http.send(data);
	return true;
}
// Sur body onload, pour indiquer si la page utilise des afficher/masquer et/ou des appels http async
function wlib_initDisplays(pid,method,url)
{
	if (pid && pid != "")
	{	wlib_pid = pid;
		wlib_swapDisplayInit(document.body);
	}
	if (method && method == "GET" || method == "POST") wlib_httpInit(method,url);
	return true;
}

/* Effacement automatique des champs de saisie */
function auto_fill(o, i){
 if(i){
  if(o.refv==null)
   o.refv = o.value;
  if(o.value==o.refv)
   o.value='';
   o.select();
 }
 else{
  if(o.value=='')
   o.value=o.refv;
 }
}

var numberOfFrames=-200;
function esd1_displayWait(idDiv,msg1,msg2){
    var divPatience=document.createElement("div");
    divPatience.className="blocpatience2";
    divPatience.innerHTML="<p>"+msg1+"</p><div class=\"blocprogression\" style=\"overflow:hidden\"><div style=\"height:100%;width:100%;margin-left:-200px;\" id=\"await\">      </div></div>";
    if (msg2!=null){divPatience.innerHTML=divPatience.innerHTML+"<p>"+msg2+"</p>"}
    var divParent=document.getElementById(idDiv);
    if (divParent!=null){
        divParent.style.position="relative";
        divParent.appendChild(divPatience);
        setInterval(esd1_displayWaitAnim, 100);
    }
}
function esd1_displayWaitAnim(){
    document.getElementById("await").style.marginLeft=numberOfFrames+"px";
    if (numberOfFrames==200){
        document.getElementById("await").style.marginLeft="-200px";
        numberOfFrames=-200
    }else{numberOfFrames+=10;}
}