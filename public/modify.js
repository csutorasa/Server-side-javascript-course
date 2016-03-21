function modify() {
    var name = $('#name').val();
    var age = $('#age').val();
    var owner = $('#owner').val();
    $.post('savepet', { name: name, age: age, owner: owner }, function(data) {
        window.location = 'pets.html';
    }).fail(function() {
        
    });
}

function getUsers() {
    $.get('getusers', function(data) {
        $('#owner').html('');
        $('#owner').append('<option></option>');
        for(var i = 0; i < data.length; i++) {
            var option = '<option>' + data[i] + '</option>';
            $('#owner').append(option);
        }
    });
}

$(function() {
    getUsers();
});
