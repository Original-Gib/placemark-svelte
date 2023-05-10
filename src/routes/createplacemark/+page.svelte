<script>
    import Header from '$lib/Header.svelte';
    import PlacemarkForm from '$lib/PlacemarkForm.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
</script>

<Header>
    <MainNavigator />
</Header>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <img alt="Compass" src="/compass.png" width="300" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Add new Placemark!</h1>
        <PlacemarkForm />
    </div>
</div>