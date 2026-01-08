--
-- Estructura de tabla para la tabla `temporada` (Alejandro Pavón Martínez)
--

CREATE TABLE `temporada` (
  `id` bigint NOT NULL,
  `descripcion` varchar(256) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `temporada`
--
ALTER TABLE `temporada`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;