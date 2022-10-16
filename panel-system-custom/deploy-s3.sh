#!/bin/sh

aws s3 rm s3://test-hosting-sasori7611san/ --recursive
aws s3 cp dist s3://test-hosting-sasori7611san/ --recursive