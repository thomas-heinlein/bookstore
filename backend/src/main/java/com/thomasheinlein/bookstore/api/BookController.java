package com.thomasheinlein.bookstore.api;

import com.thomasheinlein.bookstore.api.dto.BookDetailDto;
import com.thomasheinlein.bookstore.api.dto.BookListDto;
import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.EditBookDto;
import com.thomasheinlein.bookstore.service.BookService;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import com.thomasheinlein.bookstore.service.exception.BookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<List<BookListDto>> getBooks() {
        List<BookListDto> books = bookService.getAll().stream()
                .map(BookListDto::fromBook)
                .toList();

        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDetailDto> getBookDetails(@PathVariable("id") Long id) {
        try {
            BookDetailDto bookDetails = BookDetailDto.fromBook(bookService.getById(id));
            return ResponseEntity.ok(bookDetails);
        } catch (BookNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Long> createBook(@RequestBody CreateBookDto dto) {
        CreateBookCommand command = CreateBookCommand.fromDto(dto);
        long id = bookService.create(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> editBook(@PathVariable("id") Long id, @RequestBody EditBookDto dto) {
        try {
            bookService.edit(EditBookCommand.fromDto(id, dto));
            return ResponseEntity.noContent().build();
        } catch (BookNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        try {
            bookService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (BookNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
