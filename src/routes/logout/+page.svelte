<script>
	//imports
	import { goto } from '$app/navigation';
	import { placemarkService } from '../../services/placemark-service';

	//calling the logout function
	placemarkService.logout();

	//redirecting to the home page
	goto('/');
</script>
