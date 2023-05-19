<script>
	//imports
	import Header from '$lib/Header.svelte';
	import PlacemarkList from '$lib/PlacemarkList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import { page } from '$app/stores';
	import PlacemarkForm from '$lib/PlacemarkForm.svelte';

	//getting the category ID from the page url
	const categoryId = $page.params.categoryId;
</script>

<!-- displaying the main navigatior inside the page header -->
<Header>
	<MainNavigator />
</Header>

<!-- div to hand the placemark list component  -->
<div class="columns">
	<div class="column has-text-centered">
		<img alt="London Bridge" src="/london.png" width="400" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemarks</h1>
		<PlacemarkList />
	</div>
</div>

<!-- div to handle the placemark form component -->
<div>
	<PlacemarkForm />
</div>
