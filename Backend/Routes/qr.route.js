const express=require("express");
const bodyParser = require('body-parser');
const qr_code = require('qrcode');

const qrRouter=express.Router();




qrRouter.get('/', function(req, res){
	res.render('index',{QR_code:''});
});

qrRouter.post('/', function(req, res){
	const url = req.body.url;
	console.log(url);
	if(url){
		qr_code.toDataURL(url, function(err, src){
			if(err){res.send(err); console.log(err);}
			var file_path = "store/"+ Date.now() +".png";
			qr_code.toFile(file_path,url, {
			  color: {
			    dark: '#000',  // Black dots
			    light: '#0000' // Transparent background
			  }
			});
			res.render('index',{QR_code:src,img_src:file_path}); 
		});

	}else{
		res.send('URL Not Set!');
	}

});

qrRouter.get('/download',function(req,res){
	res.download(req.query.file_path);
})


module.exports = {
   qrRouter
 };