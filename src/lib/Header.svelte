<script>
    import TitleBar from "./TitleBar.svelte";
</script>

<div class="columns is-vcentered ">
    <div class="column is-half">
        <TitleBar title={'Placemark'} subTitle={'Make your marks'} />
    </div>
    <div class="column is-half">
        <slot />
    </div>
</div>