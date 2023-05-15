<script>
	import TitleBar from '$lib/TitleBar.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import Chart from 'svelte-frappe-charts';
	import { onMount } from 'svelte';
	import { placemarkService } from '../../services/placemark-service';
	import { category } from '../../stores';

	let chartType = 'pie';

	let placemarksByCategory = {
		labels: [],
		datasets: [
			{
				values: [0, 0]
			}
		]
	};

	let chartRef;
	const onExport = () => chartRef.exportChart();

	onMount(async () => {
		let categories = await placemarkService.getCategories();
		let placemarks = await placemarkService.getAllPlacemarks();

		placemarksByCategory.labels = [];
		categories.forEach((category) => {
			placemarksByCategory.labels.push(category.categoryName);
			placemarksByCategory.datasets[0].values.push(0);
		});
		categories.forEach((category, i) => {
			placemarks.forEach((placemark) => {
				if (placemark.categoryid == category._id) {
					placemarksByCategory.datasets[0].values[i] += 1;
				}
			});
		});
	});

	function setBar() {
		chartType = 'bar';
	}

	function setPie() {
		chartType = 'pie';
	}

	function setLine() {
		chartType = 'line';
	}
</script>

<div class="columns is-vcentered">
	<div class="column is-half">
		<TitleBar subTitle={'Make your mark'} title={'Placemark Analytics'} />
	</div>
	<div class="column">
		<MainNavigator />
	</div>
</div>

<section class="box">
	<div class="columns">
		<div class="column has-text-centered">
			<h1 class="title is-4">Placemarks by Category</h1>
			<div class="field">
				<button class="button is-link is-light" on:click={setPie}>Pie Chart</button>
				<button class="button is-link is-light" on:click={setBar}>Bar Chart</button>
				<button class="button is-link is-light" on:click={setLine}>Line Graph</button>
			</div>
			{#key chartType}
				<Chart data={placemarksByCategory} type={chartType} bind:this={chartRef} />
				<button class="button is-success is-light" on:click={onExport}> Export </button>
			{/key}
		</div>
	</div>
</section>
