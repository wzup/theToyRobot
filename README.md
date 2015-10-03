# Toy Robot Simulator

## Table Of Contents
**[Description](#destruction)**
**[Installation and Start](#installation-and-start)**
**[Usage Instructions](#usage-instructions)**
**[Troubleshooting](#troubleshooting)**
**[Compatibility](#compatibility)**
**[Notes and Miscellaneous](#notes-and-miscellaneous)**
**[Building the Extension Bundles](#building-the-extension-bundles)**
**[Next Steps, Credits, Feedback, License](#next-steps)**

## Description

- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

- There are no other obstructions on the table surface.

- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## The Robot can read in commands of the following form:

- PLACE X,Y,F or PLACE X Y Z (space is acceptable instead of commas)
- MOVE
- LEFT
- RIGHT
- REPORT

- **PLACE** will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.

- The origin (0,0) can be considered to be the SOUTH WEST most corner.

- The first valid command to the robot is a **PLACE** command, afer that, any sequence of commands may be issued, in any order, including another **PLACE** command. The application should discard all commands in the sequence until a valid **PLACE** command has been executed.

- **MOVE** will move the toy robot one unit forward in the direction it is currently facing.

- **LEFT** and **RIGHT** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

- **REPORT** will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

- A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.

- Input can be from a file, or from standard input, as the developer chooses.

- Provide test data to exercise the application.

## Constraints:

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.

Any move that would cause the robot to fall must be ignored.

## Installation Instructions

As simple as that. Clone the repo and `npm start`:

```
$ git clone git@github.com:wzup/blabla.git
$ cd blabla
$ npm start
```

## How to test

Just run `npm test` to run all the tests. Or specify the name of the component
against which to run tests:

```
$ npm test // test all components. runs all possible specs
$ npm test robot // test robot functionality only, runs robotSpec
$ npm test messenger // test messenger functionality only, runs messengerSpec
$ npm test playground // test playground functionality only, runs playgroundSpec
```

