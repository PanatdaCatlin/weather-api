// API call with AJAX
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.ajax({
//       url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf6ba3f84b8d27dd70d0d6241554a556
// `,
//       type: 'GET',
//       data: {
//         format: 'json'
//       },
//       success: function(response) {
//         $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//         $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
//       },
//       error: function() {
//         $('#errors').text("There was an error processing your request. Please try again.")
//       }
//     });
//   });
// });

//API call with javascript XMLHttpRequest

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//
//     let request = new XMLHttpRequest();
//     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf6ba3f84b8d27dd70d0d6241554a556
// `;
//
//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         let response = JSON.parse(this.responseText);
//         getElements(response);
//       }
//     }
//
//     request.open("GET", url, true);
//     request.send();
//
//     getElements = function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }
//   });
// });
//
//  used jQuery to wrap async code in a promise

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf6ba3f84b8d27dd70d0d6241554a556`).then(function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }).fail(function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
//     });
//   });
// });
//
// Promise in ES6

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//
//     let promise = new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf6ba3f84b8d27dd70d0d6241554a556`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(Error(request.statusText));
//         }
//       }
//       request.open("GET", url, true);
//       request.send();
//     });
//
//     promise.then(function(response) {
//       body = JSON.parse(response);
//       $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
//     }, function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//   });
// });

// Chaining Promises

let weatherKey = 'cf6ba3f84b8d27dd70d0d6241554a556';
let giphyKey = 'zYM2ZvSaitJLBp1oS1W4nqdjR2O7Cioc';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    function weatherCall() {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    function giphyCall(humidity) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://api.giphy.com/v1/gifs/search?q=${humidity}&api_key=${giphyKey}&limit=5`

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    weatherCall()
    .then(function(response) {
      let body = JSON.parse(response);
      let humidity = body.main.humidity;
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      return giphyCall(humidity);
    })
    .then(function(response) {
      let giphyResponse = JSON.parse(response);
      let image = giphyResponse["data"][0]["images"]["downsized"]["url"];
      $('.showImage').html(`<img src='${image}'>`);

    });
  });
});
