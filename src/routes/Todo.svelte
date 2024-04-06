<script lang="ts">
	import { TodoStore } from '../stores/TodoStore';
	import TodoButton from '../components/TodoButton.svelte';

	let inputValue = '';
	let todoList: any[];
	let completedList = [] as any[];

	TodoStore.subscribe((data) => {
		todoList = data;
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

		if (completedList.includes(id)) {
			completedList.splice(completedList.indexOf(id), 1);
			completedList = completedList;
		}

		TodoStore.update((todos: any[]) => {
			todos.splice(indexForRemoval, 1);
			return todos;
		});
	}

	function handleSelect(id: number) {
		if (completedList.includes(id)) {
			completedList.splice(completedList.indexOf(id), 1);
			completedList = completedList;
		} else {
			completedList.push(id);
			completedList = completedList;
		}
	}

  function handleColour(id: number){
    
  }
</script>

<section>
	<input on:keydown={handleKeydown} id="todoInput" bind:value={inputValue} />
	<section class="todo_list">
		{#each todoList as todo}
			<!-- buttona moje da e komponent -->
			{#if todo.title}
				{#key completedList}
					<TodoButton
						id={todo.id}
						title={todo.title}
						isCompleted={completedList.includes(todo.id)}
						{handleSelect}
						{handleRemove}
					/>
				{/key}
			{/if}
			<!--  -->
		{/each}
	</section>
</section>

<style>
</style>
