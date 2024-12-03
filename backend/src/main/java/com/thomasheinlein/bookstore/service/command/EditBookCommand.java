package com.thomasheinlein.bookstore.service;

import lombok.Value;

@Value
public class CreateBookCommand {
    String isbn;
    String name;
}
