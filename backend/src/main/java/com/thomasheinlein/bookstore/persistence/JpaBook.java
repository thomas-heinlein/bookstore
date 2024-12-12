package com.thomasheinlein.bookstore.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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
    private String author;
    private String genre;
    private String publisher;
    private LocalDate publicationDate;
    private String description;
}
