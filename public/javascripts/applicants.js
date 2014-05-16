$(document).on('ready', function() {
    $(document).on('click', '.delete-applicant', function() {
        $(this).attr('disabled', 'disabled');
        var id = $(this).data('id');

        console.log('attempting to delete-', id);

        $.post('/applicants/' + id + '/delete', function(data) {
            console.log(data);
            if (data.success === 'success') {
                $('.applicant[data-id="' + data.id + '"]').fadeOut(1250, function() {
                    $(this).remove()
                });
                return;
            }
            $(this).removeAttr('disabled');
        })

    })
})