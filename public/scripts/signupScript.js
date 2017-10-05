(function(){
    var firstName = $('#first-name').val().trim();
    var lastName = $('#last-name').val().trim();
    var playerEmail = $('#email').val().trim();
    var playerCharacter;


    var NewUser = function(fname, lname, email, character){
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.character = character;
    }


    
    console.log(playerCharacter)

    function buildPlayerProfile(){
        $('#register-form input').on('change', function() {
            playerCharacter = $('input[name=parrot-select]:checked', '#register-form').val(); 
        });

    };

    buildPlayerProfile();
    
    

}());

