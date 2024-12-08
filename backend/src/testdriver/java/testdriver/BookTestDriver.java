package testdriver;

import com.thomasheinlein.bookstore.api.dto.CreateBookDto;
import com.thomasheinlein.bookstore.api.dto.UpdateBookDto;
import com.thomasheinlein.bookstore.persistence.JpaBook;
import com.thomasheinlein.bookstore.service.command.CreateBookCommand;
import com.thomasheinlein.bookstore.service.command.EditBookCommand;

public class BookTestDriver {

    public static JpaBook createNewJpaBook() {
        return new JpaBook(null, "ISBN", "Name");
    }
    public static JpaBook createJpaBook() {
        return new JpaBook(1L, "ISBN", "Name");
    }

    public static CreateBookDto createCreateBookDto() {
        return new CreateBookDto("ISBN", "Name");
    }

    public static UpdateBookDto createUpdateBookDto() {
        return new UpdateBookDto("ISBN", "Name");
    }

    public static CreateBookCommand createCreateBookCommand() {
        return new CreateBookCommand("ISBN", "Name");
    }

    public static EditBookCommand createEditBookCommand() {
        return new EditBookCommand(1L, "ISBN", "Name");
    }
}
