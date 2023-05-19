<script>
	//imports
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { placemarkService } from '../../../services/placemark-service';

	//defining the category ID from the page url
	const categoryId = $page.params.categoryId;

	//calling the delete category function and passing in the category id
	placemarkService.deleteCategory(categoryId);

	//redirecting the dashboard
	goto('/dashboard');
</script>
