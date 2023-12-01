package com.kaankaplan.booke.core.services.image.concretes;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.kaankaplan.booke.core.services.image.abstracts.ImageUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageUploadServiceImpl implements ImageUploadService {

    private final Cloudinary cloudinary;

    @Override
    public Map upload(MultipartFile multipartFile) {
        Map result = null;
        try {
            File file = convertMultipartFileToFile(multipartFile);
            result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
            file.delete();
        } catch (Exception e) {
            log.error("ImageUploadServiceImpl error -> while upload Image ---> " + e);
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public Map deleteImage(String imageId) {
        Map result = null;
        try {
            result = cloudinary.uploader().destroy(imageId, Map.of());
        } catch (IOException e) {
            log.error("ImageUploadServiceImpl error -> while delete Image ---> " + e);
            throw new RuntimeException(e);
        }
        return result;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        FileOutputStream stream = new FileOutputStream(file);
        stream.write(multipartFile.getBytes());
        stream.close();

        return file;
    }
}
