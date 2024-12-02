package com.thomasheinlein.bookstore.service;

import com.thomasheinlein.bookstore.persistence.Book;

import java.util.List;

public interface BookService {
    List<Book> getAll();
}
