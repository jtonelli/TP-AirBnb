// function haceAlgo(miCallback){
//     //hago algo y llamo al callback avisando que terminé
//     miCallback();
// }

// haceAlgo(function(){
//    console.log('terminó de hacer algo');
// });

var i;
var files = ['file1','file2','file3']
// for (paso = 0; paso < files.length; paso++) {
//   // Se ejecuta 5 veces, con valores desde paso desde 0 hasta 4.
//   console.log(files[paso]);
// };

function haceAlgo (num, miCallback){
	    //hago algo y llamo al callback avisando que terminé
	miCallback(num);
	// console.log('hacer');
	// setTimeout(function(){
	//         miCallback(num);
	//     }, 10000);
}


function uploader(i) {
  if( i < files.length ) {
	haceAlgo(i, function(queHizo){
	   console.log('terminó de hacer ' + queHizo);
	   uploader(i+1)
	}); 
	// uploader(i+1)   
  }
}
uploader(0)

// for (i = 0; i < files.length; i++) {
// 	// imagePath = req.files.uploadfile[i].path;
// 	// cloudinary.uploader.upload(imagePath, function(result) { 
// 	//   	// console.log(result.public_id);
// 	//   	// console.log(result.url);
// 	//   	a.pictures.push({url: result.url});
// 	// });

// 	haceAlgo(i, function(queHizo){
// 	   console.log('terminó de hacer ' + queHizo);
// 	});
// };

// console.log(req.files.uploadfile[0].path);
// res.status(200).json({resultado:'todo ok'});

console.log('save');