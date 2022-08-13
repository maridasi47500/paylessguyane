var schemeList = null;
var schemeSelected = null;
var subSchemes = null;
var popupShowed = false;
var cardItem = null;
var restriction_errors = 0;
var typeCarteUpi = false;
var ignorerVerification = false;
var forcerVerification = false;



function checkCardHolderName()
{
    isCardHolderNameOK($("#Ecom_CardHolderName").val());
}

$("#Ecom_CardHolderName").blur(checkCardHolderName);


function InitSchemeChoice()
{
    if ($('#schemeChoice').length)
        $('#schemeChoice').empty();
    $("#Ecom_Payment_Card_Number").change(cardChanged);
}

InitSchemeChoice();

$.widget("custom.menuimg", $.ui.menu, {
    _isDivider: function( item ) {
        return (!(item.text() != ""));
    }
});


$('html').click(function() {
    $("#schemeButtons").hide();
    });


$(".carditem").click(function() {
        selectCard($(this));
        });


function onclickschemelistener()
{
    $(".carditem").click(function() {
        selectCard($(this));
        });
}

$(function() {
    $("form input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('input[alt=Valider].image').click();
            return false;
        } else {
            return true;
        }
    });
});

if (alias != "")
{
    if($(".carditem").length)
        selectCard($(".carditem").filter(".cardchecked"));
    else
        selectCardMono();
}

function hideCVVField()
{
    if (cvv_obligatoire === 'maestro_be_interdit')
    {
        var texte = document.getElementById("cvvtexte");
        var champ = document.getElementById("cvvchamp");
        if (texte && champ)
        {
            texte.style.display = 'none';
            champ.style.display = 'none';
        }
    }
}

function showCVVField()
{
    if (cvv_obligatoire !== 'interdit')
    {
        var texte = document.getElementById("cvvtexte");
        var champ = document.getElementById("cvvchamp");
        if (texte && champ)
        {
            texte.style.display = '';
            champ.style.display = '';
        }
    }
}

function hideExpDateFields()
{
    var exipry = document.getElementById("tr_date_expiration");
    if (exipry) exipry.style.display = 'none';

    var checkboxMonth     = document.getElementById('Ecom_Payment_Card_ExpDate_Month')[0];
    var checkboxYear      = document.getElementById('Ecom_Payment_Card_ExpDate_Year')[0];
    if (checkboxMonth && checkboxYear )
    {
	checkboxMonth.style.display = 'none';
	checkboxYear.style.display  = 'none';
    }
}

function showExpDateFields()
{
    var exipry = document.getElementById("tr_date_expiration");
    if (exipry) exipry.style.display = '';

    var checkboxMonth     = document.getElementsByName('Ecom_Payment_Card_ExpDate_Month')[0];
    var checkboxYear      = document.getElementsByName('Ecom_Payment_Card_ExpDate_Year')[0];
    if (checkboxMonth && checkboxYear )
    {
	checkboxMonth.style.display = '';
	checkboxYear.style.display  = '';
    }
}

function selectCardMono()
{
    cardItem = $("#Ecom_Payment_Card_Number").parent();
    cardChangedAlias(alias,index);
}

function selectCard(item)
{
    cardItem = item;
    var parent = item.find('img[id^="pai_img_type_cb_sequestree"]').parent();
    if ($('#schemeChoice').length)
        $('#schemeChoice').remove();
    $("<div>",{id:"schemeChoice"}).appendTo(parent);
    $(".carditem").find('img[id^="pai_img_type_cb_sequestree"]').each(function(){$(this).show();});
    cardChangedAlias(alias,item.attr("alt"));
}

onclickschemelistener();


$(".newcard").click(function() {
    resetScheme($("#schemeChoice").parent());
    });

function resetScheme(carditem)
{
    while ($("#schemeChoice").length)
    $(document).find("#schemeChoice").each(function(){$(this).remove()});
    carditem.find('img[id^="pai_img_type_cb_sequestree"]').each(function(){$(this).show();});
}

function cardChangedAlias(a, i)
{

    var encodedToken=encodeURIComponent(token);
    var encodeda=encodeURIComponent(a);
    var encodedi=encodeURIComponent(i);

    $.ajax("reseaux.cgi",
           {
               data: "token="+encodedToken+"&alias="+encodeda+"&index="+encodedi,
               dataType: "json",
               method:'post',
               success: cardResponseAlias
           });
}

function cardResponseAlias(response)
{
    cardItem.find('img[id^="pai_img_type_cb_sequestree"]').each(function(){$(this).hide();});
    // dans le cas d'un alias on force la validité d'au moins un scheme pour avoir un affichage du logo...
    var at_least_one_valid = false;
    for (i = 0; i < response.schemes.length ; i++)
        if (response.schemes[i].valide === true)
            at_least_one_valid = true;
    if (!at_least_one_valid && response.schemes.length > 0)
        response.schemes[0].valide = true;

    cardResponse(response);
}

function cardChanged()
{
    if ($('#schemeChoice').length)
        $('#schemeChoice').empty();

    remove_error(31);
    remove_error(4096);
    SchemeCVVSize(); // Reset CVV size to default

    setTimeout(function()
               {
                   var checkboxMonth     = document.getElementsByName('Ecom_Payment_Card_ExpDate_Month')[0];
                   var checkboxYear      = document.getElementsByName('Ecom_Payment_Card_ExpDate_Year')[0];
                   if (checkboxMonth && checkboxYear )
                       CheckCardExpirationDate(document, checkboxMonth, checkboxYear, false);
               }, 300);

    popupShowed = false;
    if ($(this).val() == "") {
        showCVVField();
	showExpDateFields();
        return;
    }

    var match = $(this).val().match(/\d/g);
    var value = null;
    if (match)
        value = match.join("");
    if (value && IsCardNumberFormatOk(value))
    {
        var encodedToken=encodeURIComponent(token);
        var encodedvalue=encodeURIComponent(value);
        $.ajax("reseaux.cgi",
               {
                   data: "token="+encodedToken+"&pan="+encodedvalue,
                   dataType: "json",
                   method:'post',
                   success: cardResponse
               });
    }
}

function add_error(type)
{
    var old = restriction_errors;
    restriction_errors |=  type;
    if (!(old & 31) && (restriction_errors & 31))
    {
        document.getElementById('Ecom_Payment_Card_Number').style.borderColor = 'red';
        document.getElementById('pai_img_invalid_card_number').className = '';
        document.getElementById('Ecom_Payment_Card_Number').style.borderStyle = 'solid';
    }

    if (!(old & 2048) && (restriction_errors & 2048))
    {
        document.getElementById('Ecom_CardHolderName').style.borderColor = 'red';
        document.getElementById('Ecom_CardHolderName').style.borderStyle = 'solid';
        document.getElementById('pai_img_invalid_cardholder').className = '';
    }

    if ((old == 0) && (old != restriction_errors))
        display_error_msg();
}

function remove_error(type)
{
    var old = restriction_errors;
    restriction_errors &= ~type;
    if ((old & 31) && !(restriction_errors & 31))
    {
        document.getElementById('Ecom_Payment_Card_Number').style.borderColor = '';
        document.getElementById('Ecom_Payment_Card_Number').style.borderStyle = '';
        document.getElementById('pai_img_invalid_card_number').className = 'invisible';
    }

    if ((old & 2048) && !(restriction_errors & 2048))
    {
        document.getElementById('Ecom_CardHolderName').style.borderColor = '';
        document.getElementById('Ecom_CardHolderName').style.borderStyle = '';
        document.getElementById('pai_img_invalid_cardholder').className = 'invisible';
    }

    if (old != restriction_errors)
        display_error_msg();
}

function get_error_msg()
{
    if (typeof get_error_msg.previous == 'undefined')
        get_error_msg.previous = 0;

    if ((get_error_msg.previous & restriction_errors) != 0) // l'erreur affichée précédemment n'a pas été corrigée.
        return null;

    if (restriction_errors == 0)
    {
        get_error_msg.previous = 0;
        return '';
    }

    if (restriction_errors == 1)
    {
        get_error_msg.previous = 1;
        return trad_format_pan_incorrect;
    }

    if (restriction_errors & 31)
    {
        get_error_msg.previous = 31;
        return trad_restriction_scheme_refuse;
    }

    if (restriction_errors & 32)
    {
        get_error_msg.previous = 32;
        return trad_restriction_delai_exp_insuffisant;
    }

    if (restriction_errors & 64)
    {
        get_error_msg.previous = 64;
        return trad_carte_perimee;
    }

    if (restriction_errors & 128)
    {
        get_error_msg.previous = 128;
        return trad_champ_cvv_incorrect;
    }

    if (restriction_errors & 256)
    {
        get_error_msg.previous = 256;
        return trad_completion_adresse;
    }

    if (restriction_errors & 512)
    {
        get_error_msg.previous = 512;
        return trad_completion_code_postal;
    }

    if (restriction_errors & 1024)
    {
        get_error_msg.previous = 1024;
        return trad_completion_delai_expiration;
    }

    if (restriction_errors & 2048)
    {
        get_error_msg.previous = 2048;
        return trad_nom_porteur_invalide;
    }

    if (restriction_errors & 4096)
    {
        get_error_msg.previous = 4096;
        return trad_carte_incompatible_vpc;
    }

    return '';
}

function display_error_msg()
{
    var text = get_error_msg();
    if (text != null) // i.e. all errors are fixed or (the previous error is fixed and there is a new error)
    {
        if (text.length > 0)
        {
            var err_display_area = $('#error_display_area');
            err_display_area.find('p:first').html(text);
            err_display_area.css('display', 'inline');
            return;
        } else {
            clear_restriction_error_msg();
        }
    }
}

function clear_restriction_error_msg()
{
    var err_display_area = $('#error_display_area');
    err_display_area.find('p:first').text('');
    err_display_area.css('display', 'none');
}

function hide_cvv_maebe(response)
{
    if (response.result.errcode == 0)
    {
        if (cvv_obligatoire === 'maestro_be_interdit')
        {
            if (response.subschemes &&
                (( $.inArray('CIRRUS', response.subschemes) > -1) || ($.inArray('MAESTRO', response.subschemes) > -1 )) &&
                (response.country && ((response.country == 'BE') || (response.country == 'BEL'))))
                hideCVVField();
            else
                showCVVField();
        }
    }
}

function HideExpiryCvvIfUpiDebitCard(response)
{
    if (response.result.errcode == 0)
    {
	if (estCarteDebitUpi(response))
	{
	    var texte = document.getElementById("cvvtexte");
	    var champ = document.getElementById("cvvchamp");
	    if (texte && champ)
	    {
		texte.style.display = 'none';
		champ.style.display = 'none';
	    }
	    if (cardItem)
		cardItem.find("p.date_expiration").css("display","none");
	    hideExpDateFields();
	}
    }
}

function remove_invalid_schemes(response)
{
    if(typeof response.schemes === 'undefined')
    {
        return;
    }
    var i = response.schemes.length;
    while (i--)
    {
        if (response.schemes[i].valide === false)
        {
            if (response.preferred && response.schemes[i].reseau === response.preferred.scheme)
               delete response.preferred;
            response.schemes.splice(i,1);
        }
    }
}

function cardResponse(response)
{
    // premiere étape : on supprime les réseaux non valides
    remove_invalid_schemes(response);

    schemeEnabled = true; // Si on arrive ici, ca veut dire que le code JS fonctionne
    // on remet à zero les erreurs liées au pan
    remove_error(31);
    remove_error(4096);

    // on remet à zero les erreurs liées au date d'expiration et CVV
    remove_error(1024);
    remove_error(64);
    remove_error(32);
    remove_error(128);

    // on ignore la vérification si carte UPI de débit
    ignorerVerification = false;
    if (estCarteDebitUpi(response))
	ignorerVerification = true;

    // on force la vérification si carte UPI de crédit
    forcerVerification = false;
    if (estCarteCreditUpi(response))
	forcerVerification = true;

    hide_cvv_maebe(response);
    HideExpiryCvvIfUpiDebitCard(response);	

    if (typeof response.restrictions !== 'undefined' || response.restrictions.errcode != 0)
    {
        var errcode = response.restrictions.errcode;
        add_error(errcode);
    }

    if (response.result.errcode == 0)
    {
        if (response.schemes.length == 0)
        {
            add_error(2);
        } else {
            schemeList = response.schemes;
            subSchemes = response.subschemes;
            createSchemeCss(schemeList);
            parseSchemes(schemeList);
            if (response.preferred && response.preferred.scheme != "")
            {
                s = getSchemeWithName(response.preferred.scheme);
                selectScheme(s, (response.preferred.defaultScheme ? 1 : 0));
            }
            SchemeCVVSize(response);
        }

        DisplayAuthMessIfAmexCard(response);
    }
}

function createSchemeCss(schemes)
{
    if ($('#schemeCss').length)
        $('#schemeCss').remove();
    var css = "<style type='text/css' id='schemeCss'>";
    for (i = 0; i < schemes.length; ++i)
    {
        css +=  '\n'+".scheme-icon-"+schemes[i].reseau+" { background-image: url('/images/"+schemes[i].miniature+"') !important; width: 32px !important; height: 25px !important; }"+'\n';
        css +=  '\n'+".scheme-image-"+schemes[i].reseau+" { background-image: url('/images/"+schemes[i].image+"') !important; width: 70px !important; height: 44px !important; }"+'\n';
    }
    css += "</style>";
    if ($("#schemeButtons").length)
        $("#schemeButtons").remove();
    $(css).appendTo("head");
    var div = $("<ul/>").attr({id: 'schemeButtons' }).hide();
    createList(div);
    div.appendTo("body");
}

function createList(div)
{
    schemes = schemeList;
    $(div).empty();
    for (i = 0; i < schemes.length; ++i)
    {
        if (schemeSelected && schemeSelected.reseau == schemes[i].reseau)
            continue;
        var li = $("<li/>").text(" ");
        $("<span/>").attr({'class': 'ui-icon scheme-icon-'+schemes[i].reseau, id: 'radio-'+schemes[i].reseau }).appendTo(li);
        li.appendTo(div);
    }

}
function changeScheme()
{
    if (schemeList.length <= 1)
        return false;
    if ($("#schemeButtons").is(":visible"))
    {
        $("#schemeButtons").hide();
    }
    else
    {
        $("#schemeButtons").menuimg().menuimg("destroy");
        createList($("#schemeButtons"));
        $("#schemeButtons").menuimg({ select: onSchemeSelected }).width($("#scheme_button").width());
        $("#schemeButtons").show().position({ of: $("#scheme_button"), at: 'bottom', my: 'top' });
        $("#schemeButtons").find('span').each(function() { $(this).css("cssText", "width: "+$("#scheme_button").width()+"px !important"); });
    }
    return false;
}

function getSchemeWithName(name)
{
    for (it = 0; it < schemeList.length; ++it)
        if (schemeList[it].reseau == name)
            return schemeList[it];
    return null;
}

function onSchemeSelected(event, ui)
{
    var brand = ui.item.children('span').attr('id').substr(6);
    $("#schemeChoice").show();
    selectScheme(getSchemeWithName(brand), 0);
    $("#schemeButtons").hide();
}

function setSchemeButton(scheme)
{
    var arrowIcon = (schemeList.length > 1 ? "ui-icon-triangle-1-s" : null);
    $("#scheme_button").button({icons: { secondary: arrowIcon }, text: ' '}).unbind('click').click(changeScheme);
    $("#btn-image").attr('src', '/images/'+scheme.miniature);
}

function callTdsMethod(response)
{
    if (!response.url) return;
    var iframe = document.getElementById('tdsMethodIframe');
    if (!iframe)
        {
            iframe = document.createElement('iframe');
            iframe.id     = 'tdsMethodIframe';
            iframe.name   = 'tdsMethodIframe';
            iframe.type   = 'hidden';
            iframe.width  = 0;
            iframe.height = 0;
            iframe.style = 'border:0';
            document.body.appendChild(iframe);
        }
    var form = document.getElementById('tdsMethodForm');
    if (!form)
        {
            form = document.createElement('form');
            form.name   = 'tdsMethodForm';
            form.id     = 'tdsMethodForm';
            form.target = 'tdsMethodIframe';
            form.method = 'post';
            document.body.appendChild(form);
        }
    var input = document.getElementById('threeDSMethodData');
    if (!input)
        {
            var input = document.createElement('input');
            input.name  ='threeDSMethodData';
            input.id    ='threeDSMethodData';
            input.type  = 'hidden';
            form.appendChild(input);
        }

    input.value = response.data.threeDSMethodData;
    form.action = response.url;
    form.submit();
    document.getElementById('tdsMethodId').value = response.id;
}

function makeTdsMethod()
{
    var dataTds = {};
    dataTds.token=encodeURIComponent(token);
    dataTds.pan=$("#Ecom_Payment_Card_Number").val();
    dataTds.scheme=$("#Ecom_Payment_Card_Type").val();
    dataTds.MAC=$("#MAC").val();
    $.ajax({    url: "tdsmethod.cgi",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataTds),
                dataType: "json",
                method:'post',
                success: callTdsMethod});
}

function selectScheme(scheme, def)
{
    if (scheme !== null)
    {
        schemeSelected = scheme;
        $("#Ecom_Payment_Card_Type").val(schemeSelected.reseau);
        $("#defaultScheme").val(def);
        setSchemeButton(scheme);
        makeTdsMethod();
    }
}

function parseSchemes(schemes)
{
    if (schemes.length == 0)
        return ;
    schemeSelected = schemes[0];
    var div = $("#schemeChoice");
    if (div.length == 0)
    {
        div = $("<div/>", { id: 'schemeChoice', name: 'schemeChoice' }).hide();
        div.appendTo($("#Ecom_Payment_Card_Number").parent());
    }
    else
        div.empty();
    $("#Ecom_Payment_Card_Type").val(schemeSelected.reseau);
    makeTdsMethod();
    $("<input/>").attr({ id: 'defaultScheme', name: 'defaultScheme', type: 'hidden', value: 1 }).appendTo(div);
    $("<img/>").attr({ src: '/images/'+schemeSelected.miniature, id: 'btn-image' }).appendTo($("<button/>", { id: 'scheme_button' }).appendTo(div));
    setSchemeButton(schemeSelected);
    div.show();
    if (schemes.length <= 1)
        $("#scheme_button").attr("disabled", true);
}

function CheckScheme(ownerDocument, msg)
{
    if (!schemeEnabled)
        return true;
    if (!ownerDocument.getElementById("Ecom_Payment_Card_Type") || ownerDocument.getElementById("Ecom_Payment_Card_Type").value=="")
        return false;

    return true;
}

function paylibReturnToMerchantSite()
{
    $("#paylib_action").val("ReturnMerchantSite")
    $("#form_paylib").submit()
}

function paylibChangeBankOrCard()
{
    $("#paylib_action").val("ChangeBankOrCard")
    $("#form_paylib").submit()
}

function paylibCheckAuthenticationResult(paymentRequestId)
{
    $.ajax({
	url: "ws_paylibcheckauthent.cgi",
        data: "payment_request_id="+encodeURIComponent(paymentRequestId),
        dataType: "json",
        method:'post',
        success: function(data){
	    var finalStates = ["notAuthenticated", "notAuthorized", "charged", "cancelled", "created", "error"];
	    if(finalStates.includes(String(data.state)))
	    {
		$("#paylib_action").val("NotifyPaymentResult")
		$("#form_paylib").submit()
	    }
	    else
		setTimeout(paylibCheckAuthenticationResult, 1000, paymentRequestId);
	}
    });
}
