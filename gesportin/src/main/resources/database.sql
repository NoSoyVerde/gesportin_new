--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;