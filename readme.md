# Parking Lot Management
> Buid using NodeJS, Express and MongoDB

## Assignment

	We want to build a parking lot management application. Multiple parking lots want to use this application.

	1. Platform should be able to support multiple parking lots
	2. There are different types of vehicles: Two-Wheeler, Hatchback Car, SUV Car
	3. Each parking lot has a separate capacity for each kind of vehicle.
	4. There are different hourly rate cards for each kind of vehicle

	Ex: (0-2hrs 20Rs, 2-4hrs 40Rs)

	Assumptions:

	You can seed data for these
	1. Parking Lots
	2. Capacity of parking lot for each kind of vehicle
	3. Rate card for each vehicle kind

	Demonstrate:

	1. Park a Vehicle at a given parking lot (should fail if the lot is full)
	2. Exit from the parking area and tell the amount due for the duration.
	3. Given a vehicle no., see complete parking history (Lot, Area, Duration, Amount Paid)

	Expectation from this round:

	1. Demonstrable code is the first expectation. To do this, you can choose any interface you are comfortable with - CLI, WebApp, MobileApp, APIs,etc
	2. Use any Database of your choice (preferably MongoDB)
	3. Code should be extensible.
	4. Clean professional level code.
	5. Functional Completeness including good modelling.

### Prerequisites

#### Node.js

> Version: >= 10

#### MongoDB

> Version: >= 4

#### Setup

	cd parking_lot_management
## Install

	npm install

## Load Dev Data

	> To Import Dev data
	npm run import:devData

	> To Delete Dev data
	npm run delete:devData

## Start Up

	npm start

## Swagger URL

	GET: http://localhost:4000/api/v1/doc/e5y9xM16ZG
