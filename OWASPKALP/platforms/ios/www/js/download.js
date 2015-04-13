/*------------------------------------------------------------------3
// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
function onDeviceReady() {
    alert("Going to start download");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

}



function fileSystemSuccess(fileSystem) {
    
    var uri = 'http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2013.pdf'; // Get URL
    
    var download_link = encodeURI(uri);
    
    var path = download_link,
    ext = path.substr(path.lastIndexOf('.') + 1); //Get extension of URL
    
    var folder_name = 'OWASPTopten'; // Get folder name
    var file_name = 'OWASPTop10_2014'; //Get file name
    
    var directoryEntry = fileSystem.root; // to get root path to directory
    directoryEntry.getDirectory(folder_name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath;
    
    
    fp = fp + "/" + folder_name + "/" + file_name + "." + ext; // fullpath and name of the file which we want to give
    // download function call
    var fileTransfer = new FileTransfer();
    //File download function with URL and local path
    fileTransfer.download(download_link, fp,
                          function (entry) {
                          alert("download complete: " + entry.fullPath);
                          
                          },
                          function (error) {
                          alert("download error source " + error.source);
                          alert("download error target " + error.target);
                          alert("upload error code" + error.code);
                          
                          }
                          );
    
}
function onDirectorySuccess(parent) {
    alert(parent);
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);
}

function fileSystemFail(evt) {
    alert(evt.target.error.code);
}


*/







/*   --------------------------------------------------------------2*/
var $ = jQuery.noConflict();
var formSubmitted = 'false';
var status = '';
var url = '';
var filePath = '';
var fileName = '';
var sPath = '';


// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
function onDeviceReady() {
    //alert("Going to start download");
    //downloadFile();
}


jQuery(document).ready(function($) {
                       
                       $('#formSuccessMessageWrap').hide(0);
                       $('.formValidationError').fadeOut(0);
                       
                       $('input[type="text"], input[type="password"], textarea').focus(function(){
                                                                                       if($(this).val() == $(this).attr('data-dummy')){
                                                                                       $(this).val('');
                                                                                       };
                                                                                       });
                       
                       $('input, textarea').blur(function(){
                                                 if($(this).val() == ''){
                                                 $(this).val($(this).attr('data-dummy'));
                                                 };
                                                 });
                       
                       $('#contactEmailField').val(localStorage.getItem('email'));
                       
                       $('#contactEmailField').keyup(function(){
                                                     localStorage.setItem('email',$('#contactEmailField').val());
                                                     });
                       
                       
                       
                       
                       
                       function submitData(currentForm, formType){
                       formSubmitted = 'true';
                       var formInput = $('#' + currentForm).serialize();
                       
                       checkConnection();
                       
                       if(status == "No network connection")
                       {
                       $('#' + currentForm).hide();
                       $('#formFailMessageWrap').fadeIn(1000);
                       }else
                       {					
                       downloadFile();
                       }
                       
                       };
                       
                       
                       function validateForm(currentForm, formType){		
                       $('.formValidationError').hide();
                       $('.fieldHasError').removeClass('fieldHasError');
                       $('#' + currentForm + ' .requiredField').each(function(i){		   	 
                                                                     if($(this).val() == '' || $(this).val() == $(this).attr('data-dummy')){				
                                                                     $(this).val($(this).attr('data-dummy'));	
                                                                     $(this).focus();
                                                                     $(this).addClass('fieldHasError');
                                                                     $('#' + $(this).attr('id') + 'Error').fadeIn(300);
                                                                     return false;					   
                                                                     };			
                                                                     if($(this).hasClass('requiredEmailField')){				  
                                                                     var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                                                                     var tempField = '#' + $(this).attr('id');				
                                                                     if(!emailReg.test($(tempField).val())) {
                                                                     $(tempField).focus();
                                                                     $(tempField).addClass('fieldHasError');
                                                                     $(tempField + 'Error2').fadeIn(300);
                                                                     return false;
                                                                     };			
                                                                     };			
                                                                     if(formSubmitted == 'false' && i == $('#' + currentForm + ' .requiredField').length - 1){
                                                                     submitData(currentForm, formType);
                                                                     };			  
                                                                     });		
                       };
                       
                       $('#downloadSubmitButton').click(function() {	
                                                        validateForm($(this).attr('data-formId'));	
                                                        return false;		
                                                        });
                       
                       });


function downloadFile()
{
    document.getElementById("downloadForm").style.display = 'none';
	document.getElementById("formLoadingMessageWrap").style.display = '';
	document.getElementById("loader1").style.display = '';
	
	
	var year = document.getElementById("soflow");
	var selectedyear = year.options[ year.selectedIndex ].value
	
	if(selectedyear == "2014")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2014.pdf";
		fileName = "OWASP_Top10_2014.pdf";
		
	}else if(selectedyear == "2013")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2013.pdf";
		fileName = "OWASP_Top10_2013.pdf";
	}else if(selectedyear == "2010")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2010.pdf";
		fileName =  "OWASP_Top10_2010.pdf";
	}else if(selectedyear == "2007")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2007.pdf";
		fileName = "OWASP_Top10_2007.pdf";
	}
    
    window.requestFileSystem(
                             LocalFileSystem.PERSISTENT,
                             0,
                             function onFileSystemSuccess(fileSystem)
                             {
                             fileSystem.root.getFile(
                                                     "owasp.html",
                                                     {
                                                     create: true,
                                                     exclusive: false
                                                     },
                                                     function gotFileEntry(fileEntry)
                                                     {
                                                     
                                                     
                sPath = fileEntry.toURL().replace("owasp.html", "");
                                                  sPath =   sPath + fileName
                                                     var fileTransfer = new FileTransfer();
                                                     fileEntry.remove();
                                                     var DBuri = encodeURI(url);
                                                     fileTransfer.download(
                                                                           DBuri,
                                                                           sPath,
                                                                           
                                                                           function (theFile)
                                                                           {
                        document.getElementById("path").innerHTML = theFile.toURI();
                        document.getElementById("formLoadingMessageWrap").style.display = 'none';
                        document.getElementById("formSuccessMessageWrap").style.display = 'block';
                                                                           
                       // alert("download complete: " + theFile.toURI());
                        //console.log("download complete: " + theFile.toURI());
                      //  showLink(theFile.toURI());
                        //setTimeout(function (){checkConnection();}, 50);
                                                                           },
                                                                           
                            function (error) {
            document.getElementById("formLoadingMessageWrap").style.display = 'none';
            document.getElementById("formErrorMessageWrap").style.display = 'block';
                         //            alert("download complete - 2: " + theFile.toURI());
                          //           console.log("download error source " + error.source);
                           //          console.log("download error target " + error.target);
                            //         console.log("upload error code: " + error.code);
                                                                           });
                                                     },
                                                     fail);
                             },
                             fail);
}  
function showLink(url){  
    alert(url);  
    var divEl = document.getElementById("deviceready");  
    var aElem = document.createElement("a");  
    aElem.setAttribute("target", "_blank");  
    aElem.setAttribute("href", url);  
    aElem.appendChild(document.createTextNode("Ready! Click To Open."))  
    divEl.appendChild(aElem);  
}

function fail(evt) {  
    console.log(evt.target.error.code);  
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    status = states[networkState];
}


function viewpdf()
{
	
	
	try
	{
        var ref = window.open(encodeURI(sPath), '_blank', 'location=yes');
	}
	catch(err)
	{
		document.getElementById("nopdfviewerfound").style.display = 'block';
		
	}
	ref.addEventListener('loadstart', function(event) { /* alert('start: ' + event.url); */});
	ref.addEventListener('loadstop', function(event) { /* alert('stop: ' + event.url); */});
	ref.addEventListener('loaderror', function(event) { /* alert('error: ' + event.message); */});
	ref.addEventListener('exit', function(event) { /*alert(event.type); */});
    
}










/*---------------------------------------------------------------------------1
 
var $ = jQuery.noConflict();
var formSubmitted = 'false';
var status = '';
var url = '';
var filePath = '';

window.appRootDirName = "Topten";
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("device is ready");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function fail() {
	console.log("failed to get filesystem");
}

function gotFS(fileSystem) {
	console.log("filesystem got");
	window.fileSystem = fileSystem;
	fileSystem.root.getDirectory(window.appRootDirName, {
		create : true,
		exclusive : false
	}, dirReady, fail);
}

function dirReady(entry) {
	window.appRootDir = entry;
	console.log("application dir is ready");
}


jQuery(document).ready(function($) {	

	$('#formSuccessMessageWrap').hide(0);
	$('.formValidationError').fadeOut(0);

		$('input[type="text"], input[type="password"], textarea').focus(function(){
		if($(this).val() == $(this).attr('data-dummy')){
			$(this).val('');
		};	
	});

		$('input, textarea').blur(function(){
		if($(this).val() == ''){		    
			$(this).val($(this).attr('data-dummy'));				
		};			
	});

	$('#contactEmailField').val(localStorage.getItem('email'));
	
	$('#contactEmailField').keyup(function(){		
		localStorage.setItem('email',$('#contactEmailField').val());
	});
	
	
	
	
	
	function submitData(currentForm, formType){     
		formSubmitted = 'true';		
		var formInput = $('#' + currentForm).serialize();	
		
		checkConnection();		
			
		if(status == "No network connection")
			{
				$('#' + currentForm).hide();
				$('#formFailMessageWrap').fadeIn(1000);
			}else
			{					
				downloadFile();
			}
		
	};

	
	function validateForm(currentForm, formType){		
		$('.formValidationError').hide();
		$('.fieldHasError').removeClass('fieldHasError');
		$('#' + currentForm + ' .requiredField').each(function(i){		   	 
			if($(this).val() == '' || $(this).val() == $(this).attr('data-dummy')){				
				$(this).val($(this).attr('data-dummy'));	
				$(this).focus();
				$(this).addClass('fieldHasError');
				$('#' + $(this).attr('id') + 'Error').fadeIn(300);
				return false;					   
			};			
			if($(this).hasClass('requiredEmailField')){				  
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var tempField = '#' + $(this).attr('id');				
				if(!emailReg.test($(tempField).val())) {
					$(tempField).focus();
					$(tempField).addClass('fieldHasError');
					$(tempField + 'Error2').fadeIn(300);
					return false;
				};			
			};			
			if(formSubmitted == 'false' && i == $('#' + currentForm + ' .requiredField').length - 1){
				submitData(currentForm, formType);
			};			  
		});		
	};

	$('#downloadSubmitButton').click(function() {	
		validateForm($(this).attr('data-formId'));	
		return false;		
	});


});

downloadFile = function(){
	
	document.getElementById("downloadForm").style.display = 'none';
	document.getElementById("formLoadingMessageWrap").style.display = '';
	document.getElementById("loader1").style.display = '';
	
	
	var year = document.getElementById("soflow");
	var selectedyear = year.options[ year.selectedIndex ].value
	
	if(selectedyear == "2014")
	{	
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2014.pdf";
		filePath = window.appRootDir.fullPath + "/OWASP_Top10_2014.pdf";
		
	}else if(selectedyear == "2013")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2013.pdf";
		filePath = window.appRootDir.fullPath + "/OWASP_Top10_2013.pdf";
	}else if(selectedyear == "2010")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2010.pdf";
		filePath = window.appRootDir.fullPath + "/OWASP_Top10_2010.pdf";
	}else if(selectedyear == "2007")
	{
		url = "http://www.varutra.com/mobileOWASPKALP/pdf/OWASP_Top_10_2007.pdf";
		filePath = window.appRootDir.fullPath + "/OWASP_Top10_2007.pdf";
	}
	
	var fileTransfer = new FileTransfer();
	
	fileTransfer.download(
	    url,
	    filePath,
	    function(entry) {
	        document.getElementById("formLoadingMessageWrap").style.display = 'none';
			document.getElementById("formSuccessMessageWrap").style.display = 'block';
	    },
	    function(error) {
	        document.getElementById("formLoadingMessageWrap").style.display = 'none';
			document.getElementById("formErrorMessageWrap").style.display = 'block';
	    }
	);
	
}


function checkConnection() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
 
    status = states[networkState];       
}



function viewpdf()
{
	
	
	try
	{	
	var ref = window.open(filePath, '_system', 'location=yes');	
	}
	catch(err)
	{
		document.getElementById("nopdfviewerfound").style.display = 'block';    
		
	}
	ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
	ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
	ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
	ref.addEventListener('exit', function(event) { alert(event.type); });	

}
*/