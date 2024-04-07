<script lang="ts">
	import FilterListItem from '../reusables/FilterListItem.svelte';

	export let colourList: any[];
	export let handleFilter: (option: string, filter: string | boolean) => void;
	export let handleClearAll: () => void;
</script>

<section>
	filter
	<section>
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
		<FilterListItem optionType="option" optionLable="resolved" optionValue={true} {handleFilter} />

		<FilterListItem
			optionType="option"
			optionLable="unresolved"
			optionValue={false}
			{handleFilter}
		/>
	</section>
	<button on:click={() => handleClearAll()}>clear filters</button>
</section>

<style></style>
