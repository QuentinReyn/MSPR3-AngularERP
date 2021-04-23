
const rhFinanceRoutes = (app, fs) => {

    // variables
    const dataPath = './data/rhFinances.json';

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
    app.get('/rhFinances', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/rhFinances', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            // add the new rhFinance
            data.push({
                id:req.body.id,
                product_name: req.body.product_name,
                tva: req.body.tva,
                price: req.body.price
            })
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new rhFinance added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/rhFinances/:id', (req, res) => {

        readFile(data => {

            // add the new rhFinance
            const rhFinanceId = req.params["id"];
            for (let [i, rhFinance] of data.entries()) {
                if (rhFinance.id == rhFinanceId) {
                    rhFinance.product_name = req.body.product_name;
                    rhFinance.tva = req.body.tva;
                    rhFinance.price = req.body.price;
                }
             }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`rhFinances id:${rhFinanceId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/rhFinances/:id', (req, res) => {

        readFile(data => {

            // add the new rhFinance
            const rhFinanceId = req.params["id"];
            for (let [i, rhFinance] of data.entries()) {
                if (rhFinance.id == rhFinanceId) {
                    data.splice(i, 1);
                }
             }
            //delete data[rhFinanceId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`rhFinances id:${rhFinanceId} removed`);
            });
        },
            true);
    });
};

module.exports = rhFinanceRoutes;
