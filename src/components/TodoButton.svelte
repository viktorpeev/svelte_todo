<script lang="ts">
	export let id: number;
	export let title: string;
	export let isCompleted: boolean;
	export let handleSelect: (id: number) => void;
	export let handleRemove: (id: number) => void;
</script>

<section class="todo_item">
	<section class="todo_content">
		<input checked={isCompleted} on:click={() => handleSelect(id)} type="checkbox" id={title} />

		<label class={isCompleted ? 'completed' : ''} for={title}>{title}</label><br />
	</section>
	<section>
		<button on:click={() => handleRemove(id)}>x</button>
		<button on:click={() => handleRemove(id)}>C</button>
	</section>
</section>

<style>
	.todo_item {
		display: flex;
		justify-content: space-between;
	}

	.completed {
		color: #949494;
		text-decoration: line-through;
	}
</style>
