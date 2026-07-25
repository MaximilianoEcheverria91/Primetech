package com.primetech.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folder) {
        try {
            log.info("Subiendo archivo {} a la carpeta {}", file.getOriginalFilename(), folder);

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "primetech/" + folder,
                    "use_filename", true,
                    "unique_filename", true
            ));

            String secureUrl = uploadResult.get("secure_url").toString();
            log.info("Archivo subido con éxito a Cloudinary. URL: {}", secureUrl);
            return secureUrl;

        } catch (IOException e) {
            log.error("Error al subir el archivo a Cloudinary: ", e);
            throw new RuntimeException("Error al procesar la imagen para su almacenamiento", e);
        }
    }

    public void deleteFile(String publicId) {
        try {
            log.info("Eliminando archivo de Cloudinary con public_id: {}", publicId);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            log.error("Error al eliminar el archivo de Cloudinary: ", e);
        }
    }
}