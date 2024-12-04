package com.thomasheinlein.bookstore.api.dto;

import lombok.Value;

@Value
public class UpdateBookDto {
    String isbn;
    String name;
}
