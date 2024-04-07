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

	const forceUpdate = async (_: any) => {};
	let doRerender = 0;

	TodoStore.subscribe((data) => {
		todoList = data;
		todoListCopy = todoList;

		if (colourFilter.length || optionFilters.length) {
			todoListCopy = todoList.filter(
				(todo) => colourFilter.includes(todo.colour) || optionFilters.includes(todo.completed)
			);
		}

		console.log(todoListCopy);
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
				return [...todos, { title: inputValue }];
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

	function handleClearAll() {
		doRerender++;
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
		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				return { ...todo, completed: true };
			})
		);
	}

	function handleDeselectAll() {
		TodoStore.update((todos) =>
			todos.map((todo: any) => {
				return { ...todo, completed: false };
			})
		);
	}

	function RemoveAllTodos() {
		TodoStore.update(() => {
			return [];
		});
	}
</script>

<section style="display: flex">
	<section>
		<input on:keydown={handleKeydown} id="todoInput" bind:value={inputValue} />

		{#each todoListCopy as todo (todo.id)}
			{#if todo.title}
				<TodoListItemSection {todo} {handleSelect} {handleRemove} {handleColourSelection} />
			{/if}
		{/each}
	</section>
	{#await forceUpdate(doRerender) then _}
		<FilterSection {colourList} {handleFilter} {handleClearAll} />
	{/await}
	<section>
		<button on:click={() => handleSelectAll()}>select all</button>
		<button on:click={() => handleDeselectAll()}>Deselect all</button>
		<button on:click={() => RemoveAllTodos()}>Remove all</button>
	</section>
</section>

<style>
</style>
