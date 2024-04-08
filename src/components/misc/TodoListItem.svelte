<script lang="ts">
	export let todo: { id: number; title: string; colour: string; completed: boolean };
	export let handleSelect: (id: number) => void;
	export let handleRemove: (id: number) => void;
	export let handleColourSelection: (id: number, colour: string) => void;

	let dialogIsOpen = false;

	function handleColourDialogOpen() {
		dialogIsOpen = true;
	}
</script>

<section class="todo_list">
	<section class="todo_item" style={`background-color: ${todo.colour ?? 'transparent'}`}>
		<section class="todo_content">
			<input
				checked={todo.completed}
				on:click={() => handleSelect(todo.id)}
				type="checkbox"
				id={todo.title}
			/>

			<label class={todo.completed ? 'completed' : ''} for={todo.title}>{todo.title}</label><br />
		</section>
		<section class="todo-mod-buttons">
			<button on:click={() => handleRemove(todo.id)}>X</button>
			<button on:click={() => handleColourDialogOpen()}>C</button>
		</section>
	</section>

	<script src="https://esm.run/@material/web/all.js" type="module"></script>
	<md-dialog open={dialogIsOpen ?? false} closed={(dialogIsOpen = false)}>
		<form slot="content" id={`todo-form-${todo.id}`} method="dialog">Pick a custom color:</form>

		<div class="todo-modal" slot="actions">
			<button
				form={`todo-form-${todo.id}`}
				on:click={() => handleColourSelection(todo.id, 'lightblue')}>Light-blue</button
			>
			<button
				form={`todo-form-${todo.id}`}
				on:click={() => handleColourSelection(todo.id, 'yellow')}>Yellow</button
			>
			<button
				form={`todo-form-${todo.id}`}
				on:click={() => handleColourSelection(todo.id, 'lightgreen')}>Light-green</button
			>
			<button
				form={`todo-form-${todo.id}`}
				on:click={() => handleColourSelection(todo.id, 'transparent')}>None</button
			>
		</div>
	</md-dialog>
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

	.todo-mod-buttons {
		width: auto;
		display: flex;
	}

	.todo-mod-buttons button {
		height: 25px;
		border: 0;
		background-color: transparent;
		cursor: pointer;
	}
	.todo-modal button {
		background-color: transparent;
		border-radius: 15px;
		cursor: pointer;
		padding: 5px;
	}
</style>
