

function isCardHolderNameOK(chname)
{
    var is_ok = false;
    if (typeof chname == 'string' || chname instanceof String)
    {
        if (chname)
            is_ok = /^[\x20-\x7E]{2,45}$/.test(chname);
    }

    if (!is_ok)
        add_error(2048);
    else
        remove_error(2048);
    return is_ok;
}


var test_cards =
    [
        "0000010000000001",
        "0000010000000002",
        "0000010000000003",
        "0000010000000004",
        "0000010000000005",
        "0000010000000006",
        "0000010000000007",
        "0000010000000008",
        "000002000000002",
        "000002000000001",
        "000002000000003",
        "000002000000004",
        "000002000000005",
        "000002000000006",
        "000002000000007",
        "000002000000008",
        "0000030000000001",
        "0000030000000002",
        "0000030000000003",
        "0000030000000004",
        "0000030000000005",
        "0000030000000006",
        "0000030000000007",
        "0000030000000008"
    ];

function IsLuhnOk(strCardNumberStrip) {
    // Set the string length and parity
    var iCardNumberLength = strCardNumberStrip.length;
    var iParity           = iCardNumberLength % 2;
    var iTotal            = 0;
    for(var i=0; i < iCardNumberLength; ++i){
        var iDigit = parseInt(strCardNumberStrip.charAt(i));
        // Multiply alternate digits by two.
        if(i % 2 == iParity){
            iDigit *= 2;
            // If the sum is two digits, add them together (in effect).
            if(iDigit > 9){
                iDigit -= 9;
            }
        }
        // Total up the digits
        iTotal += iDigit;
    }

    // If the total mod 10 equals 0, the number is valid
    return (iTotal % 10 == 0);
}

function addTestCard(tdsv2TestCardNumber)
{
    test_cards.push(tdsv2TestCardNumber.replace(/ /g, ''));
}


function IsCardNumberFormatOk(strCardNumber){
    // Suppression des blancs (n'importe ou dans la chaine).
    var strCardNumberStrip = strCardNumber.replace(/\s+/g, "");
    return ($.inArray(strCardNumberStrip, test_cards) > -1) || (/^\d{13,19}$/.test(strCardNumberStrip) && IsLuhnOk(strCardNumberStrip));
}

function IsDateLessThanNextMonth(now, iMonth, iYear){
    var aMonthDayCount      = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];     // Number of days by month. Doesn't take bissextile years into account for the sake of simplicity.
    var iMsByDay            = 24 * 60 * 60 * 1000;                                  // Number of milliseconds in a day.
    var iMsInThisMonth      = iMsByDay * aMonthDayCount[iMonth];                    // Number of milliseconds in the month passed in argument.
    var iTimeNextMonthInMs  = new Date(iYear, iMonth).getTime() + iMsInThisMonth;   // The beginning of the month next the month passed in argument, in milliseconds.

    // Checks that now is less than the beginning of the month next to argument month.
    return now.getTime() < iTimeNextMonthInMs;
}

function isRestrictionExpirationPeriodOK(iMonth, iYear, ownerDocument)
{
    if (isNaN(iMonth) || isNaN(iYear))
        return true;
    if (restriction_expiration_period_in_months == null)
        return true;
    var months = restriction_expiration_period_in_months;
    if (months <= 0 )
        return true;

    var now = new Date();
    var end = new Date(iYear, iMonth);
    var diff_months = 12*(end.getFullYear() - now.getFullYear());
    diff_months -= now.getMonth();
    diff_months += end.getMonth();

    var is_ok = diff_months >= months;

    if (!is_ok)
        add_error(32);
    else
        remove_error(32);
    return is_ok;
}

function IsExpirationDateOk(iExpirationMonth, iExpirationYear, ownerDocument){
    return  (isNaN(iExpirationMonth) || isNaN(iExpirationYear)) ||
        (IsDateLessThanNextMonth(new Date(), iExpirationMonth, iExpirationYear));
}

// Check that the card number is correct.
// Make the card number textbox's border red if it's not the case and display an error icon.
function CheckCardNumberFormat(ownerDocument, textboxCardNumber, bEmptyIsValid)
{
    if (textboxCardNumber)
        textboxCardNumber.value = textboxCardNumber.value.replace(/[^0-9]/gi, '');
    bEmptyIsValid = bEmptyIsValid==null ? true : bEmptyIsValid;

    var bIsCardNumberFormatOk = true;

    if(bEmptyIsValid && textboxCardNumber.value=="") {
        bIsCardNumberFormatOk = true;
    } else {
        bIsCardNumberFormatOk = IsCardNumberFormatOk(textboxCardNumber.value);
        if (!bIsCardNumberFormatOk)
            add_error(1);
    }

    if (restriction_errors & 31)
         bIsCardNumberFormatOk = false;

    return bIsCardNumberFormatOk;
}

// Check that expiration date is not already passed.
// Make the year and month checkboxes' border red if it's not the case and display an error icon.
function CheckCardExpirationDate(ownerDocument, checkboxMonth, checkboxYear, bEmptyIsInvalid)
{
    bEmptyIsInvalid = bEmptyIsInvalid==null ? false : bEmptyIsInvalid;

    var bIsExpirationDateOk = true;
    var imgWrongCardExpirationDate = ownerDocument.getElementById('pai_img_invalid_card_expiration_date');
    var iMonth = NaN;
    var iYear = NaN;

    iMonth = parseInt(checkboxMonth.options[checkboxMonth.selectedIndex].value, 10) - 1;
    // SA0000041718435 - quand l'année d'expiration ne correspond a aucun index ( = -1 )
    // , les cartes expirées ne s'affichaient pas
    if (checkboxYear.selectedIndex > -1)
    {
        iYear = parseInt(checkboxYear.options[checkboxYear.selectedIndex].value, 10);
    }

    if (bEmptyIsInvalid && (isNaN(iMonth) || isNaN(iYear)))
    {
        bIsExpirationDateOk = false;
        remove_error(32 | 64);
        add_error(1024);
    } else {
        remove_error(1024);
        bIsExpirationDateOk = IsExpirationDateOk(iMonth, iYear, ownerDocument);
        if (bIsExpirationDateOk)
        {
            remove_error(64);
            bIsExpirationDateOk = isRestrictionExpirationPeriodOK(iMonth, iYear, ownerDocument);
        } else {
            remove_error(32);
            add_error(64);
        }
    }

    imgWrongCardExpirationDate.className = bIsExpirationDateOk ? 'invisible' : '';
    if (isIE() && IEVersion() <= 7)
    {
        checkboxMonth.style.backgroundColor = bIsExpirationDateOk ? '' : 'red';
        checkboxYear.style.backgroundColor  = bIsExpirationDateOk ? '' : 'red';
    }

    checkboxMonth.style.borderColor = bIsExpirationDateOk ? '' : 'red';
    checkboxYear.style.borderColor  = bIsExpirationDateOk ? '' : 'red';
    checkboxYear.style.borderWidth  = bIsExpirationDateOk ? '' : '2px';
    checkboxMonth.style.borderWidth = bIsExpirationDateOk ? '' : '2px';
    checkboxYear.style.borderStyle  = bIsExpirationDateOk ? '' : 'solid';
    checkboxMonth.style.borderStyle = bIsExpirationDateOk ? '' : 'solid';

    return bIsExpirationDateOk;
}

// CVV de longueur maximale à 5 pour les cartes AMEX, 3 sinon.
// Si le scheme n'est pas renseigné, la longueur maximale du CVV est de 5.
function IsCryptogrammOk(strCryptogramm){
    var inputCVV = document.getElementById("Ecom_Payment_Card_Verification");
    if (inputCVV)
    {
        var inputCVVMaxLength = inputCVV.maxlength;
        var pattern = new RegExp('^\\s*\\d{3,'+inputCVVMaxLength+'}\\s*$');
        return pattern.test(strCryptogramm);
    }

    return /^\s*\d{3,5}\s*$/.test(strCryptogramm);
}

function CheckCryptogram(ownerDocument, textboxCryptogram, mandatory){
    var bMandatory = false;
    if (mandatory && (mandatory === 'maestro_be_interdit' || mandatory === 'true'))
    {
        if ( !(subSchemes && $.inArray('MAESTRO', subSchemes) > -1))
            bMandatory = true;
    }

    var bIsCryptogramOk      = true;

    if (textboxCryptogram)
        textboxCryptogram.value = textboxCryptogram.value.replace(/[^0-9]/gi, '');

    if(bMandatory || textboxCryptogram.value != "") {
        bIsCryptogramOk = IsCryptogrammOk(textboxCryptogram.value);
    }

    if (!bIsCryptogramOk)
        add_error(128);
    else
        remove_error(128);

    var imgInvalidCryptogram = ownerDocument.getElementById('pai_img_invalid_cryptogram');
    imgInvalidCryptogram.className      = bIsCryptogramOk ? 'invisible' : '';
    textboxCryptogram.style.borderColor = bIsCryptogramOk ? '' : 'red';
    textboxCryptogram.style.borderStyle = bIsCryptogramOk ? '' : 'solid';
    return bIsCryptogramOk;
}


function cvvMaxLength(maxLength)
{
    var inputCVV = document.getElementById("Ecom_Payment_Card_Verification");
    if (inputCVV)
    {
        inputCVV.maxLength = maxLength;
        if (inputCVV.value != "" && inputCVV.value.length > maxLength)
        {
            var oldValue = inputCVV.value;
            inputCVV.value = oldValue.substring(0, maxLength);
        }
    }
}


function CheckAVSAdress(ownerDocument, textboxAVSAdress) {
    var bIsAdressOK = true;

    if (textboxAVSAdress.value =="")
    {
        bIsAdressOK = false;
        add_error(256);
    } else
        remove_error(256);

    var imgInvalidAVS = ownerDocument.getElementById('pai_img_invalid_avs_adresse');
    imgInvalidAVS.className            = bIsAdressOK ? 'invisible' : '';
    textboxAVSAdress.style.borderColor = bIsAdressOK ? '' : 'red';
    textboxAVSAdress.style.borderStyle = bIsAdressOK ? '' : 'solid';
   return bIsAdressOK;
}

function CheckAVSCodePostal(ownerDocument, textboxAVSCodePostal) {
    var bIsCodePostalOK = true;

    if (textboxAVSCodePostal.value =="")
    {
        bIsCodePostalOK = false;
        add_error(512);
    } else
        remove_error(512);

    var imgInvalidAVS = ownerDocument.getElementById('pai_img_invalid_avs_codepostal');
    imgInvalidAVS.className                = bIsCodePostalOK ? 'invisible' : '';
    textboxAVSCodePostal.style.borderColor = bIsCodePostalOK ? '' : 'red';
    textboxAVSCodePostal.style.borderStyle = bIsCodePostalOK ? '' : 'solid';
   return bIsCodePostalOK;
}
function CheckInput(ownerDocument, mandatoryCvv, bMandatoryAVS)
{
    bMandatoryAVS = bMandatoryAVS || false;
    if (forcerVerification)
    {
	mandatoryCvv = 'true';
    }
	
    var bInputOk = true;

    // numero de carte
    var textboxCardNumber = ownerDocument.getElementById('Ecom_Payment_Card_Number');

    // expiration date
    var checkboxMonth     = ownerDocument.getElementsByName('Ecom_Payment_Card_ExpDate_Month')[0];
    var checkboxYear      = ownerDocument.getElementsByName('Ecom_Payment_Card_ExpDate_Year')[0];

    // cryptogramme
    var textboxCryptogram = ownerDocument.getElementById('Ecom_Payment_Card_Verification');

    if(ownerDocument.getElementById('Ecom_Payment_Card_Number').style.display != 'none')
    {
        if(! CheckCardNumberFormat(ownerDocument, textboxCardNumber, false)) {
                bInputOk = false;
        }
    }
    
    if (!ignorerVerification)
    {
	if(ownerDocument.getElementById('Ecom_Payment_Card_ExpDate_Month').style.display != 'none' && 
	   ownerDocument.getElementById('Ecom_Payment_Card_ExpDate_Year').style.display != 'none')
	{
	    if(! CheckCardExpirationDate(ownerDocument, checkboxMonth, checkboxYear, true)) {
                bInputOk = false;
	    }
	}
	if(ownerDocument.getElementById('Ecom_Payment_Card_Verification').style.display != 'none')
	{
	    if(! CheckCryptogram(ownerDocument, textboxCryptogram, mandatoryCvv)) {
                bInputOk = false;
	    }
	}
    }

    if (bMandatoryAVS) {
        var textboxAVSAdress = ownerDocument.getElementById('AVSAdresse');
        var textboxAVSCP     = ownerDocument.getElementById('AVSCodePostal');

        if(ownerDocument.getElementById('AVSAdresse').style.display != 'none')
        {
            if(! CheckAVSAdress(ownerDocument, textboxAVSAdress)) {
                    bInputOk = false;
            }
        }
        if(ownerDocument.getElementById('AVSCodePostal').style.display != 'none')
        {
            if(! CheckAVSCodePostal(ownerDocument, textboxAVSCP)) {
                    bInputOk = false;
            }
        }
    }

    {
        var cardholdername = ownerDocument.getElementById('Ecom_CardHolderName');
        if (cardholdername && !isCardHolderNameOK(cardholdername.value))
            bInputOk = false;
    }

    return bInputOk;
}
// modification pour border sur ie
function isIE(){
    return /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
}

function IEVersion()
{
    var useragent = navigator.userAgent.toLowerCase();
    return ($.inArray('msie', useragent) != -1) ? parseInt(useragent.split('msie')[1]) : 0;
}

// vérifie qu'une carte est une carte AMEX
function estCarteAmex(response)
{
    if (response && response.schemes)
    {
        for (i = 0 ; i < response.schemes.length ; ++i)
            if (response.schemes[i].reseau == "AMEX"){
                return true;
            }
    }
    return false;
}

// CVV de longueur maximale à 5 pour les cartes AMEX, 3 sinon.
// Si le scheme n'est pas renseigné, la longueur maximale du CVV est de 5.
function SchemeCVVSize(response)
{
    if (response)
    {
        var bIsAmexCard = estCarteAmex(response) && !(restriction_errors & 31);
        cvvMaxLength(bIsAmexCard ? 5 : 3);
    }
    else
        cvvMaxLength(5);
}

function DisplayAuthMessIfAmexCard(response)
{
    var bIsAmexCard = false;
    var textboxCardNumber = document.getElementById("Ecom_Payment_Card_Number");
    if (textboxCardNumber)
    {
        bIsAmexCard = estCarteAmex(response) && !(restriction_errors & 31);
        document.getElementById("messageAuthentificationAmex").style.display = bIsAmexCard ? '' : 'none';
    }

    return bIsAmexCard;
}

// vérifie qu'une carte est une carte de débit UPI
function estCarteDebitUpi(response)
{
    if (response && response.schemes)
    {
        for (i = 0 ; i < response.schemes.length ; ++i)
            if (response.schemes[i].reseau == "UPI" && response.schemes[i].usagecode == "2")
                return true;
    }
    return false;
}

// vérifie qu'une carte est une carte de crédit UPI
function estCarteCreditUpi(response)
{
    if (response && response.schemes)
    {
        for (i = 0 ; i < response.schemes.length ; ++i)
            if (response.schemes[i].reseau == "UPI" && response.schemes[i].usagecode == "1")
                return true;
    }
    return false;
}
