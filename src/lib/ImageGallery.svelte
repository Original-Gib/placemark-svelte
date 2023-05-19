<script>
	//imports
	import { onMount } from 'svelte';
	import { PUBLIC_CLOUDNAME } from '$env/static/public';

	// defining the gallery variable
	let myGallery;

	// on mount function which calls the gallery widget which is entered in the app.html file
	onMount(async () => {
		myGallery = cloudinary.galleryWidget({
			container: '#my-gallery',
			cloudName: PUBLIC_CLOUDNAME,
			mediaAssets: [{ tag: 'Placemarks' }]
		});

		myGallery.render();
	});
</script>

<!-- div to contain the gallery widget  -->
<div id="my-gallery" style="max-width:80%;margin:auto" />
