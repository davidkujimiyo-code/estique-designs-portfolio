# Changelog

All notable changes to the Estique Designs Portfolio Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.3.0] - 2026-07-14
### Added
* Custom theme-specific Hero visual experiences unmounting resources dynamically based on the active theme.
* Light Mode Hero featuring Esther's professional portrait presentation with studio champagne glows, drop shadow, floating motion, and spring-based cursor parallax translation.
* Framer Motion `<AnimatePresence mode="wait">` transitions to cross-fade between WebGL 3D and portrait elements over 400ms.

---

## [2.2.0] - 2026-07-13
### Added
* Layered breathing champagne and soft emerald CSS studio halos behind the WebGL Canvas.
* Programmed dynamic ambient light intensity breathing inside the Three.js loop over time (`Math.sin(elapsed * 0.35) * 0.05`).
* Documented the entire codebase, application architecture, event tracking map, and changelogs.

---

## [2.1.0] - 2026-07-13
### Changed
* Renamed "Marketing Campaign Design" category to "Event Design" across filter buttons, project records, search parameters, and detail tag metadata.
* Replaced three placeholder book covers inside the "Book Cover Design" category with real client work:
  * "The Path of Wisdom" -> **"Fight Like a Winner"** by Damilola Glowville.
  * "Echoes of Eternity" -> **"No Excuse Is Good Enough"** by Omolayo Murewa.
  * "Shadows in the Mist" -> **"The Husband Blueprint"** by Emmanuel Ekundayo Owolabi.
* Added an optional `author` field to the `PortfolioItem` typescript type and updated the modal sticky header to render the author name at the top.

---

## [2.0.0] - 2026-07-12
### Added
* Premium modular WebGL Kinetic Cube scene featuring six breathing panels, coordinate orbits, and an internal emerald core.
* Interactive mouse-glide key and rim lighting system.
* Robust error boundary class with premium theme-aware SVG backup.
* Render notifier swapchain hooks to prevent layout flash during canvas boots.

---

## [1.6.0] - 2026-07-11
### Added
* Microsoft Clarity SPA integration targeting Project ID `xlkc4za75d`.
* Pre-configured scroll position maps and click tracking settings.

---

## [1.5.0] - 2026-07-10
### Added
* Google Analytics 4 integration targeting Measurement ID `G-FCP6S28FYD`.
* Pre-configured route change analytics listeners for SPA navigation.

---

## [1.2.0] - 2026-07-09
### Added
* Secure client Booking Funnel.
* Backend serverless edge routing supporting Turnstile tokens, Supabase postgres client records, and Resend SMTP notifications.
* Input sanitization validators to screen out HTML and script tags.

---

## [1.0.0] - 2026-07-07
### Changed
* Refactored CSS elements to align with mobile, tablet, and wide desktop containers.
* Capped WebGL DPR limits to 1.5 to guarantee high frame rates on lower-end devices.

---

## [0.8.0] - 2026-07-05
### Added
* Interactive case study popup modal details panel, showcasing:
  * Case Study descriptions (Problem, Solution, Business Outcome).
  * Design tool icons and tags.
  * Clickable Pinterest source buttons.

---

## [0.5.0] - 2026-07-03
### Changed
* Redesigned portfolio showcase pages.
* Categorized grid lists into Brand, Book Cover, Church Media, and Event Design layouts.

---

## [0.1.0] - 2026-07-01
### Added
* Initial project bootstrap configuration.
* Configured Vite 8 compilation parameters, React 19 libraries, and Tailwind CSS.
