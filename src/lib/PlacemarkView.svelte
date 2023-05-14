<script>
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service";
    import { page } from "$app/stores";
    import UploadWidget from "./UploadWidget.svelte";
  
   const placemarkId = $page.params.placemarkId
  
    let placemark = {
        _id: "",
        placemarkName : "",
        description: "",
        latitude: "",
        longitude: "",
        img: ""
    };
    onMount(async () => {
        placemark = await placemarkService.getPlacemark(placemarkId);
    });
  </script>

<section class="section columns is-vcentered">
    <div class="column has-text-centered">
<table class="table is-fullwidth">
 <thead>
   <tr>
     <th>Name</th>
     <th>Description</th>
     <th>Latitude</th>
     <th>Longitude</th>
   </tr>
 </thead>
 <tbody>
     <tr>
       <td>
         {placemark.placemarkName}
       </td>
       <td>
         {placemark.description}
       </td>
       <td>
         {placemark.latitude}
       </td>
       <td>
        {placemark.longitude}
      </td>
     </tr>
 </tbody>
</table>
</div>
<div>

</div>
 <div class="column">
    <div class="card">
        <div class="card-image">
          <figure class="image is-256x256">
            <img src={placemark.img} alt="No image available"/>
          </figure>
        </div>
     </div>
     <UploadWidget />
 </div>
 
</section>