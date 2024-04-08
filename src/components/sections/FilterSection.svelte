<script lang="ts">
	import FilterListItem from '../reusables/FilterListItem.svelte';

	export let colourList: any[];
	export let handleFilter: (option: string, filter: string | boolean) => void;
	export let reset: () => void;

	let hasChanged = false;

	function handleClearAll() {
		hasChanged = !hasChanged;

		reset();
	}
</script>

<section class="todo-filters-container">
	<h2>Filters</h2>
	{#key hasChanged}
		<section>
			{#if colourList.length}
				<h5>Colour filters</h5>
			{/if}

			{#each colourList as colourListItem (colourListItem)}
				<FilterListItem
					optionType="colour"
					optionLable={colourListItem}
					optionValue={colourListItem}
					{handleFilter}
				/>
			{/each}
		</section>
		<section>
			<h5>Todo state filters</h5>

			<FilterListItem
				optionType="option"
				optionLable="resolved"
				optionValue={true}
				{handleFilter}
			/>

			<FilterListItem
				optionType="option"
				optionLable="unresolved"
				optionValue={false}
				{handleFilter}
			/>
		</section>
	{/key}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<md-elevated-button on:click={() => handleClearAll()}>Clear filters</md-elevated-button>
</section>

<style>
	.todo-filters-container {
		border: 1px solid black;
		height: fit-content;

		padding: 15px;

		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.todo-filters-container h2{
		margin: 0;
	}
</style>
