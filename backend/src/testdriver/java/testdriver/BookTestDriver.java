package testdriver;

import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.EditBookDto;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;

import java.time.LocalDate;

public class BookTestDriver {

    public static JpaBook createNewJpaBook() {
        return createCreateBookCommand().toJpa();
    }

    public static JpaBook createJpaBook() {
        return createEditBookCommand().toJpa();
    }

    public static CreateBookDto createCreateBookDto() {
        return new CreateBookDto("ISBN", "Name", "Author", "Genre", "Publisher", LocalDate.now(), "Description");
    }

    public static EditBookDto createEditBookDto() {
        return new EditBookDto("ISBN", "Name", "Author", "Genre", "Publisher", LocalDate.now(), "Description");
    }

    public static CreateBookCommand createCreateBookCommand() {
        return CreateBookCommand.fromDto(createCreateBookDto());
    }

    public static EditBookCommand createEditBookCommand() {
        return EditBookCommand.fromDto(1L, createEditBookDto());
    }
}
