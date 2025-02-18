-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2025 a las 23:17:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cafetalera-ladeseada`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo_grano` enum('Verde','Piton','Maduro','Sobre Maduro','Seco','Brocado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `despulpado`
--

CREATE TABLE `despulpado` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tiempo` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fermentacion`
--

CREATE TABLE `fermentacion` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `tipo` enum('Anaeróbico','Aeróbico') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lavado`
--

CREATE TABLE `lavado` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `metodo` enum('Lavado en agua','Lavado seco') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `id` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `kilogramos_cereza` int(11) DEFAULT NULL,
  `calidad` enum('A+','A','B','C') DEFAULT NULL,
  `estado` enum('Recolección','Clasificación','Despulpado','Fermentación','Lavado','Secado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `lote`
--

INSERT INTO `lote` (`id`, `fecha_inicio`, `fecha_fin`, `kilogramos_cereza`, `calidad`, `estado`) VALUES
(1, '2022-02-01', '0000-00-00', 2000, 'A', 'Secado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recoleccion`
--

CREATE TABLE `recoleccion` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo_grano` enum('Verde','Piton','Maduro','Sobre Maduro','Seco','Brocado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secado`
--

CREATE TABLE `secado` (
  `lote_id` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `metodo` enum('Secado al sol','Secado mecánico') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `token` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`token`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `clave`, `token`) VALUES
(1, 'Jesus Salazar', 'jesus@gmail.com', '123', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29ycmVvIjoiamVzdXNAZ21haWwuY29tIiwiaWF0IjoxNzM5OTE2OTYwLCJleHAiOjE3Mzk5MjA1NjB9.3dJUHvUiIfhVWBAOwbQPZuWBcWXteEzZbRHrUS4_zZs\"}');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `despulpado`
--
ALTER TABLE `despulpado`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `fermentacion`
--
ALTER TABLE `fermentacion`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `lavado`
--
ALTER TABLE `lavado`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recoleccion`
--
ALTER TABLE `recoleccion`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `secado`
--
ALTER TABLE `secado`
  ADD KEY `lote_id` (`lote_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lote`
--
ALTER TABLE `lote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD CONSTRAINT `clasificacion_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);

--
-- Filtros para la tabla `despulpado`
--
ALTER TABLE `despulpado`
  ADD CONSTRAINT `despulpado_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);

--
-- Filtros para la tabla `fermentacion`
--
ALTER TABLE `fermentacion`
  ADD CONSTRAINT `fermentacion_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);

--
-- Filtros para la tabla `lavado`
--
ALTER TABLE `lavado`
  ADD CONSTRAINT `lavado_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);

--
-- Filtros para la tabla `recoleccion`
--
ALTER TABLE `recoleccion`
  ADD CONSTRAINT `recoleccion_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);

--
-- Filtros para la tabla `secado`
--
ALTER TABLE `secado`
  ADD CONSTRAINT `secado_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
