function modify() {
    var name = $('#name').val();
    var owner = $('#owner').val();
    $.post('savepet', { id: -1, name: name, owner: owner }, function(data) {
        window.location = 'pets.html';
    }).fail(function() {
        
    });
}

function getUsers() {
    $.get('getusers', function(data) {
        $('#owner').html('');
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            var option = '<option>' + data[i] + '</option>';
            $('#owner').append(option);
        }
    });
}

$(function() {
    getUsers();
});
