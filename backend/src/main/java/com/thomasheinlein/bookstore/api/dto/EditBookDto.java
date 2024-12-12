package com.thomasheinlein.bookstore.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;

@Value
@AllArgsConstructor
@Builder(toBuilder = true)
public class EditBookDto {
    String isbn;
    String name;
    String author;
    String genre;
    String publisher;
    LocalDate publicationDate;
    String description;
}
