$(document).ready(function() {

    //begin variable listing
    var min;
    var hour;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var newDate = new Date();


    if (sessionStorage._id === undefined ) {
      window.open('../index.html', '_self',false);
    }

    /**
     * [Funcao para obter os minutos]
     *
     * Vai buscar os minutos atribuir a variavel minutes
     *
     * Dps vai por na tag do html com o id 'min' a data obtida
     * mas se a data obtida for menor que 10 entao ele vai por
     * um 0 atras da variavel minutes.
     * E vai actualizar a funcao de 1000 em 1000 milisegundos.
     */
    min = setInterval(function() {
        var minutes = new Date().getMinutes();
        $('#min').html((minutes < 10 ? 0 : '') + minutes);
    }, 1000);


    //Mesmo que a funcao a cima mas em vez de ser para os minutos e para as horas
    hour = setInterval(function() {
        var hours = new Date().getHours();
        $('#hours').html((hours < 10 ? 0 : '') + hours);
    }, 1000);

    /**
     * [Funcao para obter a Data]
     *
     * Vai obter a data actual e guardar essa informacao na variavel newDate.
     * Dps vai por na tag do html com o id 'Date', a data obtida.
     *
     * Esta para ver depois ver ao array mouthNames e dayNames para
     * saber o mes por extenso e o dia da semana a que esta.
     */
    newDate.setDate(newDate.getDate());
    $('#Date').html(dayNames[newDate.getDay()] + ' ' + newDate.getDay() + '  ' +
        monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());


}); //end of document.ready
