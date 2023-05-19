<script lang="ts">
	//imports
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { placemarkService } from '../services/placemark-service';

	//defining variables
	let placemarkName = '';
	let description = '';
	let latitude = '';
	let longitude = '';
	let errorMessage = '';
	let categoryId = $page.params.categoryId;

	//function which uses the create placemark function from the placemark service file to create a new placemark based on the data entered into it
	async function createplacemark() {
		console.log(`attempting to create placemark: ${placemarkName}`);
		let success = await placemarkService.createPlacemark(
			categoryId,
			placemarkName,
			description,
			latitude,
			longitude
		);
		if (success) {
			location.reload();
		} else {
			errorMessage = 'Error Trying to create placemark';
		}
	}
</script>

<!-- form to enter the placemark details  -->
<form class="box" on:submit|preventDefault={createplacemark}>
	<h1>Enter Placemark Details:</h1>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<input
					bind:value={placemarkName}
					id="placemarkName"
					class="input"
					type="text"
					placeholder="Enter placemark name"
					name="placemarkName"
				/>
			</div>
			<div class="field">
				<input
					bind:value={description}
					id="description"
					class="input"
					type="text"
					placeholder="Enter description"
					name="description"
				/>
			</div>
			<div class="field">
				<input
					bind:value={latitude}
					id="latitude"
					class="input"
					type="text"
					placeholder="Enter latitude"
					name="latitude"
				/>
			</div>
			<div class="field">
				<input
					bind:value={longitude}
					id="longitude"
					class="input"
					type="text"
					placeholder="Enter longitude"
					name="longitude"
				/>
			</div>
		</div>
	</div>
	<button class="button is-link">Create Placemark</button>
</form>
{#if errorMessage}
	<div class="section">
		{errorMessage}
	</div>
{/if}
