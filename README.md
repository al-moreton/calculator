# Calculator
Part of The Odin Project JS foundations course. Built as per task requirements, with additional functionality.

[Live version](https://al-moreton.github.io/calculator/)

## How it's made?
**Tech used:** HTML, CSS, JavaScript

CSS grid was used for the first time, as opposed to flexbox when building the etch-a-sketch project.

I incorporated a case statement to define which calculation function was to be used based on the operator selected.

I did expand on the project requirements quite a bit - the basic project didn't account for various use-cases of a calculator and I wanted it to work properly (things like allowing negative numbers to be added, the ability to delete a chosen operator and select a new one, and showing 2 lines of display as per standard calculators).

I ran into a few issues which were down to how 0 is treated the same as null, which meant any statements need to be explicit about testing if a variable = ''.

I do feel that as I was building I was just adding IF statements to fix errors and edge-cases, which didn't feel very efficient. Maybe there's a better way to build a calculator?

## Optimisation and improvements
- 2-line display, as per standard calculators
- Had to add in previous/current variables for numbers, operators, and the overall calculation
- Added `formatResult` function to avoid any issues with weird JS formatting
- Added `normaliseOperator` function to avoid any issues with mobile devices and how subtract buttons don't use the same ASCII characters

## Things I would like to add
- Add keyboard support for desktop use
- Better build the % `percentage` function - calculators aren't all the same when it comes to the % button, so needs looking into