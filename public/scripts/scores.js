$('document').ready(function(){
    var userSignedIn = $('.player').data('id');
    var tableBodyContainer = $('#player-score');
    tableBodyContainer.append(`<tr><td>`);


    function getScore(userId){
        $.ajax({
            type: "GET",
            url: `/api/scores/${userId}`
        }).done(function(data){
            console.log(data)
        })
    }

    getScore(userSignedIn)

})