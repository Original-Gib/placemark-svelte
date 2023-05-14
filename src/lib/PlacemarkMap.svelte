<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
	import { placemarkService } from "../services/placemark-service";

    const mapConfig = {
        location: { lat: 53.160858, lng: -6.266 },
        zoom: 7,
        minZoom: 1
    };

    onMount(async () => {
        const map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        const categories = await placemarkService.getCategories();
        categories.forEach(async (category) => {
            map.addLayerGroup(category.categoryName);
            const placemarks = await placemarkService.getPlacemarks(category._id);
            placemarks.forEach((placemark) => {
                const placemarkStr = `${placemark.placemarkName}`;
                map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, category.categoryName);
            })
        });
        map.showLayerControl();
    });

</script>

<div class="box" id="placemark-map" style="height:75vh" />