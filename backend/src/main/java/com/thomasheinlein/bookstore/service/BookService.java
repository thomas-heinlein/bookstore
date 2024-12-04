package com.thomasheinlein.bookstore.service;

import com.thomasheinlein.bookstore.persistence.Book;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;

import java.util.List;

public interface BookService {
    List<Book> getAll();

    Long create(CreateBookCommand command);

    void edit(EditBookCommand command);
}
