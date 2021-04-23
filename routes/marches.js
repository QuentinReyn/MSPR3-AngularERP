
const marcheRoutes = (app, fs) => {

    // variables
    const dataPath = './data/marches.json';

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
    app.get('/marches', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/marches', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new marche
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new marche added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/marches/:id', (req, res) => {

        readFile(data => {

            // add the new marche
            const marcheId = req.params["id"];
            for (let [i, marche] of data.entries()) {
                if (marche.id == marcheId) {
                    marche.product_name = req.body.product_name;
                    marche.tva = req.body.tva;
                    marche.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`marches id:${marcheId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/marches/:id', (req, res) => {

        readFile(data => {

            // add the new marche
            const marcheId = req.params["id"];
            for (let [i, marche] of data.entries()) {
                if (marche.id == marcheId) {
                    data.splice(i, 1);
                }
             }
            //delete data[marcheId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`marches id:${marcheId} removed`);
            });
        },
            true);
    });
};

module.exports = marcheRoutes;
