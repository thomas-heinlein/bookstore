package com.thomasheinlein.bookstore.service;

import com.google.common.collect.ImmutableList;
import com.thomasheinlein.bookstore.persistence.Book;
import com.thomasheinlein.bookstore.persistence.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;

    @Override
    public List<Book> getAll() {
        return ImmutableList.copyOf(bookRepository.findAll());
    }
}
