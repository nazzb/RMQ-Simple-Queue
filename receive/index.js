import express from "express";
import amqp from 'amqplib';
const port=3000;
const app = express();

amqp.connect('amqp://localhost').then(connection => {
    connection.createChannel().then(channel => {
        const queue = 'my_queue';
        channel.assertQueue(queue, {
            durable:false
        });
        console.log('Receiving messege');
        channel.consume(queue, (msg)=>{
            // Use maybe type by adding ? . Maybe types accept the provided type as well as null or undefined.
            console.log('Received', msg?.content?.toString());
        })
    }).catch(err => console.log(err));
}).catch(err => console.log(err));

app.listen(port, () => {
    console.log('Running on port:', port)
});