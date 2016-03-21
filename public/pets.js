function getPets() {
    $.get('getpets', function(data) {
        $('#pets').html('');
        
        for(var i = 0; i < data.length; i++) {
            var row = '<tr onclick="goToModify()">';
            row += '<td><span>' + data[i].name + '</span></td>';
            row += '<td><span>' + data[i].age + '</span></td>';
            row += '<td><span>' + data[i].owner + '</span></td>';
            row += '<td><button class="btn" onclick="deletePet(event, ' + data[i].id + ')">Remove</button></td></tr>';
            $('#pets').append(row);
        }
    });
}

function goToModify() {
    window.location = 'modify.html';
}

function logout() {
    $.post('logoutuser', function(data) {
        window.location = 'login.html';
    }).fail(function(data) {
        $('#errors').html(data.responseText);
    });
}

function deletePet(e, id) {
    $.post('deletepet', {id: id}, function(data) {
        getPets();
    }).fail(function(data) {
        $('#errors').html(data.responseText);
    });
    
    // Disable other click events
    var event = e || window.event;
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}

$(function() {
    getPets();
});