package com.thomasheinlein.bookstore.api;

import com.thomasheinlein.bookstore.api.dto.BookDto;
import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.UpdateBookDto;
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
    public ResponseEntity<List<BookDto>> getBooks() {
        List<BookDto> books = bookService.getAll().stream()
                .map(BookDto::fromBook)
                .toList();

        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Long> createBook(@RequestBody CreateBookDto dto) {
        long id = bookService.create(new CreateBookCommand(dto.getIsbn(), dto.getName()));
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> editBook(@PathVariable("id") Long id, @RequestBody UpdateBookDto dto) {
        try {
            bookService.edit(new EditBookCommand(id, dto.getIsbn(), dto.getName()));
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
