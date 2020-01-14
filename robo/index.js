var Crawler = require("crawler");

Crawler.debug = true;

var crawler = new Crawler({
    rateLimit: 2000,
    maxConnections: 1
});

function Robo(cpf, pwd, callback) {

    crawler.direct({
        uri: "https://www.grupogreencard.com.br/sysweb/site/loginUsuario",
        callback: function(err, res, done){
            if(err) {
                console.log(error);
                return;
            }
            console.log('Grabbed', res.statusCode, res.body.length, 'bytes');
            
            const captcha = res.$(".eL-captcha strong").text();
            console.log('Captcha', captcha);
            
            const captchaOptions = {};
            res.$(".eL-possibilities img").each(function(i, e) {
                const img = res.$(e);
                captchaOptions[img.attr("alt")] = img.attr("data-value");
            });

            console.info('Options', captchaOptions);

            const captchaValue = captchaOptions[captcha];
            console.info('Captcha value', captchaValue);

            login(cpf, pwd, captchaValue, callback);
        }
    });
    
}
 
function login(cpf, pwd, captchaValue, callback) {
        
        
    crawler.direct({
        uri: "https://www.grupogreencard.com.br/sysweb/site/loga_usuario",
        formData: {
            cpf: cpf,
            senha: pwd,
            'captcha-value': captchaValue
        },
        callback: function (error, res, done) {
            if(error){
                console.log(error);
                return;
            }
            console.log('Grabbed', res.statusCode,  res.body.length, 'bytes');
            console.log('Error:', res.$("#erro p").text());

            callback(res.body);
        }
    });
}

module.exports = Robo;