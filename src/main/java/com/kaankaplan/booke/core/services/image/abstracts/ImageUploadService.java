package com.kaankaplan.booke.core.services.image.abstracts;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ImageUploadService {

    Map<Object, Object> upload(MultipartFile multipartFile);

    Map<Object, Object> deleteImage(String imageId);
}
