$(document).ready(function() {

    var sideMenuToggle = 1;
    var dataDB;
    var session = JSON.parse(sessionStorage._id);


    $.ajax({
      url: 'https://api.mlab.com/api/1/databases/logins_todo/collections/users/' + session  +'?apiKey=9nvWg_CvjsBUbgv3cuWAY3dyI7iHGnZX',
      async: false
    }).done( function(data) {
      dataDB = data;
    });


    /*
      Funcao para abrir e fechar o sideMenuToggle

      Ao clickar no button SideMenuToggle este vai ver se a
      variavel sideMenuToggle.
      Se esta for igual a -1 o menu vai abrir e o button
      sideMenuToggle vai andar para a direita.

      Se esta for igual a 1 o menu vai fechar e o button
      sideMenuToggle vai andar para a esquerda, ou seja, volta
      tudo a posicao inicial
    */
    $('#sideMenuToggleButton').click(function() {
        sideMenuToggle *= -1;
        if (sideMenuToggle === -1) {
            $(this).animate({
                "left": '270px'
            }, 1000);

            $('.sideMenu').css("display", 'block')
                .animate({
                    "left": '0px'
                }, 1000);
        };
        if (sideMenuToggle === 1) {
            $(this).animate({
                "left": '10px'
            }, 1000);

            $('.sideMenu').animate({
                "left": '-260px'
            }, 1000, function() {
                $(this).css("display", 'none');
            })
        };
    });

    //Links dos buttons para as respectivas paginas
    $('#sideMenuHomePage').click(function() {
      window.open('/pages/homepage.html', '_self', false);
    });

    $('#sideMenuToDo').click(function() {
      window.open('/pages/todo.html', '_self', false);
    });

    $('#sideMenuCalendar').click(function() {
      window.open('/pages/calendar.html', '_self', false);
    });

    $('#sideMenuLogOut').click(function() {
      sessionStorage.clear();
      window.open('../index.html', '_self', false);
    });

    $('#brandIcon').click(function() {
      window.open('/pages/homepage.html', '_self', false);
    });

    $('#sideMenuProfileName').html(dataDB.profileName);

}); //End document.ready
