package com.thomasheinlein.bookstore.service.command;

import lombok.Value;

@Value
public class EditBookCommand {
    Long id;
    String isbn;
    String name;
}
