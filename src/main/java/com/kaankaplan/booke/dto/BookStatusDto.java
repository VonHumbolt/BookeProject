package com.kaankaplan.booke.dto;

import com.kaankaplan.booke.modals.Book;
import com.kaankaplan.booke.modals.Reader;

public record BookStatusDto(
        String status,
        Reader reader,
        Book book
) {
}
