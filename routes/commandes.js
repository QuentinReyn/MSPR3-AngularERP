
const commandeRoutes = (app, fs) => {

    // variables
    const dataPath = './data/commandes.json';

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
    app.get('/commandes', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/commandes', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new commande
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new commande added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/commandes/:id', (req, res) => {

        readFile(data => {

            // add the new commande
            const commandeId = req.params["id"];
            for (let [i, commande] of data.entries()) {
                if (commande.id == commandeId) {
                    commande.product_name = req.body.product_name;
                    commande.tva = req.body.tva;
                    commande.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`commandes id:${commandeId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/commandes/:id', (req, res) => {

        readFile(data => {

            // add the new commande
            const commandeId = req.params["id"];
            for (let [i, commande] of data.entries()) {
                if (commande.id == commandeId) {
                    data.splice(i, 1);
                }
             }
            //delete data[commandeId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`commandes id:${commandeId} removed`);
            });
        },
            true);
    });
};

module.exports = commandeRoutes;
