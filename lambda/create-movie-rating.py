import json
import boto3

def lambda_handler(event, context):
    data = json.loads(event['body'])

    response_code = create_new_item(data)

    # Only return the sent data in the body if creation was successful
    if (response_code == 201):
        body = json.dumps(data)
    else:
        body = None

    response = {
      "statusCode": response_code,
      "headers": {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : "true",
        "Content-Type": "application/json"
      },
      "body": body
    }

    return response


def create_new_item(item):
    # Table specific info. Be sure to update region and table name if necessary
    dynamodb = boto3.resource('dynamodb', region_name = 'us-east-2')
    table = dynamodb.Table('movies')

    try:
        res = table.put_item(
            Item={
                'name': item['name'],
                'year': item['year'],
                'rating': item['rating']
            }
        )

        code = res['ResponseMetadata']['HTTPStatusCode']

    except KeyError as e:
        print("Invalid parameters")
        print(e)
        return 400
    except Exception as e:
        print(e)
        return 500

    # Return codes for the front end
    if (code == 200):
        print("Product successfully created")
        return 201
    else:
        print("Error creating product")
        return 500