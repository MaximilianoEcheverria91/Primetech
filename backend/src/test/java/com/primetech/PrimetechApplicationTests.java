package com.primetech;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Deshabilitado temporalmente hasta configurar base de datos de pruebas (H2 / Testcontainers)")
class PrimetechApplicationTests {

	@Test
	void contextLoads() {
	}

}
