package com.thomasheinlein.bookstore.service;

import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;

import java.util.List;

public interface BookService {
    List<JpaBook> getAll();

    JpaBook getById(Long id);

    Long create(CreateBookCommand command);

    void edit(EditBookCommand command);

    void delete(Long id);
}
