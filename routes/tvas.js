
const tvaRoutes = (app, fs) => {

    // variables
    const dataPath = './data/tvas.json';

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
    app.get('/tvas', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/tvas', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new tva
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new tva added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/tvas/:id', (req, res) => {

        readFile(data => {

            // add the new tva
            const tvaId = req.params["id"];
            for (let [i, tva] of data.entries()) {
                if (tva.id == tvaId) {
                    tva.product_name = req.body.product_name;
                    tva.tva = req.body.tva;
                    tva.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tvas id:${tvaId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/tvas/:id', (req, res) => {

        readFile(data => {

            // add the new tva
            const tvaId = req.params["id"];
            for (let [i, tva] of data.entries()) {
                if (tva.id == tvaId) {
                    data.splice(i, 1);
                }
             }
            //delete data[tvaId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tvas id:${tvaId} removed`);
            });
        },
            true);
    });
};

module.exports = tvaRoutes;
