package com.thomasheinlein.bookstore.api.dto;

import com.thomasheinlein.bookstore.persistence.JpaBook;
import lombok.Value;

@Value
public class BookListDto {
    long id;
    String name;
    String author;
    String genre;


    public static BookListDto fromBook(JpaBook book) {
        return new BookListDto(book.getId(), book.getName(), book.getAuthor(), book.getGenre());
    }
}
