package com.thomasheinlein.bookstore.service.command;

import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.EditBookDto;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import lombok.Value;

import java.time.LocalDate;

@Value
public class EditBookCommand {
    Long id;
    String isbn;
    String name;
    String author;
    String genre;
    String publisher;
    LocalDate publicationDate;
    String description;

    public JpaBook toJpa() {
        JpaBook book = new JpaBook();
        book.setId(id);
        book.setIsbn(isbn);
        book.setName(name);
        book.setAuthor(author);
        book.setGenre(genre);
        book.setPublisher(publisher);
        book.setPublicationDate(publicationDate);
        book.setDescription(description);
        return book;
    }

    public static EditBookCommand fromDto(Long id, EditBookDto dto) {
        return new EditBookCommand(
                id,
                dto.getIsbn(),
                dto.getName(),
                dto.getPublisher(),
                dto.getGenre(),
                dto.getPublisher(),
                dto.getPublicationDate(),
                dto.getDescription()
        );
    }
}
