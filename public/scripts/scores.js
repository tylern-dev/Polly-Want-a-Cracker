$('document').ready(function(){
    var userSignedIn = $('.player').data('id');
    var tableBodyContainer = $('#player-score');
    var userScoreContainer = $('#user-scores');
    tableBodyContainer.append(`<tr><td>`);

    //buildes the user table if user is logged in
    function buildTable(){
        if(userSignedIn){
            getScore(userSignedIn);

        } else {
            userScoreContainer.append(
                `
                <div class="not-Signed-in">
                <p>Please login to view your personal scores</p>
                </div>
                `
            )
        }
    }

    // ajax call to retrieve data from DB 
    function getScore(userId){
        $.ajax({
            type: "GET",
            url: `/api/scores/${userId}`
        }).done(function(data){
            // console.log(data)
            getTableData(data);

        });
    }

    // parses the data from the ajax call and builds the table 
    function getTableData(data){
        for(var i =0; i<data.length; i++){
            tableBodyContainer.append(
                `<tr>
                <td class="counter"></td>
                <td>${data[i].user.firstname}</td>
                <td>${data[i].score}</td>
                </tr>
                `
            );
        }
    }

    // runs the program
    buildTable();
})