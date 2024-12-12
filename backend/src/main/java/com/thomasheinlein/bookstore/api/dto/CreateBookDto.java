package com.thomasheinlein.bookstore.api.dto;

import lombok.Value;

import java.time.LocalDate;

@Value
public class CreateBookDto {
    String isbn;
    String name;
    String author;
    String genre;
    String publisher;
    LocalDate publicationDate;
    String description;
}
