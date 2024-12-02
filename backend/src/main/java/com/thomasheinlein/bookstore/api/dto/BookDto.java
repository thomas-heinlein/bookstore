package com.thomasheinlein.bookstore.api.dto;

import com.thomasheinlein.bookstore.persistence.Book;
import lombok.Value;

@Value
public class BookDto {
    String isbn;
    String name;

    public static BookDto fromBook(Book book) {
        return new BookDto(book.getIsbn(), book.getName());
    }
}
