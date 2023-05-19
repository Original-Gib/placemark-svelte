<script>
	// imports
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';

	// defining array variable for the category list
	let categoryList = [];

	// on mount function which adds data to the category list via the getCategories function in placemark service
	onMount(async () => {
		categoryList = await placemarkService.getCategories();
	});
</script>

<!-- table to display the list of categories -->
<table class="table is-fullwidth is-hoverable">
	<thead>
		<th>Name</th>
		<th />
	</thead>
	<tbody>
		{#each categoryList as category}
			<tr>
				<td class="has-text-left">
					{category.categoryName}
				</td>
				<td>
					<a href="/category/{category._id}" class="button">
						<span class="icon is-small">
							<i class="fas fa-folder-open" />
						</span>
					</a>
					<a href="/deletecategory/{category._id}" class="button">
						<i class="fas fa-trash" />
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
