<script>
    import Header from '$lib/Header.svelte';
    import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<Header>
    <WelcomeNavigator />
</Header>

<div class="columns is-vcentered content">
    <div class="column has-text-centered">
        <figure class="image">
            <img class="is-rounded" src="/cover_image.jpg" alt="Hand holding phone with map">
          </figure>
    </div>
    <div class="column">
        <h1 class="title">Welcome to Placemark</h1>
        <p>Document and save your favourite places</p>
    </div>
</div>