<script>
	//imports
	import { onMount } from 'svelte';
	import { placemarkService } from '../services/placemark-service';
	import { page } from '$app/stores';
	import UploadWidget from './UploadWidget.svelte';

	//variable to get the placemark ID from the URL
	const placemarkId = $page.params.placemarkId;

	// defining the placemark object
	let placemark = {
		_id: '',
		placemarkName: '',
		description: '',
		latitude: '',
		longitude: '',
		img: ''
	};

	//on mount to call the get placemark function using the placemark ID to return details of the placemark
	onMount(async () => {
		placemark = await placemarkService.getPlacemark(placemarkId);
	});

	// function to delete an image from the placemark
	function deleteImage() {
		placemark = {
			_id: placemark._id,
			placemarkName: placemark.placemarkName,
			description: placemark.description,
			latitude: placemark.latitude,
			longitude: placemark.longitude,
			img: ''
		};
		placemarkService.uploadImage(placemark);
	}
</script>

<!-- Section to display the placemark information -->
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
	<div />
	<div class="column">
		<div class="card">
			<div class="card-image">
				<figure class="image is-256x256">
					<img src={placemark.img} alt="No image available" />
				</figure>
			</div>
		</div>

		<!-- importing the upload widget into the placemark view  -->
		<UploadWidget />
		<button on:click|preventDefault={deleteImage} class="button is-danger">Delete Image</button>
	</div>
</section>
