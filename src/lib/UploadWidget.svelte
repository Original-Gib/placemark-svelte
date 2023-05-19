<script>
	//imports
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';
	import ImageGallery from './ImageGallery.svelte';
	import { PUBLIC_CLOUDNAME } from '$env/static/public';
	import { PUBLIC_UPLOADPRESET } from '$env/static/public';

	//defining a variable for the widget
	let widget;

	//defining placemarkID from the url
	let placemarkId = $page.params.placemarkId;

	// defining the placemark object
	let placemark = {
		_id: $page.params.placemarkId,
		placemarkName: '',
		description: '',
		latitude: '',
		longitude: '',
		img: ''
	};

	// onmount function to get the placemark details
	onMount(async () => {
		placemark = await placemarkService.getPlacemark(placemarkId);
	});

	//second on mount function to get create the cloudinary upload widget. The script to add this to the page has been inserted in the app.html file
	onMount(async () => {
		if ('cloudinary' in window) {
			widget = window.cloudinary.createUploadWidget(
				{
					cloudName: 'dhwut9fbv',
					uploadPreset: 'gk5i7qmj',
					tags: ['Placemarks']
				},
				(error, result) => {
					// if the response from the result is success then the placemark will update and add the url from the response and this will then trigger the upload image method
					if (result.event === 'success') {
						placemark = {
							_id: $page.params.placemarkId,
							placemarkName: placemark.placemarkName,
							description: placemark.description,
							latitude: placemark.latitude,
							longitude: placemark.longitude,
							img: result.info.url
						};
						console.log(placemark);
						placemarkService.uploadImage(placemark);
						location.reload();
					}
				}
			);
			console.log(widget);
		}
	});

	// function to open the widget once the button is clicked
	function handleClick() {
		if (widget) {
			widget.open();
		}
	}
</script>

<!-- button for the upload widget -->
<button on:click|preventDefault={handleClick} class="button is-link">Upload Image</button>
