// app/index.js
const express = require('express')
const app = express();
const speakeasy = require('speakeasy');
var QRCode = require('qrcode');
/*used to generate new keys if needed*/
app.get('/generate', (req, res) => {

	
	
	// generate key
	var secret = speakeasy.generateSecret({length: 20});
	
	
	// generate image data
	QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
	console.log(image_data); // A data URI for the QR code image
	res.send(secret.base32+'\n\n\n'+ image_data);
	});
	
});

app.get('/', function (req, res) {
	
	res.sendFile(__dirname + '/index.html');
	var token_num = req.url.substr(7); // grabs arguments of form after '/?code=' 
	var secret = 'KVTHGMZQMI2WYQJMIYXFUI3WNAYWYTCU' 

	var token = speakeasy.totp({
		secret: secret.base32,
		encoding: 'base32'
	});
	var verified = speakeasy.totp.verify({ secret: secret,
                                       encoding: 'base32',
                                       token: token_num });
	if (req.url != '/' ){
        if (verified){
			console.log('\n\nYour code:  "' + token_num +'"  is correct!\n\n');
		}
		else{
				console.log('\n\nYour code:  "' + token_num +'"  is incorrect! Please try again!\n\n');
		}
    }
	

	
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})



//console.log(`The result is: ${result}`)
