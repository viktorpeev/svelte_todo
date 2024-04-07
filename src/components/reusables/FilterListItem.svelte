<script lang="ts">
	export let optionType: 'option' | 'colour';
	export let optionLable: string;
	export let optionValue: string | boolean;
	export let handleFilter: (option: string, filter: string | boolean) => void;

</script>

<input
	on:click={() => handleFilter(optionType, optionValue)}
	id={`todo-filter-${optionLable}`}
	type="checkbox"
/>
<label for={`todo-filter-${optionLable}`}>{optionLable}</label><br />

<style></style>
