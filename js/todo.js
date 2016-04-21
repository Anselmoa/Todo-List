$(document).ready(function() {

    /*
      Funcao de adicionar Eventos ao Event Container

      Apos clickar no button que esta dentro do modal, este
      vai pegar no title e description e vai fazer append
      para o Event Container.
    */
    $('#buttonAddEvent').on('click', function() {
        var title = $('#title-Container').val();
        var description = $('#description-Container').val();

        $('#eventContainer').append(
            '<li class="list-group-item tarefa-list">' +
            '<input type="checkbox" name="tarefas" class="buttonTodo" />' +
            '<label>' + title + '</label>' +
            '<p class="description-Paragraph">(' + description + ')</p>' +
            '<button type="button" class="close close-Lists" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '</li>');

        $('#myModal').modal('hide');
    });

    /*
      Funcao em que quando se clickar nos buttons este vai
      adicionar a class checked em que esta vai riscar o
      title e a description dessa lista
    */
    $('.list-group').on('click', '.buttonTodo' ,function() {
        var current = $(this).next();
        current.toggleClass('checked');
        current.next().toggleClass('checked');
    });

    /*
      Funao para remover a lista

      Ao clickar na cruz de uma lista essa mesma lista e removida
    */
    $(".list-group").on('click', '.close-Lists' ,function() {
        $(this).parent().remove();
    })

}); //end document.ready
