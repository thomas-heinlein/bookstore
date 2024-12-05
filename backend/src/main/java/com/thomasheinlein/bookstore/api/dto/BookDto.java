package com.thomasheinlein.bookstore.api.dto;

import com.thomasheinlein.bookstore.persistence.JpaBook;
import lombok.Value;

@Value
public class BookDto {
    long id;
    String isbn;
    String name;

    public static BookDto fromBook(JpaBook book) {
        return new BookDto(book.getId(), book.getIsbn(), book.getName());
    }
}
