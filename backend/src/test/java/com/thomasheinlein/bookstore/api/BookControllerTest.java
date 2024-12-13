package com.thomasheinlein.bookstore.api;

import com.thomasheinlein.bookstore.api.dto.BookDetailDto;
import com.thomasheinlein.bookstore.api.dto.BookListDto;
import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.EditBookDto;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.service.BookService;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import com.thomasheinlein.bookstore.service.exception.BookNotFoundException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import testdriver.BookTestDriver;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static testdriver.BookTestDriver.*;

@ExtendWith(MockitoExtension.class)
class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController cut;

    @Test
    void getBooks() {
        JpaBook jpaBook1 = createJpaBook().toBuilder().id(1L).build();
        JpaBook jpaBook2 = createJpaBook().toBuilder().id(2L).build();
        when(bookService.getAll()).thenReturn(List.of(jpaBook1, jpaBook2));

        ResponseEntity<List<BookListDto>> response = cut.getBooks();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsExactly(BookListDto.fromBook(jpaBook1), BookListDto.fromBook(jpaBook2));
    }

    @Nested
    class GetBookDetails {
        @Test
        void getBookDetails() {
            JpaBook jpaBook = createJpaBook().toBuilder().id(1L).build();
            when(bookService.getById(1L)).thenReturn(jpaBook);

            ResponseEntity<BookDetailDto> response = cut.getBookDetails(1L);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
            assertThat(response.getBody()).isEqualTo(BookDetailDto.fromBook(jpaBook));
        }

        @Test
        void returnNotFoundIfBookNotFound() {
            Long bookId = 999L;
            doThrow(new BookNotFoundException(bookId)).when(bookService).getById(bookId);

            ResponseEntity<BookDetailDto> response = cut.getBookDetails(bookId);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }
    }

    @Test
    void createBook() {
        CreateBookDto createBookDto = createCreateBookDto();
        long expectedId = 1L;
        when(bookService.create(any(CreateBookCommand.class))).thenReturn(expectedId);

        ResponseEntity<Long> response = cut.createBook(createBookDto);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(expectedId);
    }

    @Nested
    class Edit {
        @Test
        void editBook() {
            Long bookId = 1L;
            EditBookDto updateBookDto = createEditBookDto();
            doNothing().when(bookService).edit(any(EditBookCommand.class));

            ResponseEntity<Void> response = cut.editBook(bookId, updateBookDto);

            verify(bookService, times(1)).edit(BookTestDriver.createEditBookCommand());
            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        }

        @Test
        void returnNotFoundIfBookNotFound() {
            Long bookId = 999L;
            EditBookDto updateBookDto = createEditBookDto();
            doThrow(new BookNotFoundException(bookId)).when(bookService).edit(any(EditBookCommand.class));

            ResponseEntity<Void> response = cut.editBook(bookId, updateBookDto);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }
    }

    @Nested
    class Delete {
        @Test
        void deleteBook() {
            Long bookId = 1L;
            doNothing().when(bookService).delete(bookId);

            ResponseEntity<Void> response = cut.deleteBook(bookId);

            verify(bookService, times(1)).delete(bookId);
            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        }

        @Test
        void returnNotFoundIfBookNotFound() {
            Long bookId = 999L;
            doThrow(new BookNotFoundException(bookId)).when(bookService).delete(bookId);

            ResponseEntity<Void> response = cut.deleteBook(bookId);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }
    }
}
