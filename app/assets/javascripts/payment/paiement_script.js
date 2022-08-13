<!--
var cpt=0;
var forceClose = false;


function uneseulefois(strMsg){
    if ((typeof cpt) != "number")
        return true;

    if(!strMsg){
        strMsg = "Traitement déjà en cours, veuillez patienter.";
    }

    if (cpt <= 0) {cpt=1; return true;}

    alert(strMsg);
    cpt++;
    return false;
}

function imprime(strMsgImpressionImpossible){
    if(!strMsgImpressionImpossible) {
        strMsgImpressionImpossible = "Impression impossible.";
    }

    if (window.print) {window.print();}
    else if (self.print) {self.print();}
    else alert(strMsgImpressionImpossible);
}

function is_cvx_ok(controler_cvv)
{

    pattern = /\s/
    card = ""
    numlist = document.Cyb.Ecom_Payment_Card_Number.value.split (pattern)
    for ( i = 0; i < numlist.length; i++)
        card = card + numlist[i]

    if (document.Cyb.Ecom_Payment_Card_Verification.value.length == 0 && controler_cvv == 'submit')
    {
        document.Cyb.choix_cvx[0].checked = true;
        controler_cvv = 'oui';
    }


    if (document.Cyb.Ecom_Payment_Card_Verification.value.length > 0)
    {
        document.Cyb.choix_cvx[1].checked=true
        return (true);
    }
    else
    {
        if ( (card != "" && card.substring(0,2)!='37') && (card.substring(0,2)!='34') && (card.substring(0,4)!='0000') && (card.substring(0,4)!='0200') && (controler_cvv == 'oui'))
        {
            if (document.Cyb.choix_cvx[0].checked == true)
            {
                document.Cyb.choix_cvx[1].checked=true
                // On passe maintenant par aide_cryptogramme.cgi.
                //crypto = window.open('cryptogramme.html','','scrollbars=no,innerWidth=420,width=420,innerHeight=580,height=580,resizable=yes,screenX=50,screenY=50')
                //crypto.moveTo(50,50)
                return (false);
            }
            else
                return (true);
        }
        else
        {
            document.Cyb.choix_cvx[0].checked=true
            return (true);
        }
    }
}
function tabAuto(evt, zone, taille, nextzone)
{	var thekey;
	if (document.layers) { return; }
	thekey = (evt.keyCode)? evt.keyCode: evt.which;
	// Tabulation : on ne fait rien
	if (!isNaN(thekey) && thekey > 46 && zone.value.length == taille)
	{	nextzone.focus(); }
}

function OnLoad3DS()
{
    childwin = window.open('about:blank','popupName','height=400,width=390,status=yes,dependent=no,scrollbars=yes,resizable=no');
    document.downloadForm.target = 'popupName';
    document.downloadForm.submit();
}

function waitAndSubmit(delay, strMsgPart1, strMsgPart2)
{
    if(!strMsgPart1) {
        strMsgPart1 = "Vous allez être redirigé dans ";
    }
    if(!strMsgPart2) {
        strMsgPart2 = " secondes.";
    }
    //setTimeout(alert("Vous allez être redirigé dans " + temps/1000 + " secondes."),delay);
    setTimeout(alert(strMsgPart1 + temps/1000 + strMsgPart2), delay);
}

function onLoadEvent()
{
   if (document.Cyb)
   {
       document.Cyb.reset();
       if (document.Cyb.is_javascript_enabled != null)
           document.Cyb.is_javascript_enabled.value = 1;
   }
}

function fill3DSv2()
{
    if (document.Cyb && document.Cyb.jsInfo)
    {
       var infos3DS = {};
       infos3DS.tdsUuid = "";
       infos3DS.navigator = {};
       infos3DS.navigator.javaEnable = navigator.javaEnabled();
       infos3DS.navigator.javaLanguage = navigator.language;
       infos3DS.TZ = (new Date()).getTimezoneOffset();
       infos3DS.screen = {};
       infos3DS.screen.colorDepth = screen.colorDepth;
       infos3DS.screen.height = screen.height;
       infos3DS.screen.width = screen.width;

        document.Cyb.jsInfo.value = btoa(JSON.stringify(infos3DS));
   }
}

function onUnloadEvent()
{
    if (document.Cyb)
    {
        document.Cyb.reset();
    }
    cpt=0;
}

function verification_commande(lgue)
{
    if (document.recapitulatif.commande.checked == true)
    {
        document.Cyb.bouton.disabled=false;
        return true;
    }
    else {
        if (lgue == 'FR') {
            alert('Vous devez confirmer les informations de votre commande.');
        } else if (lgue == 'EN') {
            alert('Confirm the informations relating to the order.');
        } else {
            alert('Vous devez confirmer les informations de votre commande.');
        }
        document.Cyb.bouton.disabled=true;
        return false;
    }
}

function etat_bouton()
{
    if (document.recapitulatif.commande.checked == true) {
            document.Cyb.bouton.disabled=false;
    } else {
            document.Cyb.bouton.disabled=true;
    }

}

function retour_commercant ()
{
    if (document.links.length != 0)
        setTimeout ("window.location=document.links[0];",3000);
}

function replaceOpener(r)
{
    var i=0;
    if (r) {
        if (window.opener && !window.opener.closed) {
            for (i=0;i<document.links.length;i++) {
                if (document.links[i].name=="retourcomm") {

		    try {
                    	window.opener.location.replace(document.links[i].href);
			window.opener.blur();
			}
		    catch (error) {
			window.opener.parent.location.replace(document.links[i].href);
			window.opener.parent.blur();
			}

                    self.focus();
                    return true;
                }
            }
            return true;
        }
        else {
            for (i=0;i<document.links.length;i++) {
                if (document.links[i].name=="retourcomm") {
                    setTimeout ("window.location=\""+ document.links[i]+ "\";",20000);
                    return true;
                }
            }
            return true;
        }
    }
    return false;
}

function exitWindow(fc, el)
{
   if (fc)
   {
        if (window.opener && !window.opener.closed)
        {
            if (el.name == "nretourcomm")
            {
                window.opener.location.replace(el.href);
                self.close();
            }
            else
                window.opener.focus(); self.close();
        }
    }
    return true;
}

function exitNotOK(r, el)
{
    if (r){
        if (window.opener && !window.opener.closed) {
            window.opener.location.replace(el.href);
            el.href="javascript:self.close()";
            window.opener.focus(); self.close();
        }
    }
    return true;
}


 //-->
