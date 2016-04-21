$(document).ready(function() {

    //begin variable listing
    var user = $('#user');
    var password = $('#password');
    var userRegister = $('#registerUsername');
    var profileName = $('#registerProfileName');
    var passwordRegister = $('#registerPassword');
    var confirmPasswordRegister = $('#registerConfirmPassword');
    var modalTextContainer = $('#modalTextContainer');
    var valid = false;
    var alreadyRegister = false;

    sessionStorage.clear();

    function cleanRegisterPasswords() {
        passwordRegister.val('');
        confirmPasswordRegister.val('');
    }

    function cleanLoginInputs() {
        user.val("");
        password.val("");
    }

    function cleanModalText() {
        modalTextContainer.val('');
    }

    //Click do Login
    $('#buttonLogIn').click(function() {

        /*Vai buscar os dados a base de dados*/
        $.ajax({
            url: 'https://api.mlab.com/api/1/databases/logins_todo/collections/users?apiKey=9nvWg_CvjsBUbgv3cuWAY3dyI7iHGnZX',
        }).done(function(data, index) {
            /**
             * Se conseguir receber os dados da base de dados.
             *
             * Vai correr por cada um dos dados e ver se o user e pass
             * correspondem a que esta na base de dados.
             * Return valid se tudo tiver bem.
             */
            $.each(data, function(key, data) {
                if (user.val() === data.user && password.val() === data.password) {
                    valid = true;
                    //TODO: Ver se isto esta funcionar correctamente
                    window.sessionStorage.setItem("_id", JSON.stringify(data._id.$oid));
                }
            });

            if (valid === true) //Se user e pass valido faz load da Homepage
            {
              window.open('/pages/homepage.html', '_self', false);
            } else //Se nao limpa as textbox e adiciona as classes seguintes para mostrar que esta mal
            {
                cleanLoginInputs();
                $('.input-group').addClass('has-error');
                $('#wrongIconUser').removeClass('wrongIcon');
                $('#wrongIconPassword').removeClass('wrongIcon');
                user.focus();
            }
        });
    }); //end buttonLogin


    //Click do Register
    $('#buttonAddRegister').on('click', function() {

        //              GET
        //Vai buscar os dados a base de dados
        $.ajax({
            url: 'https://api.mlab.com/api/1/databases/logins_todo/collections/users?apiKey=9nvWg_CvjsBUbgv3cuWAY3dyI7iHGnZX',
        }).done(function(data, index) {
            $.each(data, function(key, data) {
                if (userRegister.val() === data.user) {
                    //TODO: Se tiver na base de dados o user introduzido entao Return alreadyRegister=false
                    alreadyRegister = true;
                    cleanModalText();
                    modalTextContainer.val('User already existe.');
                    cleanRegisterPasswords();
                }
            });

            /**
             * 									POST
             *
             * Se nao estiver registado e a pass e a confirmpass tiverem bem
             * entao faz post para a base de dados do user e pass introduzidas
             */
            if (alreadyRegister === false && profileName.val() != '') {
                if (passwordRegister.val() === confirmPasswordRegister.val()) {
                    $.ajax({
                        url: 'https://api.mlab.com/api/1/databases/logins_todo/collections/users?apiKey=9nvWg_CvjsBUbgv3cuWAY3dyI7iHGnZX',
                        type: "POST",
                        data: JSON.stringify({
                            "user": userRegister.val(),
                            "password": passwordRegister.val(),
                            "profileName": profileName.val()
                        }),
                        contentType: "application/json",
                        success: function() {
                            $('#registerModal').modal('hide');
                        },
                        error: function(xhr, status, error) {
                            console.log(err);
                        }
                    }); //fim do ajax POST
                } //fim do segundo if Pass
                else {
                    alert("password not the same");
                    cleanModalText();
                    modalTextContainer.val('The password confirmation does not match.');
                    cleanRegisterPasswords();
                }

            } //do primeiro if
            else {
              cleanModalText();
              cleanRegisterPasswords();
              modalTextContainer.val('Enter a Profile Name.');
            }
        });
    }); //end click register


    //Focus on Modal show
    $('#registerModal').on('shown.bs.modal', function() {
        userRegister.focus();
    });

    //Focus on user when modal closed
    $('#registerModal').on('hidden.bs.modal', function() {
        user.focus();
    });

    //On enter on password same as log In
    password.keypress(function(e) {
        if (e.which === 13) {
            $('#buttonLogIn').click();
        }
    });


}); //end document.ready
