
const clientRoutes = (app, fs) => {

    // variables
    const dataPath = './data/clients.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/clients', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/clients', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new client
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new client added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/clients/:id', (req, res) => {

        readFile(data => {

            // add the new client
            const clientId = req.params["id"];
            for (let [i, client] of data.entries()) {
                if (client.id == clientId) {
                    client.product_name = req.body.product_name;
                    client.tva = req.body.tva;
                    client.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`clients id:${clientId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/clients/:id', (req, res) => {

        readFile(data => {

            // add the new client
            const clientId = req.params["id"];
            for (let [i, client] of data.entries()) {
                if (client.id == clientId) {
                    data.splice(i, 1);
                }
             }
            //delete data[clientId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`clients id:${clientId} removed`);
            });
        },
            true);
    });
};

module.exports = clientRoutes;
