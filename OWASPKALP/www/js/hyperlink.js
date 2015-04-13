function loadURL(url)
{
    var ref =  window.open(encodeURI(url),'_system','location=yes');
    //navigator.app.loadUrl(url, { openExternal:true });
		return false;
}