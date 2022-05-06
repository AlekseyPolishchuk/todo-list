export class TodoListModel {
    #controller = null;
    databaseKey = null;

    registerController(controllerInstance) {
        if (this.#controller) throw new Error('Controller is already defined');
        this.#controller = controllerInstance;
    }

    registerDatabaseName(databaseKey) {
        if (this.databaseKey)
            throw new Error('Database Key is already defined');
        this.databaseKey = databaseKey;
    }

    #hasItem() {
        let data = localStorage.getItem(this.databaseKey);
        if (data === null) return false;

        return !!JSON.parse(data).length;
    }

    hasItem() {
        return this.#hasItem();
    }

    setData(todoItemData) {
        if (!this.hasItem()) {
            this.setItem([todoItemData]);
            return;
        }

        const currentData = [...this._data, todoItemData];
        this.setItem(currentData);
    }

    #setItem(data) {
        return localStorage.setItem(this.databaseKey, JSON.stringify(data));
    }

    setItem(data) {
        this.#setItem(data);
    }

    patchData(id, fieldName, fieldValue) {
        const data = [...this._data];
        const currentItem = data.find((todoItem) => {
            return todoItem.itemId === +id;
        });

        currentItem[fieldName] = fieldValue;
        this.setItem(data);
    }

    #get() {
        return JSON.parse(localStorage.getItem(this.databaseKey));
    }

    get _data() {
        return this.#get();
    }

    getData() {
        return this._data;
    }

    deleteData(id) {
        const data = [...this._data];
        const currentItemIndex = data.findIndex((todoItem) => {
            return todoItem.itemId === +id;
        });

        data.splice(currentItemIndex, 1);
        this.setItem(data);
    }

    clearDatabase() {
        this._clearAll();
    }

    _clearAll() {
        localStorage.removeItem(this.databaseKey);
    }
}
