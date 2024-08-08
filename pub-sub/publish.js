const { exchangeName } = require('./constant');
const { getChannel, closeConnection } = require('./helper');

async function publish(req, res) {
    const { channel, connection } = await getChannel()
    //message
    const message = req.body.message

    try {
        await channel.assertExchange(exchangeName, 'fanout', { durable: true });
        res.send(`Published: ${message}`);
        let i = 0;
        while (i < 50000) {
            i++
            channel.publish(exchangeName, '', Buffer.from(message + i))
        }
    } catch {
        res.status(500).json({
            message: "Error"
        })
    } finally {
        closeConnection(channel, connection)
    }

}

module.exports = publish