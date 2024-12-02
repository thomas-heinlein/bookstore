package com.thomasheinlein.bookstore.api;

import com.thomasheinlein.bookstore.api.dto.BookDto;
import com.thomasheinlein.bookstore.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
