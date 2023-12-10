package com.kaankaplan.booke;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
public class BookeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookeApplication.class, args);
    }

}
