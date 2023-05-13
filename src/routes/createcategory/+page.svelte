<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
	import CategoryForm from '$lib/CategoryForm.svelte';
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <img alt="Compass" src="/compass.png" width="300" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Add new Category!</h1>
        <CategoryForm />
    </div>
</div>