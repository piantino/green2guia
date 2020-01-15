var request = require("request");
var cheerio = require("cheerio");

const LOGIN_URL = "https://www.grupogreencard.com.br/sysweb/site/loginUsuario";
const LOGAR_URL = "https://www.grupogreencard.com.br/sysweb/site/loga_usuario";
const EXTRACT_URL = "https://www.grupogreencard.com.br/sysweb/site/usuarios/extrato";

const COLUMNS_NAME = ["date", "value", "text"];

function Robo(cpf, pwd, callback) {

    var cookieJar = request.jar();

    request({ url: LOGIN_URL, jar: cookieJar}, function (err, res, body) {
        if(err) {
            console.log(err);
            return;
        }
    
        let $ = cheerio.load(body);

        console.log('Grabbed', res.statusCode, res.body.length, 'bytes');
        
        const captcha = $(".eL-captcha strong").text();
        console.log('Captcha', captcha);
        
        const captchaOptions = {};
        $(".eL-possibilities img").each(function(i, e) {
            const img = $(e);
            captchaOptions[img.attr("alt")] = img.attr("data-value");
        });

        console.info('Options', captchaOptions);

        const captchaValue = captchaOptions[captcha];
        console.info('Captcha value', captchaValue);

        login(cpf, pwd, captchaValue, cookieJar, callback);
    }); 
    
}
 
function login(cpf, pwd, captchaValue, cookieJar, callback) {
        
    request.post({ url: LOGAR_URL, jar: cookieJar}, function (err, res, body) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Grabbed', res.statusCode,  res.body.length, 'bytes');

        let $ = cheerio.load(body);
        const errorText = $("#erro p").text();

        
        if (errorText) {
            console.log('Error:', errorText);
            callback(errorText);
            return;
        }

        const params = {
            SALDO_SIMPLES: $("input[name=SALDO_SIMPLES]").attr("value"),
            COD_PROD: $("input[name=COD_PROD]").attr("value"),
            NUM_CARTAO: $("input[name=NUM_CARTAO]").attr("value")
        };

        console.info(params);

        extract(params, cookieJar, callback);

    }).form({
        cpf: cpf,
        senha: pwd,
        'captcha-value': captchaValue
    });
}

function extract(params, cookieJar, callback) {
    request.post({ url: EXTRACT_URL, jar: cookieJar}, function (err, res, body) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }

        let $ = cheerio.load(body);

        let list = [];

        $($("table").get(1)).find("tbody tr").each(function(i, e) {
            let item = {}
            $(e).find("td").each(function(j, td) {
                const value = $(td).text().trim();
                item[COLUMNS_NAME[j]] = value;
            });
            list.push(item);
        });

        callback(null, list);
    }).form(params);
}

module.exports = Robo;