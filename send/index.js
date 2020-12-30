import express from "express";
import amqp from 'amqplib';
import object from './object.js';

const port=3001;
const app = express();

amqp.connect('amqp://localhost').then(connection =>{
    connection.createChannel().then(channel => {
        const queue='my_queue';
        channel.assertQueue(queue, {
            durable:false
        });
        console.log('sending messege');
        channel.sendToQueue(queue, Buffer.from(object.name));
    }).catch(err => console.log(err));
}).catch(err => console.log(err));

app.listen(port,() => {
    console.log('Running on port:', port)
});