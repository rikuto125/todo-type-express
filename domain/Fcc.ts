import {Task} from "./Task";

export class FCC<T> {
    constructor(values: Task[]) {
        this.values = values
    }

    readonly values: Task[]

    get length() {
        return this.values.length
    }

    get(index: number) {
        return this.values[index]
    }

    add(value: Task) {
        this.values.push(value)
    }

    remove(index: number) {
        this.values.splice(index, 1)
    }

    update(index: number, value: Task) {
        this.values[index] = value
    }

    isEmpty() {
        return this.values.length === 0
    }

    isNotEmpty() {
        return this.values.length > 0
    }

    toArray() {
        return this.values
    }
}

