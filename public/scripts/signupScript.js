(function(){
    var firstName = $('#first-name').val().trim();
    var lastName = $('#last-name').val().trim();
    var playerEmail = $('#email').val().trim();
    var playerCharacter;


    var NewUser = function(fname, lname, email, character){
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.character = character
    }

    function buildPlayerProfile(){
        $('body').on('click','#parrot-choose', function(event){
            console.log(event.currentTarget.value)
        })
    }

    buildPlayerProfile();
    
    

}());

