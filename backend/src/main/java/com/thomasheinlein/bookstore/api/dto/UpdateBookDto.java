package com.thomasheinlein.bookstore.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
@Builder(toBuilder = true)
public class UpdateBookDto {
    String isbn;
    String name;
}
