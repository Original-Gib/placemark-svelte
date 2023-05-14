<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores"
    import Header from '$lib/Header.svelte';
    import CategoryList from '$lib/CategoryList.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
	import ImageGallery from "$lib/ImageGallery.svelte";
  
    
  </script>
  
  <Header>
    <MainNavigator />
  </Header>

  <div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Your Placemark Gallery</h1>
        <ImageGallery />
    </div>
  </div>