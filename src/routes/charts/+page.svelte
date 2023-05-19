<script>
	//imports
	import TitleBar from '$lib/TitleBar.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import Chart from 'svelte-frappe-charts';
	import { onMount } from 'svelte';
	import { placemarkService } from '../../services/placemark-service';
	import { category } from '../../stores';

	//setting the default chart type to pie chart
	let chartType = 'pie';

	//defining the data for the chart
	let placemarksByCategory = {
		labels: [],
		datasets: [
			{
				values: [0, 0]
			}
		]
	};

	//defining the chart reference variable for the export option on the chart
	let chartRef;
	// export function to export the current chart
	const onExport = () => chartRef.exportChart();

	//onmount function fills the data for the chart by iterating over the placemarks and the categories
	onMount(async () => {
		let categories = await placemarkService.getCategories();
		let placemarks = await placemarkService.getAllPlacemarks();

		// adding the categories to the labels for each category returned
		placemarksByCategory.labels = [];
		categories.forEach((category) => {
			placemarksByCategory.labels.push(category.categoryName);
			placemarksByCategory.datasets[0].values.push(0);
		});
		//for each placemark in each of the categories add 1 to the values data set
		categories.forEach((category, i) => {
			placemarks.forEach((placemark) => {
				if (placemark.categoryid == category._id) {
					placemarksByCategory.datasets[0].values[i] += 1;
				}
			});
		});
	});

	//function to change chart type to a bar chart
	function setBar() {
		chartType = 'bar';
	}

	//function to change chart type to a pie chart
	function setPie() {
		chartType = 'pie';
	}

	//function to change chart type to a line chart
	function setLine() {
		chartType = 'line';
	}
</script>

<!-- Div for the main title view -->
<div class="columns is-vcentered">
	<div class="column is-half">
		<TitleBar subTitle={'Make your mark'} title={'Placemark Analytics'} />
	</div>
	<div class="column">
		<MainNavigator />
	</div>
</div>

<!-- div for the chart and chart type control buttons  -->
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
