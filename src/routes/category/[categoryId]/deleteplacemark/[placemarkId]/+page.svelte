<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores"
    import { placemarkService } from "../../../../../services/placemark-service";

    const categoryId = $page.params.categoryId;
    const placemarkId = $page.params.placemarkId;

    placemarkService.deletePlacemark(placemarkId);
    
    goto("/category/"+categoryId);
</script>