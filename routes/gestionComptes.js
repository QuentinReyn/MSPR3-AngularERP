
const gestionCompteRoutes = (app, fs) => {

    // variables
    const dataPath = './data/gestionComptes.json';

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
    app.get('/gestionComptes', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/gestionComptes', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new gestionCompte
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new gestionCompte added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/gestionComptes/:id', (req, res) => {

        readFile(data => {

            // add the new gestionCompte
            const gestionCompteId = req.params["id"];
            for (let [i, gestionCompte] of data.entries()) {
                if (gestionCompte.id == gestionCompteId) {
                    gestionCompte.product_name = req.body.product_name;
                    gestionCompte.tva = req.body.tva;
                    gestionCompte.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`gestionComptes id:${gestionCompteId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/gestionComptes/:id', (req, res) => {

        readFile(data => {

            // add the new gestionCompte
            const gestionCompteId = req.params["id"];
            for (let [i, gestionCompte] of data.entries()) {
                if (gestionCompte.id == gestionCompteId) {
                    data.splice(i, 1);
                }
             }
            //delete data[gestionCompteId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`gestionComptes id:${gestionCompteId} removed`);
            });
        },
            true);
    });
};

module.exports = gestionCompteRoutes;
