# Restaurant Reservation System

> A full-stack web application built to mock a restaurant reservation system for a local restaurant
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> Features were built from the ground up based on a series of User Stories (listed later on in User Stories section).

## Built with:
React
Node.js
Express
Knex
PostgreSQL
Bootstrap

## Objectives

Create full-stack web app (front-end UI and back-end API) for a "client".
Build and implement features by interpreting "client" user stories.
Successfully deploy the application for demo usage.

## User Stories

### User Story 1
As a restaurant manager
I want to create a new reservation when a customer calls
so that I know how many customers will arrive at the restaurant on a given day.

### User Story 2
As a restaurant manager
I only want to allow reservations to be created on a day when we are open
so that users do not accidentally create a reservation for days when we are closed.

### User Story 3
As a restaurant manager
I only want to allow reservations to be created during business hours, up to 60 minutes before closing
so that users do not accidentally create a reservation for a time we cannot accommodate.

### User Story 4
As a restaurant manager,
When a customer with an existing reservation arrives at the restaurant
I want to seat (assign) their reservation to a specific table
so that I know which tables are occupied and free.

### User Story 5
As a restaurant manager
I want to free up an occupied table when the guests leave
so that I can seat new guests at that table.

### User Story 6
As a restaurant manager
I want a reservation to have a status of either booked, seated, or finished
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

### User Story 7
As a restaurant manager
I want to search for a reservation by phone number (partial or complete)
so that I can quickly access a customer's reservation when they call about their reservation.

### User Story 8
As a restaurant manager
I want to be able to modify a reservation if a customer calls to change or cancel their reservation
so that reservations are accurate and current.
