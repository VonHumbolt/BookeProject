package com.kaankaplan.booke.dto;

import java.util.List;

public record BookDto(
        String title,
        String description,
        int pageNumber,
        String authorId,
        List<String> genres,
        int publishedDate,
        String publisher
) {
}
