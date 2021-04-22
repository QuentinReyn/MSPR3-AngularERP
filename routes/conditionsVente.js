
const conditionsVenteRoutes = (app, fs) => {

    // variables
    const dataPath = './data/conditionsVente.json';

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
    app.get('/conditionsVente', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/conditionsVente', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new conditionsVente
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new conditionsVente added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/conditionsVente/:id', (req, res) => {

        readFile(data => {

            // add the new conditionsVente
            const conditionsVenteId = req.params["id"];
            for (let [i, conditionsVente] of data.entries()) {
                if (conditionsVente.id == conditionsVenteId) {
                    conditionsVente.product_name = req.body.product_name;
                    conditionsVente.tva = req.body.tva;
                    conditionsVente.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`conditionsVente id:${conditionsVenteId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/conditionsVente/:id', (req, res) => {

        readFile(data => {

            // add the new conditionsVente
            const conditionsVenteId = req.params["id"];
            for (let [i, conditionsVente] of data.entries()) {
                if (conditionsVente.id == conditionsVenteId) {
                    data.splice(i, 1);
                }
             }
            //delete data[conditionsVenteId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`conditionsVente id:${conditionsVenteId} removed`);
            });
        },
            true);
    });
};

module.exports = conditionsVenteRoutes;
