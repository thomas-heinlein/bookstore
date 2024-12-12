package com.thomasheinlein.bookstore.service;

import com.thomasheinlein.bookstore.persistence.BookRepository;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import com.thomasheinlein.bookstore.service.exception.BookNotFoundException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static testdriver.BookTestDriver.createCreateBookCommand;
import static testdriver.BookTestDriver.createEditBookCommand;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl cut;

    @Nested
    class GetAll {

        @Test
        void returnAllBooks() {
            List<JpaBook> books = List.of(new JpaBook(), new JpaBook());
            when(bookRepository.findAll()).thenReturn(books);

            List<JpaBook> result = cut.getAll();

            assertThat(result).hasSize(books.size());
            verify(bookRepository).findAll();
        }

        @Test
        void returnEmptyListWhenNoBooksPresent() {
            when(bookRepository.findAll()).thenReturn(List.of());

            List<JpaBook> result = cut.getAll();

            assertThat(result).isEmpty();
            verify(bookRepository).findAll();
        }
    }

    @Nested
    class Create {

        @Test
        void createBookAndReturnId() {
            CreateBookCommand command = createCreateBookCommand();
            JpaBook savedBook = new JpaBook();
            savedBook.setId(1L);
            when(bookRepository.save(any())).thenReturn(savedBook);

            Long id = cut.create(command);

            assertThat(id).isEqualTo(1L);
            JpaBook expectedJpaBook = command.toJpa();
            verify(bookRepository).save(expectedJpaBook);
        }

        @Test
        void shouldThrowExceptionWhenCreateCommandIsNull() {
            assertThrows(NullPointerException.class, () -> cut.create(null));
        }
    }

    @Nested
    class Edit {

        @Test
        void editBook() {
            EditBookCommand command = createEditBookCommand();
            when(bookRepository.existsById(command.getId())).thenReturn(true);

            cut.edit(command);

            verify(bookRepository).save(command.toJpa());
        }

        @Test
        void throwExceptionWhenEditingNonExistentBook() {
            EditBookCommand command = createEditBookCommand();
            when(bookRepository.existsById(command.getId())).thenReturn(false);

            assertThrows(BookNotFoundException.class, () -> cut.edit(command));

            verify(bookRepository, never()).save(any());
        }
    }

    @Nested
    class Delete {

        @Test
        void deleteBookById() {
            Long bookId = 1L;
            when(bookRepository.existsById(bookId)).thenReturn(true);

            cut.delete(bookId);

            verify(bookRepository).deleteById(bookId);
        }

        @Test
        void throwExceptionWhenDeletingNonExistentBook() {
            Long bookId = 999L;
            when(bookRepository.existsById(bookId)).thenReturn(false);

            assertThrows(BookNotFoundException.class, () -> cut.delete(bookId));

            verify(bookRepository, never()).deleteById(bookId);
        }
    }
}
