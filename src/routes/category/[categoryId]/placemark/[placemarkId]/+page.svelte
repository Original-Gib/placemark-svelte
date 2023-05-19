<script>
	//imports
	import Header from '$lib/Header.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import PlacemarkView from '$lib/PlacemarkView.svelte';
</script>

<!-- displaying the main navigatior inside the page header -->
<Header>
	<MainNavigator />
</Header>

<!-- div to handle the placemark view component -->
<div class="columns">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemark</h1>
		<PlacemarkView />
	</div>
</div>
