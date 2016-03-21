function modify() {
    var name = $('#name').val();
    var owner = $('#owner').val();
    $.post('savepet', { name: name, owner: owner }, function(data) {
        window.location = 'pets.html';
    }).fail(function() {
        
    });
}
