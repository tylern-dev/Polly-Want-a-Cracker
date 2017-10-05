(function(){
    


    var NewUser = function(fname, lname, email, password, character){
        this.firstname = fname;
        this.lastname = lname;
        this.email = email;
        this.password = password;
        this.character = character;
    }
    

    function buildPlayerProfile(){
        $('#submit-btn').on('click', function(event){
            event.preventDefault();
            var firstName = $('#first-name').val().trim();
            var lastName = $('#last-name').val().trim();
            var playerEmail = $('#email').val().trim();
            var password = $('#password').val().trim();
            var character = $("input[name='parrot-select']:checked").val()
            var newPlayer = new NewUser(firstName, lastName, playerEmail, character, password);
            console.log(newPlayer)
            createPlayer(newPlayer)
            
        })
    };

    function createPlayer(player){
        $.ajax({
            type: "POST",
            url: '/signup',
            data: player
        });
    }

    buildPlayerProfile();
    
    

}());

