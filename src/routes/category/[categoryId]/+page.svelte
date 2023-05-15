<script>
	import Header from '$lib/Header.svelte';
	import PlacemarkList from '$lib/PlacemarkList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import { page } from '$app/stores';
	import PlacemarkForm from '$lib/PlacemarkForm.svelte';

	const categoryId = $page.params.categoryId;
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<img alt="London Bridge" src="/london.png" width="400" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemarks</h1>
		<PlacemarkList />
	</div>
</div>

<div>
	<PlacemarkForm />
</div>
