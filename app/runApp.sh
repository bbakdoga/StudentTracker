#!/bin/bash
# Based on the environment variable, deciding whether to run tests or 
# source code for front end

if [[ $TEST == 'true' ]]; then
  echo 'The variable is test, time to run the tests'
  npm test -- --coverage
  while :; do true ; done
elif [[ $TEST == 'false' ]]; then
  echo 'The variable test is false, lets run source code'
  npm start
else
  echo 'Could not find test variable, try passing it properly'
fi
echo 'Ending running the APP Script'