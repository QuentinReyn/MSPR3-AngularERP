
const gestionCoutRoutes = (app, fs) => {

    // variables
    const dataPath = './data/gestionCouts.json';

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
    app.get('/gestionCouts', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/gestionCouts', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new gestionCout
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new gestionCout added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/gestionCouts/:id', (req, res) => {

        readFile(data => {

            // add the new gestionCout
            const gestionCoutId = req.params["id"];
            for (let [i, gestionCout] of data.entries()) {
                if (gestionCout.id == gestionCoutId) {
                    gestionCout.product_name = req.body.product_name;
                    gestionCout.tva = req.body.tva;
                    gestionCout.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`gestionCouts id:${gestionCoutId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/gestionCouts/:id', (req, res) => {

        readFile(data => {

            // add the new gestionCout
            const gestionCoutId = req.params["id"];
            for (let [i, gestionCout] of data.entries()) {
                if (gestionCout.id == gestionCoutId) {
                    data.splice(i, 1);
                }
             }
            //delete data[gestionCoutId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`gestionCouts id:${gestionCoutId} removed`);
            });
        },
            true);
    });
};

module.exports = gestionCoutRoutes;
