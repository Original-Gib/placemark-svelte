<script>
	//imports
	import { beforeUpdate } from 'svelte';
	import { placemarkService } from '../services/placemark-service';

	beforeUpdate(() => {
		placemarkService.reload();
	});
</script>

<!-- slot to load each page content -->
<div class="container">
	<slot />
</div>
