function authorize() {
    var authorized = document.getElementById('authorized');
    var unauthorized = document.getElementById('unauthorized');
    unauthorized.style.display = 'none';
    authorized.style.display = 'inline';
}
function unauthorize() {
    var authorized = document.getElementById('authorized');
    var unauthorized = document.getElementById('unauthorized');
   	authorized.style.display = 'none';
  	unauthorized.style.display = 'inline';
}
