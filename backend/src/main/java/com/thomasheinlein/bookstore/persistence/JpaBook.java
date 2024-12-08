package com.thomasheinlein.bookstore.persistence;

import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@ToString
@EqualsAndHashCode
public class JpaBook {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_id")
    @SequenceGenerator(name = "book_id", sequenceName = "books_seq", allocationSize = 1)
    private Long id;
    private String isbn;
    private String name;

    public static JpaBook fromCommand(CreateBookCommand command) {
        JpaBook book = new JpaBook();
        book.setIsbn(command.getIsbn());
        book.setName(command.getName());
        return book;
    }
    public static JpaBook fromCommand(EditBookCommand command) {
        JpaBook book = new JpaBook();
        book.setId(command.getId());
        book.setIsbn(command.getIsbn());
        book.setName(command.getName());
        return book;
    }

}
