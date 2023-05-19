<script>
	//imports
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { placemarkService } from '../../../../../services/placemark-service';

	//getting category and placemark id from the url
	const categoryId = $page.params.categoryId;
	const placemarkId = $page.params.placemarkId;

	// calling the delete placemark function from placemark services
	placemarkService.deletePlacemark(placemarkId);

	// redirecting to the category page
	goto('/category/' + categoryId);
</script>
