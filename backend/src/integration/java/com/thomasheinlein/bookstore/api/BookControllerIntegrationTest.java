package com.thomasheinlein.bookstore.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.UpdateBookDto;
import com.thomasheinlein.bookstore.persistence.BookRepository;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static io.zonky.test.db.AutoConfigureEmbeddedDatabase.RefreshMode.AFTER_EACH_TEST_METHOD;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static testdriver.BookTestDriver.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureEmbeddedDatabase(refresh = AFTER_EACH_TEST_METHOD)
class BookControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldGetBooks() throws Exception {
        JpaBook book1 = createNewJpaBook().toBuilder().name("Book 1").build();
        JpaBook book2 = createNewJpaBook().toBuilder().name("Book 2").build();
        bookRepository.save(book1);
        bookRepository.save(book2);

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(book1.getId()))
                .andExpect(jsonPath("$[0].name").value(book1.getName()))
                .andExpect(jsonPath("$[1].id").value(book2.getId()))
                .andExpect(jsonPath("$[1].name").value(book2.getName()));
    }

    @Test
    void shouldCreateBook() throws Exception {
        CreateBookDto createBookDto = createCreateBookDto();

        mockMvc.perform(post("/api/books")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createBookDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").isNotEmpty());

        assertThat(bookRepository.findAll())
                .hasSize(1)
                .allSatisfy(book -> assertThat(book.getName()).isEqualTo(createBookDto.getName()));
    }

    @Test
    void shouldEditBook() throws Exception {
        JpaBook book = createNewJpaBook()
                .toBuilder()
                .name("Old Book Name")
                .build();
        JpaBook savedBook = bookRepository.save(book);
        UpdateBookDto updateBookDto = createUpdateBookDto()
                .toBuilder()
                .name("New Book Name")
                .build();

        mockMvc.perform(put("/api/books/" + savedBook.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateBookDto)))
                .andExpect(status().isNoContent());

        JpaBook updatedBook = bookRepository.findById(savedBook.getId()).orElseThrow(() -> new IllegalArgumentException("Could not find book"));
        assertThat(updatedBook.getName()).isEqualTo("New Book Name");
    }

    @Test
    void shouldDeleteBook() throws Exception {
        JpaBook book = createNewJpaBook();
        JpaBook savedBook = bookRepository.save(book);

        mockMvc.perform(delete("/api/books/" + savedBook.getId()))
                .andExpect(status().isNoContent());

        assertThat(bookRepository.findById(savedBook.getId())).isEmpty();
    }

    @Test
    void shouldReturnNotFoundWhenEditingNonExistentBook() throws Exception {
        UpdateBookDto updateBookDto = createUpdateBookDto();

        mockMvc.perform(put("/api/books/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateBookDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonExistentBook() throws Exception {
        mockMvc.perform(delete("/api/books/999"))
                .andExpect(status().isNotFound());
    }


}
