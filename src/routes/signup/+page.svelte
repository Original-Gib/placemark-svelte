<script>
	//imports
	import Header from '$lib/Header.svelte';
	import SignupForm from '$lib/SignupForm.svelte';
	import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<!-- header for the main navigator -->
<Header>
	<WelcomeNavigator />
</Header>

<!-- div to house the signup form -->
<div class="columns">
	<div class="column">
		<div class="box">
			<h1 class="title">Sign Up</h1>
			<SignupForm />
		</div>
	</div>
	<div class="column has-text-centered">
		<img alt="eifel tower" src="/etower.png" width="500" />
	</div>
</div>
