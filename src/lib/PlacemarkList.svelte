<script>
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';

	const categoryId = $page.params.categoryId;

	let placemarkList = [];
	onMount(async () => {
		placemarkList = await placemarkService.getPlacemarks(categoryId);
	});
</script>

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
