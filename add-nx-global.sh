#!/bin/bash

#
# Modify all the tsconfig files under an nx workspace and will add the the
# library ../../types/*.d.ts.
# This means that at the top level of the workspace you will
# create a folder called types, and in this folder you will
# put global declarations.
#

find apps/ libs/ -name tsconfig.\*.json -exec add-include.js "../../types/*.d.ts" "{}" \;
