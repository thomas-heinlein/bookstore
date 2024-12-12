import {Book} from "../types/Book";

export interface CreateBook extends Omit<Book, 'id'> {
}