<script>
	//imports
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/Header.svelte';
	import CategoryList from '$lib/CategoryList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
</script>

<!-- header to contain the main navigation -->
<Header>
	<MainNavigator />
</Header>

<!-- div to contain the category list components  -->
<div class="columns">
	<div class="column has-text-centered">
		<img alt="London Bridge" src="/london.png" width="400" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Categories</h1>
		<CategoryList />
	</div>
</div>
