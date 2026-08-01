package com.primetech.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CloudinaryServiceTest {

    @Mock
    private Cloudinary cloudinary;

    @Mock
    private Uploader uploader;

    @InjectMocks
    private CloudinaryService cloudinaryService;

    private MockMultipartFile sampleFile;

    @BeforeEach
    void setUp() {
        // Simulamos un archivo Multipart válido en memoria
        sampleFile = new MockMultipartFile(
                "file",
                "test-image.jpg",
                "image/jpeg",
                "contenido de imagen ficticio".getBytes()
        );
    }

    @Test
    @DisplayName("uploadFile - Debe subir la imagen a Cloudinary y devolver la URL segura")
    void uploadFile_Success() throws IOException {
        // Arrange
        String expectedUrl = "https://res.cloudinary.com/demo/image/upload/v1/primetech/products/test.jpg";
        Map<String, Object> uploadResult = Map.of("secure_url", expectedUrl);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(byte[].class), any(Map.class))).thenReturn(uploadResult);

        // Act
        String resultUrl = cloudinaryService.uploadFile(sampleFile, "products");

        // Assert
        assertNotNull(resultUrl);
        assertEquals(expectedUrl, resultUrl);
        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    @DisplayName("uploadFile - Debe lanzar RuntimeException si la SDK de Cloudinary arroja IOException")
    void uploadFile_IOException_ThrowsRuntimeException() throws IOException {
        // Arrange
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(byte[].class), any(Map.class))).thenThrow(new IOException("Simulated network failure"));

        // Act & Assert
        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> cloudinaryService.uploadFile(sampleFile, "products")
        );

        assertEquals("Error al procesar la imagen para su almacenamiento", exception.getMessage());
    }

    @Test
    @DisplayName("deleteFile - Debe invocar el método destroy del uploader de Cloudinary")
    void deleteFile_Success() throws IOException {
        // Arrange
        String publicId = "primetech/products/test_id";
        when(cloudinary.uploader()).thenReturn(uploader);

        // Act
        cloudinaryService.deleteFile(publicId);

        // Assert
        verify(uploader, times(1)).destroy(eq(publicId), any(Map.class));
    }
}