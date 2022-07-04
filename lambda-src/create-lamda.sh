aws --endpoint-url=http://localhost:4566 \
lambda create-function --function-name my-lambda \
--zip-file fileb://function.zip \
--handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::000000000000:role/lambda-role
