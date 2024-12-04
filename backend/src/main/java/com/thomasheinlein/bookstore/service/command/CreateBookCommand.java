package com.thomasheinlein.bookstore.service.command;

import lombok.Value;

@Value
public class CreateBookCommand {
    String isbn;
    String name;
}
