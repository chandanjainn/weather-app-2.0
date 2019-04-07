console.log('Client side javascript file is loaded!');

const userInput = document.querySelector('input');
const weatherForm = document.querySelector('form');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherForm.addEventListener('submit', event => {
	event.preventDefault();
	p1.innerHTML = 'Loading...';
	p2.innerHTML = '';

	fetch('/weather?address=' + userInput.value).then(
		response => {
			response.json().then(data => {
				if (data.error) {
					p1.innerHTML = data.error;
				} else {
					p1.innerHTML =
						'Longitude=' +
						data.longitude +
						'</br>Latitude= ' +
						data.latitude +
						'</br>Location= ' +
						data.location;
					p2.innerHTML =
						'Weather Forecast:- It will be ' +
						data.forecast +
						'</br>It is ' +
						data.temperature +
						' C ' +
						'out there.';
				}
			});
		},
		onRejection => {
			if (onRejection) {
				p1.innerHTML = 'Please check your internet connection!';
			}
		}
	);
});
