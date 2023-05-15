<script>
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';

	let categoryList = [];
	onMount(async () => {
		categoryList = await placemarkService.getCategories();
	});
</script>

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
