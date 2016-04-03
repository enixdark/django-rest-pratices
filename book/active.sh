#!/bin/bash

if [ -d vene ]; then
	virtualenv venv
fi
source ./venv/bin/activate
pip install -r requirements.txt
