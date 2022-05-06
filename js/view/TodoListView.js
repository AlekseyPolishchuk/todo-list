export class TodoListView {
    #controller = null;
    #form = null;
    #todoContainer = null;

    constructor(controller) {
        this.#controller = controller;
    }

    setForm(formNode) {
        if (this.#form) throw new Error('Form already defined');
        this.#form = formNode;
    }

    setTodoContainer(todoContainerNode) {
        if (this.#todoContainer)
            throw new Error('Todo Container already defined');
        this.#todoContainer = todoContainerNode;
    }

    renderItem(dataForRender) {
        this.#todoContainer.prepend(
            TodoListView.#createTemplate(dataForRender)
        );
    }

    removeTodoItem(id) {
        const todoItem = this.#todoContainer.querySelector(
            `[data-todo-item-${id}]`
        );
        todoItem.remove();
    }

    clearForm() {
        this.#form.reset();
    }

    removeAllTodos() {
        this.#todoContainer.innerHTML = '';
    }

    static #createTemplate({ title, description, itemId, completed }) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        wrapper.setAttribute(`data-todo-item-${itemId}`, '');

        const wrapInnerContent = document.createElement('div');
        wrapInnerContent.classList.add('taskWrapper');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('taskHeading');
        taskTitle.innerHTML = title;
        wrapInnerContent.append(taskTitle);

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('taskDescription');
        taskDescription.innerHTML = description;
        wrapInnerContent.append(taskDescription);

        const horizontalLine1 = document.createElement('hr');
        wrapInnerContent.append(horizontalLine1);

        const checkboxContainer = document.createElement('label');
        checkboxContainer.classList.add('completed', 'form-check');

        const checkbox = document.createElement('input');
        checkbox.classList.add('form-check-input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.dataset.itemId = `${itemId}`;
        checkboxContainer.append(checkbox);

        const checkboxDescription = document.createElement('span');
        checkboxDescription.innerHTML = 'Done?';
        checkboxContainer.append(checkboxDescription);
        wrapInnerContent.append(checkboxContainer);

        const horizontalLine2 = document.createElement('hr');
        wrapInnerContent.append(horizontalLine2);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');
        deleteBtn.dataset.removeBtn = '';
        deleteBtn.dataset.itemId = `${itemId}`;
        deleteBtn.innerHTML = 'Delete';
        wrapInnerContent.append(deleteBtn);
        wrapper.append(wrapInnerContent);

        wrapper.querySelector('input[type="checkbox"]').checked = completed;
        return wrapper;
    }
}
