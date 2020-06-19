-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 18 2020 г., 22:29
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `whenwherewhencee`
--

-- --------------------------------------------------------

--
-- Структура таблицы `aircraft`
--

CREATE TABLE `aircraft` (
  `id_aircraft` int(11) NOT NULL,
  `title_aircraft` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `airport`
--

CREATE TABLE `airport` (
  `id_airport` int(11) NOT NULL,
  `title_airport` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `baggage`
--

CREATE TABLE `baggage` (
  `id_baggage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `fio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_b` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `flight`
--

CREATE TABLE `flight` (
  `id_flight` int(11) NOT NULL,
  `time_in_road` time NOT NULL,
  `id_aircrf` int(11) NOT NULL,
  `id_airsend` int(11) NOT NULL,
  `id_aircoming` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `number_row` int(11) NOT NULL,
  `number_place` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `id_f` int(11) NOT NULL,
  `Id_c` int(11) NOT NULL,
  `classmode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_t` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE `schedule` (
  `id_schedule` int(11) NOT NULL,
  `date_schedule` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `ticket`
--

CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL,
  `code_passenger` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fio_passenger` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_fligt` int(11) NOT NULL,
  `number_place` int(11) NOT NULL,
  `class` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_ricket` datetime NOT NULL,
  `whence` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whither` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `type_aircraft`
--

CREATE TABLE `type_aircraft` (
  `id_type_air` int(11) NOT NULL,
  `title_type_aircraft` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity_row` int(11) NOT NULL,
  `quantity_sitting` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `aircraft`
--
ALTER TABLE `aircraft`
  ADD PRIMARY KEY (`id_aircraft`),
  ADD KEY `type_aircraft` (`id_type`);

--
-- Индексы таблицы `airport`
--
ALTER TABLE `airport`
  ADD PRIMARY KEY (`id_airport`);

--
-- Индексы таблицы `baggage`
--
ALTER TABLE `baggage`
  ADD PRIMARY KEY (`id_baggage`);

--
-- Индексы таблицы `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD KEY `bag` (`id_b`);

--
-- Индексы таблицы `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`id_flight`),
  ADD KEY `flight` (`id_aircrf`),
  ADD KEY `aircoming` (`id_aircoming`),
  ADD KEY `send` (`id_airsend`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `client_ord` (`Id_c`),
  ADD KEY `tickets` (`id_t`);

--
-- Индексы таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id_schedule`);

--
-- Индексы таблицы `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id_ticket`);

--
-- Индексы таблицы `type_aircraft`
--
ALTER TABLE `type_aircraft`
  ADD PRIMARY KEY (`id_type_air`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `aircraft`
--
ALTER TABLE `aircraft`
  MODIFY `id_aircraft` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `airport`
--
ALTER TABLE `airport`
  MODIFY `id_airport` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `baggage`
--
ALTER TABLE `baggage`
  MODIFY `id_baggage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `flight`
--
ALTER TABLE `flight`
  MODIFY `id_flight` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id_schedule` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id_ticket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `type_aircraft`
--
ALTER TABLE `type_aircraft`
  MODIFY `id_type_air` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `aircraft`
--
ALTER TABLE `aircraft`
  ADD CONSTRAINT `type_aircraft` FOREIGN KEY (`id_type`) REFERENCES `type_aircraft` (`id_type_air`);

--
-- Ограничения внешнего ключа таблицы `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `bag` FOREIGN KEY (`id_b`) REFERENCES `baggage` (`id_baggage`);

--
-- Ограничения внешнего ключа таблицы `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `aircoming` FOREIGN KEY (`id_aircoming`) REFERENCES `airport` (`id_airport`),
  ADD CONSTRAINT `flight` FOREIGN KEY (`id_aircrf`) REFERENCES `aircraft` (`id_aircraft`),
  ADD CONSTRAINT `send` FOREIGN KEY (`id_airsend`) REFERENCES `aircraft` (`id_aircraft`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `client_ord` FOREIGN KEY (`Id_c`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `oreder_flight` FOREIGN KEY (`id_order`) REFERENCES `flight` (`id_flight`),
  ADD CONSTRAINT `tickets` FOREIGN KEY (`id_t`) REFERENCES `ticket` (`id_ticket`);

--
-- Ограничения внешнего ключа таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `shedule` FOREIGN KEY (`id_schedule`) REFERENCES `flight` (`id_flight`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
