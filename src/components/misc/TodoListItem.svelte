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
		<section>
			<button on:click={() => handleRemove(todo.id)}>x</button>
			<button on:click={() => handleColourDialogOpen()}>C</button>
		</section>
	</section>

	<section>
		<script src="https://esm.run/@material/web/all.js" type="module"></script>
		<md-dialog open={dialogIsOpen} closed={(dialogIsOpen = false)}>
			<form slot="content" id={`todo-form-${todo.id}`} method="dialog">Pick a custom color:</form>

			<div slot="actions">
				<button
					form={`todo-form-${todo.id}`}
					on:click={() => handleColourSelection(todo.id, 'lightblue')}>blue</button
				>
				<button
					form={`todo-form-${todo.id}`}
					on:click={() => handleColourSelection(todo.id, 'yellow')}>yellow</button
				>
				<button
					form={`todo-form-${todo.id}`}
					on:click={() => handleColourSelection(todo.id, 'lightgreen')}>green</button
				>
				<button
					form={`todo-form-${todo.id}`}
					on:click={() => handleColourSelection(todo.id, 'transparent')}>none</button
				>
			</div>
		</md-dialog>
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
