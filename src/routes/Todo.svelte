<script lang="ts">
	import { TodoStore } from '../stores/TodoStore';
	import FilterSection from '../components/sections/FilterSection.svelte';
	import TodoListItemSection from '../components/misc/TodoListItem.svelte';

	let inputValue = '';
	let todoList: any[];
	let todoListCopy: any[] = [];
	let colourFilter: any[] = [];
	let optionFilters: any[] = [];
	let colourList: any[] = [];

	TodoStore.subscribe((data) => {
		todoList = data;
		todoListCopy = todoList;

		if (colourFilter.length || optionFilters.length) {
			todoListCopy = todoList.filter(
				(todo) => colourFilter.includes(todo.colour) || optionFilters.includes(todo.completed)
			);
		}

		colourList = todoList.reduce((colourSet, todo) => {
			if (todo.colour && todo.colour !== 'transparent') {
				colourSet.add(todo.colour);
			}
			return colourSet;
		}, new Set());
	});

	function handleKeydown(event: { key: string }) {
		if (event.key == 'Enter' && inputValue.trim()) {
			TodoStore.update((todos: any[]) => {
				return [
					...todos,
					{
						title: inputValue,
						id: Math.floor(Math.random() * Date.now()).toString(16),
						completed: false
					}
				];
			});
			inputValue = '';
		}
	}

	function handleRemove(id: number) {
		const indexForRemoval = todoList.findIndex((element) => element.id === id);

		TodoStore.update((todos: any[]) => {
			todos.splice(indexForRemoval, 1);
			return todos;
		});
	}

	function handleSelect(id: number) {
		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				} else {
					return todo;
				}
			})
		);
	}

	function handleFilter(option: string, filter: string | boolean) {
		switch (option) {
			case 'colour':
				colourFilter.includes(filter)
					? colourFilter.splice(colourFilter.indexOf(filter), 1)
					: colourFilter.push(filter);
				break;

			case 'option':
				optionFilters.includes(filter)
					? optionFilters.splice(optionFilters.indexOf(filter), 1)
					: optionFilters.push(filter);
				break;
		}

		if (!colourFilter.length && !optionFilters.length) {
			todoListCopy = todoList;
			return;
		}

		todoListCopy = todoList.filter(
			(todo) => colourFilter.includes(todo.colour) || optionFilters.includes(todo.completed)
		);
	}

	function reset() {
		colourFilter = [];
		optionFilters = [];
		todoListCopy = todoList;
	}

	function handleColourSelection(id: number, colour: string) {
		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				if (todo.id === id) {
					return { ...todo, colour: colour };
				} else {
					return todo;
				}
			})
		);
	}

	function handleSelectAll() {
		let filteredTodos = todoListCopy.map((todo) => {
			return todo.id;
		});

		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				if (filteredTodos.includes(todo.id)) {
					return { ...todo, completed: true };
				}
				return todo;
			})
		);
	}

	function handleDeselectAll() {
		let filteredTodos = todoListCopy.map((todo) => {
			return todo.id;
		});

		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				if (filteredTodos.includes(todo.id)) {
					return { ...todo, completed: false };
				}
				return todo;
			})
		);
	}

	function RemoveAllTodos() {
		let filteredTodos = todoListCopy.map((todo) => {
			return todo.id;
		});

		TodoStore.update((todos) => todos.filter((todo: any) => !filteredTodos.includes(todo.id)));

		reset();
	}
</script>

<section class="todo-section">
	<FilterSection colourList={Array.from(colourList)} {handleFilter} {reset} />

	<section class="todo-list" style="background-color: white">
		<input
			on:keydown={handleKeydown}
			id="todoInput"
			bind:value={inputValue}
			placeholder="What needs to be done?"
		/>

		{#each todoListCopy as todo, index (todo.id)}
			{#if todo.title}
				{#if index == 0}
					<hr style="padding: 0; margin:0" />
				{/if}
				<TodoListItemSection {todo} {handleSelect} {handleRemove} {handleColourSelection} />
				<hr />
			{/if}
		{/each}
	</section>

	<section class="todo-action-buttons-container">
		<h2>Action Buttons</h2>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<section class="todo-action-buttons">
			<md-elevated-button on:click={() => handleSelectAll()}>Select All</md-elevated-button>
			<md-elevated-button on:click={() => handleDeselectAll()}>Deselect all</md-elevated-button>
			<md-elevated-button on:click={() => RemoveAllTodos()}>Remove all</md-elevated-button>
		</section>
	</section>
</section>

<style>
	#todoInput {
		width: 100%;
		height: 35px;
		border: none;
		margin: 0;
		padding: 0;
	}

	#todoInput:focus-visible {
		outline-width: 0;
	}

	.todo-section {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}

	.todo-action-buttons-container {
		border: 1px solid black;
		height: fit-content;

		padding: 15px;
	}

	.todo-action-buttons {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.todo-list {
		width: 50%;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		padding: 15px;
	}
</style>
