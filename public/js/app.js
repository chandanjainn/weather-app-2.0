console.log('Client side javascript file is loaded!');

const userInput = document.querySelector('input');
const weatherForm = document.querySelector('form');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherForm.addEventListener('submit', event => {
	event.preventDefault();
	p1.textContent = 'Loading...';
	p2.textContent = '';

	fetch('http://localhost:3000/weather?address=' + userInput.value).then(
		response => {
			response.json().then(data => {
				if (data.error) {
					p1.textContent = data.error;
				} else {
					p1.textContent =
						'Longitude=' +
						data.longitude +
						'Latitude= ' +
						data.latitude +
						'\r\nLocation= ' +
						data.location;
					p2.textContent =
						'Weather Forecast:- It will be ' +
						data.forecast +
						'\r\nIt is ' +
						data.temperature +
						' C ' +
						'out there.';
				}
			});
		}
	);
});
