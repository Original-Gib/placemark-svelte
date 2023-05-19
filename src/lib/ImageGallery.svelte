<script>
	//imports
	import { onMount } from 'svelte';

	// defining the gallery variable
	let myGallery;

	// on mount function which calls the gallery widget which is entered in the app.html file
	onMount(async () => {
		myGallery = cloudinary.galleryWidget({
			container: '#my-gallery',
			cloudName: 'dhwut9fbv',
			mediaAssets: [{ tag: 'Placemarks' }]
		});

		myGallery.render();
	});
</script>

<!-- div to contain the gallery widget  -->
<div id="my-gallery" style="max-width:80%;margin:auto" />
