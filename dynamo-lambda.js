// create an IAM Lambda role with access to dynamodb
// Launch Lambda in the same region as your dynamodb region
// (here: us-east-1)
// dynamodb table with hash key = user and range key = datetime

console.log('Loading event');
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

export function handler(event, context) {
    const tableName = "MemberPerformanceHistory";
    dynamodb.scan({
        TableName : tableName,
        Limit : 10
    }, (err, data) => {
        if (err) {
            context.done('error',`reading dynamodb failed: ${err}`);
        }
        for (let i in data.Items) {
            i = data.Items[i];
            console.log(`${i.user.S}: ${i.msg.S}`);
            context.done(null, "The Sacn is Done!");
        }
    });
}
