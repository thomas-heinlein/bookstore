package com.thomasheinlein.bookstore.persistence;

import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String isbn;
    private String name;

    public static Book fromCommand(CreateBookCommand command) {
        Book book = new Book();
        book.setIsbn(command.getIsbn());
        book.setName(command.getName());
        return book;
    }
    public static Book fromCommand(EditBookCommand command) {
        Book book = new Book();
        book.setIsbn(command.getIsbn());
        book.setName(command.getName());
        return book;
    }

}
