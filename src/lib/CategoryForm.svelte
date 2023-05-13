<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "../services/placemark-service";

  let categoryName = "";
  let errorMessage = "";

  async function createcategory() {
      console.log(`attemting to create up category: ${categoryName}`);
      let success = await placemarkService.createCategory(categoryName);
      if (success) {
          goto("/dashboard");
      } else {
          errorMessage = "Error Trying to create category";
      }
  }
</script>

<form on:submit|preventDefault={createcategory}>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <input bind:value={categoryName} id="categoryName" class="input" type="text" placeholder="Enter category name" name="categoryName">
     </div>
    <div>

    </div>
    <div>
    <button class="button is-link">Create Category</button>
  </div>
</form>
{#if errorMessage}
<div class="section">
  {errorMessage}
</div>
{/if}