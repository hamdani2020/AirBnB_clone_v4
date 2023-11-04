$(document).ready(function () {
    let chAmenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        chAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete chAmenities[$(this).data('id')];
      }
      let ls = Object.values(chAmenities);
      if (ls.length > 0) {
        $('div.amenities > h4').text(Object.values(chAmenities).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
  });
