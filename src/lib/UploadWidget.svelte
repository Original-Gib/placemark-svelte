<script>
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';
	import ImageGallery from './ImageGallery.svelte';
	import { PUBLIC_CLOUDNAME } from '$env/static/public';
	import { PUBLIC_UPLOADPRESET } from '$env/static/public';

	let widget;

	let placemarkId = $page.params.placemarkId;

	let placemark = {
		_id: $page.params.placemarkId,
		placemarkName: '',
		description: '',
		latitude: '',
		longitude: '',
		img: ''
	};

	onMount(async () => {
		placemark = await placemarkService.getPlacemark(placemarkId);
	});

	onMount(async () => {
		if ('cloudinary' in window) {
			widget = window.cloudinary.createUploadWidget(
				{
					cloudName: PUBLIC_CLOUDNAME,
					uploadPreset: PUBLIC_UPLOADPRESET,
					tags: ['Placemarks']
				},
				(error, result) => {
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

	function handleClick() {
		if (widget) {
			widget.open();
		}
	}
</script>

<button on:click|preventDefault={handleClick} class="button is-link">Upload Image</button>
