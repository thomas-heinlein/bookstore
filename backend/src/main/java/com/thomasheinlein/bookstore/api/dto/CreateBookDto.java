package com.thomasheinlein.bookstore.api.dto;

import lombok.Value;

@Value
public class CreateBookDto {
    String isbn;
    String name;
}
