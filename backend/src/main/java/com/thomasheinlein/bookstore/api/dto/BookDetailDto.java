package com.thomasheinlein.bookstore.api.dto;

import com.thomasheinlein.bookstore.persistence.JpaBook;
import lombok.Value;

import java.time.LocalDate;

@Value
public class BookDetailDto {
    long id;
    String name;
    String isbn;
    String author;
    String genre;
    String publisher;
    LocalDate publicationDate;
    String description;


    public static BookDetailDto fromBook(JpaBook book) {
        return new BookDetailDto(
                book.getId(),
                book.getName(),
                book.getIsbn(),
                book.getAuthor(),
                book.getGenre(),
                book.getPublisher(),
                book.getPublicationDate(),
                book.getDescription()
        );
    }
}
