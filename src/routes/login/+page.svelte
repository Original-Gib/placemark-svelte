<script>
	//imports
	import Header from '$lib/Header.svelte';
	import LoginForm from '$lib/LoginForm.svelte';
	import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<!-- header for the main navigator -->
<Header>
	<WelcomeNavigator />
</Header>

<!-- div to house the login form -->
<div class="columns">
	<div class="column has-text-centered">
		<img alt="colosseum" src="/colosseum.png" width="300" />
	</div>
	<div class="column">
		<div class="box">
			<h1 class="title">Login</h1>
			<LoginForm />
		</div>
	</div>
</div>
