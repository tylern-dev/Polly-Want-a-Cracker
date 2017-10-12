$('document').ready(function(){
    var userSignedIn = $('.player').data('id');
    var tableBodyContainer = $('#player-score');
    var userScoreContainer = $('.player-table-container');
    var formContainter = $('.form-container');
    

    //buildes the user table if user is logged in
    function buildTable(){
        if(userSignedIn){
            getScore(userSignedIn);

        } else {
            userScoreContainer.remove();
            formContainter.append(
                `
                <div class="not-Signed-in">
                <p class="table-heading">Please login to view your top scores</p>
                <form action="/signin-scores" method="POST">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@email.com" name="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password">
                    </div>
                    <button type="submit" id="submit-btn">View Your Scores</button>
                </form>
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