<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores"
    import { placemarkService } from "../../../services/placemark-service";

    const categoryId = $page.params.categoryId;

    placemarkService.deleteCategory(categoryId);
    
    goto("/dashboard");
</script>