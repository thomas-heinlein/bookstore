package com.thomasheinlein.bookstore.api;

import com.thomasheinlein.bookstore.api.dto.BookDto;
import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.service.BookService;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookDto> getBooks() {
        return bookService.getAll().stream()
                .map(BookDto::fromBook)
                .toList();
    }

    @PostMapping
    public Long createBook(@RequestBody CreateBookDto dto) {
        return bookService.create(new CreateBookCommand(dto.getIsbn(), dto.getName()));
    }

    @PutMapping("{id}")
    public void editBook(@PathVariable("id") Long id, @RequestBody CreateBookDto dto) {
        bookService.edit(new EditBookCommand(id, dto.getIsbn(), dto.getName()));
    }
}
