<script>
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';

	let myGallery;

	onMount(async () => {
		myGallery = cloudinary.galleryWidget({
			container: '#my-gallery',
			cloudName: 'dhwut9fbv',
			mediaAssets: [{ tag: 'Placemarks' }]
		});

		myGallery.render();
	});
</script>

<div id="my-gallery" style="max-width:80%;margin:auto" />
