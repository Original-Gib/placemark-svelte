<script>
	//imports
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';

	// variable to get the category id from the page url
	const categoryId = $page.params.categoryId;

	//variable for the placemark list array
	let placemarkList = [];

	// on mount function calls the get placemarks function from the placemark services file and passes in the category id
	onMount(async () => {
		placemarkList = await placemarkService.getPlacemarks(categoryId);
	});
</script>

<!-- table to display the placemark list  -->
<table class="table is-fullwidth is-hoverable">
	<thead>
		<th>Name</th>
		<th />
	</thead>
	<tbody>
		{#each placemarkList as placemark}
			<tr>
				<td class="has-text-left">
					{placemark.placemarkName}
				</td>
				<td>
					<a href="/category/{categoryId}/placemark/{placemark._id}" class="button">
						<span class="icon is-small">
							<i class="fas fa-folder-open" />
						</span>
					</a>
					<a href="/category/{categoryId}/deleteplacemark/{placemark._id}" class="button">
						<i class="fas fa-trash" />
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
