function register() {
    $('#errors').html();
    var user = $('#user').val();
    var pass = $('#pass').val();
    var name = $('#name').val();
    $.post('registeruser', { username: user, password: pass, name: name }, function(data) {
        window.location = 'login.html';
    }).fail(function(data) {
        $('#errors').html(data.responseText);
    });
}
