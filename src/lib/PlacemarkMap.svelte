<script>
	// imports
	import { LeafletMap } from '../services/leaflet-map';
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	// @ts-ignore
	import * as L from 'leaflet';
	import { PUBLIC_OPEN_WEATHER_API_KEY } from '$env/static/public';

	//defining the defaul location for the map and default zoom
	const mapConfig = {
		location: { lat: 53.160858, lng: -6.266 },
		zoom: 7,
		minZoom: 1
	};

	//variable to get the open weather map clouds overlay
	var OpenWeatherMap_Clouds = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: '5416c905f10d94676e8dccc6866f5311',
			opacity: 0.5
		}
	);
	//variable to get the open weather map pressure overlay
	var OpenWeatherMap_Pressure = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: '5416c905f10d94676e8dccc6866f5311',
			opacity: 0.5,
			showLegend: true
		}
	);
	//variable to get the open weather map wind overlay
	var OpenWeatherMap_Wind = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: '5416c905f10d94676e8dccc6866f5311',
			opacity: 0.5
		}
	);

	//variable to get the open weather map temperature overlay
	var OpenWeatherMap_Temp = L.tileLayer(
		'http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apiKey}',
		{
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			apiKey: '5416c905f10d94676e8dccc6866f5311',
			opacity: 0.5
		}
	);

	// on mount function to create a new map, add each of the overlays to it and then add a new layer group for each category. The function will then add placemarks
	// each of the placemarks ithin the categories
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

<!-- Div for the placemark map  -->
<div class="box" id="placemark-map" style="height:75vh" />
