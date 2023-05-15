<script>
	import 'leaflet/dist/leaflet.css';
	import { LeafletMap } from '../services/leaflet-map';
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	// @ts-ignore
	import * as L from 'leaflet';
	import { PUBLIC_OPEN_WEATHER_API_KEY } from '$env/static/public';

	const mapConfig = {
		location: { lat: 53.160858, lng: -6.266 },
		zoom: 7,
		minZoom: 1
	};

	var OpenWeatherMap_Clouds = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: PUBLIC_OPEN_WEATHER_API_KEY,
			opacity: 0.5
		}
	);

	var OpenWeatherMap_Pressure = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: PUBLIC_OPEN_WEATHER_API_KEY,
			opacity: 0.5,
			showLegend: true
		}
	);

	var OpenWeatherMap_Wind = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: PUBLIC_OPEN_WEATHER_API_KEY,
			opacity: 0.5
		}
	);

	var OpenWeatherMap_Temp = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: PUBLIC_OPEN_WEATHER_API_KEY,
			opacity: 0.5
		}
	);

	onMount(async () => {
		const map = new LeafletMap('placemark-map', mapConfig);
		map.showZoomControl();
		map.addLayer('Clouds', OpenWeatherMap_Clouds);
		map.addLayer('Pressure', OpenWeatherMap_Pressure);
		map.addLayer('Wind', OpenWeatherMap_Wind);
		map.addLayer('Temp', OpenWeatherMap_Temp);
		const categories = await placemarkService.getCategories();
		categories.forEach(async (category) => {
			map.addLayerGroup(category.categoryName);
			const placemarks = await placemarkService.getPlacemarks(category._id);
			placemarks.forEach((placemark) => {
				const placemarkStr = `${placemark.placemarkName}`;
				map.addMarker(
					{ lat: placemark.latitude, lng: placemark.longitude },
					placemarkStr,
					category.categoryName
				);
			});
		});
		map.showLayerControl();
	});
</script>

<div class="box" id="placemark-map" style="height:75vh" />
