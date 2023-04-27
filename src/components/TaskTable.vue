<template>
    <section>
        <h1>Тестовое задание для Zecurion</h1>
        <div class="div">
            <div class="form">
                <label for="tasks">Добавить новую задачу</label>
                <input type="text" id="tasks" placeholder="Название задачи" v-model="data.task">
                <button @click="addTask" class="btn form__firstBtn">Добавить задачу</button>
                <label for="delTasks" class="form__secondLabel">Удалить задачу</label>
                <select name="delTasks" id="delTasks" v-model="delData.task">
                    <option v-for="(task, i) in [...this.tasks.entries()]" :key="i" :value="task[0]">{{ task[1] }}</option>
                </select>
                <button @click="delTask" class="btn redBtn">Удалить задачу</button>
            </div>
            <div class="form">
                <label for="dates">Добавить новую дату</label>
                <input type="text" id="dates" placeholder="01.01" v-model="data.date">
                <button @click="addDate" class="btn form__firstBtn">Добавить дату</button>
                <label for="delDates" class="form__secondLabel">Удалить дату</label>
                <select name="delDates" id="delDates" v-model="delData.date">
                    <option v-for="(date, i) in [...this.dates.entries()]" :key="i" :name="i" :value="date[0]">{{ date[1] }}</option>
                </select>
                <button @click="delDate" class="btn redBtn">Удалить дату</button>
            </div>
            <div class="form">
                <label for="status">Добавить новый статус</label>
                <input type="text" id="status" placeholder="Завершено" v-model="data.status">
                <button @click="addStatus" class="btn form__firstBtn">Добавить статус</button>
                <label for="delStatus" class="form__secondLabel">Удалить статус</label>
                <select name="delStatus" id="delStatus" v-model="delData.status">
                    <option v-for="(status, i) in [...this.statuses.entries()]" :key="i" :value="status[0]">{{ status[1] }}</option>
                </select>
                <button @click="delStatus" class="btn redBtn">Удалить статус</button>
            </div>
            <div class="form formConnect">
                <label>Связи</label>
                <div v-for="(key, i) in Object.keys(connections)" :key="i" class="form__connect">
                    <span class="form__connect-text">{{ connections[key].key }} {{ connections[key].date.name }} 
                        {{ connections[key].task.name }} {{ connections[key].status }}</span>
                    <button @click="delConnection(key)" class="btn form__connect-btn">X</button>
                </div>
            </div>
        </div>
        <div class="div">
            <table v-if="[...this.dates.entries()].length > 0 || [...this.tasks.entries()].length > 0">
                <thead>
                    <tr>
                        <th>Задачи / Даты</th>
                        <th v-for="(date, i) in [...this.dates.values()]" :key="i">{{ date }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, i) in [...this.tasks.entries()]" :key="i">
                        <td class="left-head">
                            <input type="text" :value="task[1]" @input="updateQuery($event, task[0])">
                        </td>
                        <td v-for="(item, j) in dates" :key="j">
                            <select :id="`${i}_${j}`" @click="setConnection($event, [...this.tasks.keys()][i], [...this.dates.keys()][j], `${i}_${j}`)" 
                            v-if="Object.keys(connections).includes(`${i}_${j}`)" v-model="connections[`${i}_${j}`].key">
                                <option value="null"></option>
                                <option v-for="(stat, k) in [...statuses.entries()]" :value="stat[0]" :key="k">
                                    {{ stat[1] }}
                                </option>
                            </select>
                            <select :id="`${i}_${j}`" @click="setConnection($event, [...this.tasks.keys()][i], [...this.dates.keys()][j], `${i}_${j}`)" v-else>
                                <option value="null"></option>
                                <option v-for="(stat, k) in [...statuses.entries()]" :value="stat[0]" :key="k">
                                    {{ stat[1] }}
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
export default {
    data: () => ({
        tasks: new Map(),
        dates: new Map(),
        statuses: new Map(),
        connections: {},
        data: { task: "", date: "", status: "" },
        delData: { task: "", date: "", status: "" }
    }),
    methods: {
        async generateRandomKey() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let key = '';
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                key += chars[randomIndex];
            }
            if (!(key in [...this.tasks.keys()]) && !(key in [...this.dates.keys()]) && !(key in [...this.statuses.keys()])) {
                return key;
            } else {
                return await this.generateRandomKey();
            }
        },
        async addTask() {
            if (this.data.task != "") {
                if ([...this.tasks.values()].includes(this.data.task)) {
                    alert('Такая задача уже существует!')
                } else {
                    let key = await this.generateRandomKey(); 
                    this.tasks.set(key, this.data.task)
                    this.data.task = "";
                }
            } else {
                alert('Поле с задачей пусто!')
            }
        },
        async addDate() {
            if (this.data.date != "") {
                if ([...this.dates.values()].includes(this.data.date)) {
                    alert('Такая дата уже существует!')
                } else {
                    let key = await this.generateRandomKey();
                    this.dates.set(key, this.data.date)
                    this.data.date = "";
                    this.dates = new Map([...this.dates.entries()].sort((a, b) => a[1] - b[1]))
                }
            } else {
                alert('Поле с датой пусто!')
            }
        },
        async addStatus() {
            if (this.data.status != "") {
                if ([...this.statuses.values()].includes(this.data.status)) {
                    alert('Такой статус уже существует!')
                } else {
                    let key = await this.generateRandomKey();
                    this.statuses.set(key, this.data.status)
                    this.data.status = "";
                }
            } else {
                alert('Поле с статусом пусто!')
            }
        },
        async setConnection(event, taskKey, dateKey, pos) {
            if (event.target.value === 'null') {
                if (this.connections[pos]) {
                    delete this.connections[pos]
                }
                return
            }
            this.connections[pos] = {
                key: event.target.value,
                status: this.statuses.get(event.target.value),
                task: {key: taskKey, name: this.tasks.get(taskKey)},
                date: {key: dateKey, name: this.dates.get(dateKey)},
            }
            // сортировка если понадобится
            // let sortedData = {};
            // let keyConn = Object.keys(this.connections).sort()
            // for (let i = 0; i < keyConn.length; i++) {
            //     sortedData[keyConn[i]] = this.connections[keyConn[i]];
            // }
            // this.connections = sortedData
        },  
        async delTask() {
            this.tasks.delete(this.delData.task)
            for (let key in this.connections) {
                if (this.connections[key].task.key === this.delData.task) {
                    await delete this.connections[key];
                }
            }
            this.delData.task = ""
            let newConnection = {};
            for (let key in this.connections) {
                newConnection[`${parseInt(key[0])-1}${key.slice(1)}`] = this.connections[key]
            }
            this.connections = newConnection
        },
        async delDate() {
            this.dates.delete(this.delData.date)
            for (let key in this.connections) {
                if (this.connections[key].date.key === this.delData.date) {
                    await delete this.connections[key];
                }
            }
            this.delData.date = ""
            let newConnection = {};
            for (let key in this.connections) {
                newConnection[`${key.slice(0, -1)}${parseInt(key[2])-1}`] = this.connections[key]
            }
            this.connections = newConnection
        },
        async delStatus() {
            this.statuses.delete(this.delData.status)
            for (let key in this.connections) {
                if (this.connections[key].key === this.delData.status) {
                    await delete this.connections[key];
                }
            }
            this.delData.status = ""
        },
        async delConnection(key) {
            await delete this.connections[key]
            // document.getElementById(key).value="null";
        },
        async updateQuery(event, searchKey) {
            this.tasks.set(searchKey, event.target.value)
            for (let key in this.connections) {
                if (this.connections[key].task.key === searchKey) {
                    this.connections[key].task = {key: searchKey, name: event.target.value}
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
$green-color: #42b983;
$gray-color: #e1e1e3;
$red-color: #E53935;
div {
    width: 100%;
}
.div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
}
.btn {
    margin: 10px 0 15px 0;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 0;
    border-radius: 5px;
    background-color: $green-color;
    color: #fff;
    border: 0;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}
.form {
    margin: 0 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 200px;
    border-radius: 5px;
    border: 1px solid $gray-color;

    &__connect {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 5px;

        &-btn {
            width: auto;
            margin: 0;
            background-color: $red-color;
            padding: 5px;
            margin-left: 10px;
        }
    }
    label {
        display: flex;
        flex-direction: flex-start;
        color: #222;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 5px;
    }
    .redBtn {
        background-color: $red-color;
        margin-bottom: 0;
    }
    &__secondLabel {
        border-top: 1px solid $gray-color;
        padding-top: 10px;
    }
    input, select  {
        color: #222;
        font-size: 15px;
        font-weight: 500;
        padding: 10px 15px;
        transition: all .3s;
        border-radius: 5px;
        border: 1px solid $gray-color;
        &:focus {
            border: 1px solid $green-color;
            outline: none;
        }
        &:active {
            border: 1px solid $green-color;
        }
    }
}
.formConnect {
    width: 300px;
}
table {
    border-collapse: collapse;
    border-spacing: 5px;
    th, .left-head {
        padding: 10px 20px;
        background-color: $green-color;
        border: 1px solid $gray-color;
        color: #fff;
        font-weight: 600;
        font-size: 16px;

        input {
            color: #fff;
            font-weight: 600;
            font-size: 16px;
            background-color: transparent;
            padding: 10px 20px;
            border: 0;

            &:focus {
                outline: none;
            }
        }
    }
    .left-head {
        padding: 0;
    }
    td {
        border: 1px solid $gray-color;
        select {
            width: 100%;
            height: 100%;
            cursor: pointer;
            padding: 10px 20px;
            border: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;

            color: #222;
            font-size: 16px;
            font-weight: 500;

            &::-ms-expand {
                display: none;
            }
            &:focus {
                outline: none;
            }
        }
    }
}
</style>