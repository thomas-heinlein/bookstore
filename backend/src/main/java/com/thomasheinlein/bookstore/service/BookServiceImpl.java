package com.thomasheinlein.bookstore.service;

import com.google.common.collect.ImmutableList;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.persistence.BookRepository;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import com.thomasheinlein.bookstore.service.exception.BookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;

    @Override
    public List<JpaBook> getAll() {
        return ImmutableList.copyOf(bookRepository.findAll());
    }

    @Override
    public Long create(CreateBookCommand command) {
        JpaBook book = bookRepository.save(command.toJpa());
        return book.getId();
    }

    @Override
    public void edit(EditBookCommand command) {
        if (!bookRepository.existsById(command.getId())) {
            throw new BookNotFoundException(command.getId());
        }
        bookRepository.save(command.toJpa());
    }

    @Override
    public void delete(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException(id);
        }
        bookRepository.deleteById(id);
    }
}
