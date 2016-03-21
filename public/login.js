function goToRegister() {
    window.location = 'register.html';
}

function login() {
    $('#errors').html();
    var user = $('#user').val();
    var pass = $('#pass').val();
    $.post('loginuser', { username: user, password: pass }, function(data) {
        window.location = 'pets.html';
    }).fail(function(data) {
        $('#errors').html(data.responseText);
    });
}
