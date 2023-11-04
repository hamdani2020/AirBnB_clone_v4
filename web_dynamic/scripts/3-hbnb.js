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
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      dataType: 'json',
      data: '{}',
      contentType: 'application/json',
      success: function (data) {
        for (let j = 0; j < data.length; j++) {
          let place = data[j];
          $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
  });
